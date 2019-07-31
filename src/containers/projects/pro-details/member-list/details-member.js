import React from 'react'
import { Container, Thumbnail, Content, Form, Icon, Toast } from 'native-base'
import styled from 'styled-components/native'
import ImageCropPicker from 'react-native-image-crop-picker'
import ProfileItem from '../../../settings/my-profile/profile-item'
import dataMember from './data-key'
import MemberInput from './member-input'
import colors from '../../../themes/colors'
import * as _ from 'lodash'
import projectApi from '../../../../api/projectApi'
import { updateFollowProject } from '@redux/actions/projectAction'
import connectAutoDispatch from '../../../../@redux/connect';

const options = {
  width: 400,
  height: 400,
  cropping: true
}

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

const Touchable = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8
})``

class DetailsMember extends React.Component {
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
    this.processMember(props)
  }

  processMember = (props, isReceive) => {
    const index = !isReceive ? _.get(props, 'navigation.state.params.index'): this.state.index
    const isAdd = !isReceive ? _.get(props, 'navigation.state.params.isAdd') : false
    console.log('index: ', index, _.get(props, `projectSelected`))
    const user = _.isNumber(index) ? _.get(props, `projectSelected.contacts[${index}]`) : _.clone(dataMember.keys)
    console.log('processMember: ', user)
    if (!isReceive) {
      this.state = {
        index,
        isAdd,
        isEdit: _.get(props, 'navigation.state.params.isEdit', false),
        user
      }
    } else {
      this.setState({
        index,
        isAdd,
        isEdit: _.get(props, 'navigation.state.params.isEdit', false),
        user
      })
    }
    
  }

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps !== this.props) {
  //     this.processMember(nextProps, true)
  //   }
  // }

  handleEdit = async () => {
    let index = this.state.index
    if (this.state.isAdd || this.state.isEdit) {
      if (!_.get(this.state, 'user.full_name') || !_.get(this.state, 'user.email') || !_.get(this.state, 'user.phone') || !_.get(this.state, 'user.position')) {
          Toast.show({
            type: 'warning',
            text: `Vui lòng điền đầy đủ thông tin.`,
            position: 'top',
            duration: 1000
          })
        return
      }
    }

    if (this.state.isAdd && this.state.isEdit) {
      let contacts = _.get(this.props, 'projectSelected.contacts', []) || []
      contacts.push(this.state.user)
      let projectSelected = _.clone(this.props.projectSelected)
      if (_.has(projectSelected, 'contacts')) {
        projectSelected.contacts = contacts
      } else {
        projectSelected.contacts = []
        projectSelected.contacts = contacts
      }
      
      index = (contacts.length - 1)
      const result = await this.props.updateFollowProject(projectSelected, this.props.followProjects, this.props.listBySystem)
      this.toastNotification(result, index, 'Thêm mới thành công.')
    } else if (this.state.isEdit) {
      let projectSelected = this.props.projectSelected
      _.update(projectSelected, `contacts[${index}]`, () => this.state.user)
      const result = await this.props.updateFollowProject(projectSelected, this.props.followProjects, this.props.listBySystem)
      this.toastNotification(result, index, 'Cập nhật thành công.')
    } else {
      this.props.navigation.setParams({ isEdit: true })
      this.setState({
        isEdit: true
      })
    }
  }

  toastNotification = (result, index, titleSuccess) => {
    if (result) {
      Toast.show({
        type: 'success',
        text: titleSuccess,
        position: 'top',
        duration: 1000
      })
      this.props.navigation.setParams({ isEdit: false })
      this.setState({ isEdit: false, isAdd: false, index })
      this.processMember(this.props, true)
    } else {
      Toast.show({
        type: 'warning',
        text: `Đã xảy ra lỗi vui lòng thử lại.`,
        position: 'top',
        duration: 1000
      })
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

  handleUploadImage = () => {
    if ( this.state.isEdit ) {
      ImageCropPicker.openPicker({
        width: 160,
        height: 160,
        cropping: true,
        cropperChooseText: 'Chọn',
        cropperCancelText: 'Hủy bỏ'
      }).then(async data => {
        try {
          const avatar = await projectApi.upload(data)
          console.log('avatar', avatar)
          if (avatar) {
            let user = this.state.user
            user['avatar'] = avatar
            console.log('user', user)
            this.setState({user})
          } 
        } catch (error) {
          console.log('error: ', error)
        }
      })
      .catch(err => console.log(err))
    }
  }

  renderHeaderView = () => {
    const avatar = _.get(this.state, 'user.avatar')
    return (
        <UserInfo style={{}}>
          <Thumbnail large source={ _.isEmpty(avatar) ? require('../../../../images/logo.png') : { uri: avatar }} />
          <InfoRight>
            <TextInfo fontSize={13} fontWeight='bold'>
              {_.get(this.state, 'user.full_name')}
            </TextInfo>
            <TextInfo style={{ paddingTop: 4, paddingBottom: 4 }}>
              {_.get(this.state, 'user.position')}
            </TextInfo>
            <TextInfo>{_.get(this.state, 'user.address')}</TextInfo>
          </InfoRight>
        </UserInfo>
    )
  }

  renderHeaderEdit = () => {
    const avatar = _.get(this.state, 'user.avatar')
    return (
      <UserInfo style={{}}>
        <Touchable onPress={this.handleUploadImage} >
          <Thumbnail large source={ _.isEmpty(avatar) ? require('../../../../images/logo.png') : { uri: avatar }} />
        </Touchable>
        <InfoRight>
          <MemberInput
            code={'full_name'}
            key='full_name'
            title='Tên đầy đủ'
            subTitle={`${_.get(this.state, 'user.full_name', '')}`}
            onChangeText={this.handleChangeText}
          />
           <MemberInput
              code={'position'}
              key='position'
              title='Vị trí'
              subTitle={`${_.get(this.state, 'user.position', '')}`}
              onChangeText={this.handleChangeText}
            />
        </InfoRight>
      </UserInfo>
    )
  }

  render () {
    return (
      <Container>
        <Content padder>
            <Form>
            {
              this.state.isEdit ? 
              this.renderHeaderEdit()
              : 
              this.renderHeaderView()
            }
            {this.state.isEdit
              ? dataMember.list.map(item => (
                <MemberInput
                  code={item.key}
                  {...item}
                  subTitle={`${_.get(this.state, ['user', item.key], '')}`}
                  onChangeText={this.handleChangeText}
                />
              ))
              : dataMember.list.map(item => (
                <ProfileItem
                  {...item}
                  subTitle={_.get(this.state, ['user', item.key])}
                  onNavigation={this.props.navigation.navigate}
                />
              ))}
          </Form>
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
  listBySystem: state.project.listBySystem,
  followProjects: state.project.followProjects,
  projectSelected:  state.project.projectSelected
}), {
  updateFollowProject
})(DetailsMember)