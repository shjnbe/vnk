import React from 'react'
import {
  Container,
  Content,
  Icon,
  Form,
  Textarea,
  Item,
  Input,
  Row,
  Thumbnail,
  Toast
} from 'native-base'
import styled from 'styled-components/native'
import mypStyles from '../../themes/myp-styles'
import colors from '../../themes/colors'
import companyApi from 'api/companyApi'
import * as _ from 'lodash'
import ImageCropPicker from 'react-native-image-crop-picker'
import PickerSearchUser from './picker-search-user';
import projectApi from 'api/projectApi';
import authApi from 'api/authApi';
import connectAutoDispatch from '../../@redux/connect';
import { getCompanies } from '@redux/actions/companyAction'
import moment from 'moment'

const UserView = styled.View`
  marginTop: 12
  marginBottom: 0
`

const ViewImage = styled.View`
  flexDirection: row
  justifyContent: flex-start
  alignItems: center
  marginTop: 8
`

const UserListView = styled.Text`color: ${colors.darkSkyBlue} fontSize: 15`

const fieldData = [
  'id',
  'full_name',
  'phone',
  'email',
  'manager',
  'address'
]

class AddContactContainer extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      id: moment().unix(),
      full_name: '',
      phone: '',
      email: '',
      manager: '',
      address: ''
    }
  }

  _saveCompanyInfo = async () => {
    if (this.state.name) {
      const data = _.pick(this.state, fieldData)
      const msg = {text: 'Đã có lỗi xày ra vui lòng thử lại!', type: 'danger', position: 'top'}
      const rs = await companyApi.add(data)
      if (!_.has(rs, 'error.message')) {
        msg.text = `Thêm [${data.name}] thành công!`
        msg.type = 'success'
        this.props.getCompanies(this.props.user)
        this.props.navigation.goBack()
      }
      Toast.show(msg)
    } else {
      Toast.show({
        text: 'Vui lòng nhập thông tin!', type: 'warning', position: 'top'
      })
    }
  }

  onChangeText = (key, value) => {
    this.setState({ [key]: value })
  }

  handleUploadImage = () => {
    ImageCropPicker.openPicker({
      // width: 670,
      // height: 286,
      // cropping: true,
      cropperChooseText: 'Chọn',
      cropperCancelText: 'Hủy bỏ'
    }).then(async data => {
      try {
        console.log('image: ', data)
        const image = await companyApi.upload(data)
        if (image) {
          this.setState({image})
        } 
      } catch (error) {
        console.log('error: ', error)
      }
    })
    .catch(err => console.log(err))
  }

  async componentDidMount () {
    this.props.navigation.setParams({
      saveCompanyInfo: this._saveCompanyInfo
    })
    const users = await authApi.getUserByTeam(this.props.user)
    this.setState({users})
  }

  handleUserChange = contacts => {
    if (_.isArray(contacts))
      this.setState({contacts})
  }


  renderImage = () => {
    if (this.state.image) {
      return <Thumbnail large square source={{ uri: this.state.image }}/>
    }
    return <UserListView />
  }

  addUser = () => {
    this.refs.refUser.open(this.state.contacts)
  }

  render () {
    return (
      <Container>
        <Content style={{ padding: 12 }}>
          <Form>
            <Textarea
              style={mypStyles.borderDarkSkyBlue}
              rowSpan={3}
              bordered
              placeholder='Tên công ty'
              onChangeText={value => this.onChangeText('name', value)}
            />
            <Item
              regular
              style={[mypStyles.mTop3, mypStyles.borderDarkSkyBlue]}
            >
              <Input
                placeholder='Viết tắt'
                onChangeText={value => this.onChangeText('short_name', value)}
              />
            </Item>
            
            <ViewImage>
              <Icon style={{marginRight: 8}} name='plus-circle' type='Feather' onPress={this.handleUploadImage} />
              {
                this.renderImage()
              }
            </ViewImage>

            {
              this.state.contacts.length > 0 &&
              <UserView>
                <UserListView>
                  ({this.state.contacts.length}){' '}
                  {_.join(this.state.contacts.map(({full_name}) => full_name), ', ')}
                </UserListView>
              </UserView>
            }
            <UserView
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center'
              }}
            >
              <UserListView style={{ fontWeight: 'bold', marginRight: 8 }}>
                Thêm liên hệ
              </UserListView>
              <Icon name='person-add' style={{ color: colors.darkSkyBlue }} onPress={this.addUser} />
            </UserView>
            <Item
              regular
              style={[mypStyles.mTop3, mypStyles.borderDarkSkyBlue]}
            >
              <Icon active name='calendar' />
              <Input
                placeholder='DD/MM/YYYY'
                onChangeText={value => this.onChangeText('date', value)}
              />
            </Item>
            <Item
              regular
              style={[mypStyles.mTop3, mypStyles.borderDarkSkyBlue]}
            >
              <Input
                placeholder='Giám Đốc'
                onChangeText={value => this.onChangeText('manager', value)}
              />
            </Item>
            <Item
              regular
              style={[mypStyles.mTop3, mypStyles.borderDarkSkyBlue]}
            >
              <Input
                placeholder='Địa chỉ VP'
                onChangeText={value =>
                  this.onChangeText('office_address', value)
                }
              />
            </Item>
            <Item
              regular
              style={[mypStyles.mTop3, mypStyles.borderDarkSkyBlue]}
            >
              <Input
                placeholder='Thành phố (Tỉnh)'
                onChangeText={value => this.onChangeText('city', value)}
              />
            </Item>
            <Item
              regular
              style={[mypStyles.mTop3, mypStyles.borderDarkSkyBlue]}
            >
              <Input
                placeholder='Trang web'
                onChangeText={value => this.onChangeText('website', value)}
              />
            </Item>
            <Item
              regular
              style={[mypStyles.mTop3, mypStyles.borderDarkSkyBlue]}
            >
              <Input
                placeholder='Số điện thoại'
                onChangeText={value => this.onChangeText('phone', value)}
              />
            </Item>
            <Item
              regular
              style={[mypStyles.mTop3, mypStyles.borderDarkSkyBlue]}
            >
              <Input
                placeholder='Email'
                onChangeText={value => this.onChangeText('email', value)}
              />
            </Item>
            <Item
              regular
              style={[mypStyles.mTop3, mypStyles.borderDarkSkyBlue]}
            >
              <Input
                placeholder='Cập nhật mới nhất'
                onChangeText={value =>
                  this.onChangeText('latest_update', value)
                }
              />
            </Item>
            <Textarea
              style={[mypStyles.mTop3, mypStyles.borderDarkSkyBlue]}
              rowSpan={5}
              bordered
              placeholder='Ghi chú cá nhân'
              onChangeText={value => this.onChangeText('note', value)}
            />
          </Form>
        </Content>
        <PickerSearchUser
          ref='refUser'
          onItemChange={this.handleUserChange}
          dataSource={this.state.users}
          value={this.state.user}
        />
      </Container>
    )
  }
}
export default connectAutoDispatch(state => ({user: _.get(state, 'auth.user')}), {getCompanies})(AddCompanyContainer)