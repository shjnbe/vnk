import React from 'react'
import { Container, Thumbnail, Content, Form, Icon, Toast } from 'native-base'
import styled from 'styled-components/native'
import ImageCropPicker from 'react-native-image-crop-picker'
import ImagePicker from 'react-native-image-picker'
import SegmentView from './segment-view'
import ProfileItem from './profile-item'
import itemProfiles from './data-profile'
import ProfileInput from './profile-input'
import colors from '../../../themes/colors'
import connectAutoDispatch from '../../../@redux/connect'
import { get, isEmpty, has } from 'lodash'
import authApi from '../../../api/authApi';
import { updateMyProfile } from '../../../@redux/actions/authAction'
import NoteList from './note-list';
import { POSITION } from 'constants/position-sale';
const options = {
  width: 400,
  height: 400,
  cropping: true
};

const UserInfo = styled.View`
  paddingLeft: 16
  paddingRight: 16
  paddingTop: 12
  paddingBottom: 12
  flexDirection: row
  justifyContent: flex-start alignItems: center
`

const InfoRight = styled.View`
  marginLeft: 16
  flexDirection: column
  flex: 1
`
const TextInfo = styled.Text`
  fontFamily: Helvetica
  fontSize: ${props => props.fontSize || 12}
  letterSpacing: 1
  fontWeight: ${props => props.fontWeight || 'normal'}
  color: #333333
`

const CalendarIcon = styled.Image.attrs({
  resizeMode: 'contain',
  source: require('images/globe/calendar.png')
})`
  width: 40
  height: 40
`

const Touchable = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8
})``

class MyProfileContainer extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const isEdit = navigation.getParam('isEdit')
    return {
      headerRight: (
        <Icon
          name={isEdit ? 'save' : 'edit'}
          type='Feather'
          onPress={navigation.getParam('onEdit')}
          style={{ color: colors.appleGreen, paddingRight: 12 }}
        />
      )
    }
  }

  constructor (props) {
    super(props)
    this.state = {
      segmentIndex: 0,
      isEdit: false,
      user: get(this.props, 'user', {})
    }
  }

  handleSegmentChange = segmentIndex => {
    switch (segmentIndex) {
      case 1:
        this.props.navigation.navigate('taskAssign')
        break;
      case 0:
        this.setState({ segmentIndex })
        break
      case 2:
        this.setState({ segmentIndex })
        break
      default:
        break;
    }
  }

  handleEdit = async () => {
    this.setState({ isEdit: !this.state.isEdit })
    this.props.navigation.setParams({ isEdit: !this.state.isEdit })
    if (this.state.isEdit) {
      const msg = {position: 'top', type: 'warning', text: 'Cập nhật thất bại!!!'}
      try {
        const rs = await authApi.updateMyProfile(this.state.user, get(this.state, 'user.access_token', ''))
        if (!has(rs, 'error.message')) {
          msg.type = 'success'
          msg.text = 'Cập nhật thành công'
          this.props.updateMyProfile(rs)
        }
      } catch (error) {
        console.log(error)
      } finally {
        Toast.show(msg)
      }  
    }
  }

  handleMap = () => {
    this.props.navigation.navigate('mapContainer')
  }

  handleChangeText = (code, value) => {
    const user = this.state.user
    user[code] = value
    this.setState({ user })
  }

  handleOnStatistics = () => {
    this.props.navigation.navigate('kpiStatisticsContainer', {
      title: 'Dự án theo dõi',
      user: this.props.user || {}
    })
  }

  uploadAvatar = () => {
    ImageCropPicker.openPicker(options)
      .then(async image => {
        const rs = await authApi.uploadAvatar(image, get(this.props, 'user.access_token', ''))
        if (get(rs, 'link')) {
          const user = this.state.user
          user.avatar = rs.link
          this.setState({ user })
          //Toast.show({text: 'Tải hình thành công!', type: 'success', position: 'top'})
        } else {
          //Toast.show({text: 'Tải hình thất bại!', type: 'danger', position: 'top'})
        }
      })
      .catch(err => Toast.show({text: `Tải hình thất bại! ${err.message}`, type: 'danger', position: 'top'}))
  }

  render () {
    const position = get(this.props, 'user.saleteam_position', '')
    const packageOrder = get(this.props, 'user.packageOrder', '')
    const avatar = get(this.state, 'user.avatar')
    return (
      <Container>
        <UserInfo style={{}}>
          <Touchable onPress={this.uploadAvatar} >
            <Thumbnail circular large source={ isEmpty(avatar) ? require('images/globe/noavatar.png') : { uri: avatar }} />
          </Touchable>
          <InfoRight>
            <TextInfo fontSize={13} fontWeight='bold'>
              {get(this.props, 'user.full_name')}
            </TextInfo>
            <TextInfo style={{ paddingTop: 4, paddingBottom: 4 }}>
              {get(this.props, 'user.position')}
            </TextInfo>
            <TextInfo>{get(this.props, 'user.address')}</TextInfo>
          </InfoRight>
          { position === POSITION.SALE_MANAGER && packageOrder === 'enterprise' &&
            <Touchable onPress={this.handleOnStatistics}>
              <CalendarIcon />
            </Touchable>
          }
        </UserInfo>
        <SegmentView
          index={this.state.segmentIndex}
          onSegmentChange={this.handleSegmentChange}
        />

        <Content padder>
          { this.state.segmentIndex === 0 &&
            <Form>
            {this.state.isEdit
              ? itemProfiles.map(item => (
                <ProfileInput
                  code={item.key}
                  {...item}
                  subTitle={`${get(this.state, ['user', item.key], '')}`}
                  onChangeText={this.handleChangeText}
                />
              ))
              : itemProfiles.map(item => (
                <ProfileItem
                  {...item}
                  subTitle={get(this.props, ['user', item.key])}
                  onNavigation={this.props.navigation.navigate}
                />
              ))}
          </Form>
          }

          {
            this.state.segmentIndex === 2 && <NoteList list={get(this.props, 'user.custom.notes', [])}/>
          }
        </Content>
      </Container>
    )
  }

  componentDidMount () {
    this.props.navigation.setParams({
      onEdit: this.handleEdit,
      isEdit: this.state.isEdit
    })
  }
}

export default connectAutoDispatch(state => ({ 
  user: state.auth.user,
  taskOfMe: state.auth.taskOfMe
 }), {updateMyProfile})(
  MyProfileContainer
)
