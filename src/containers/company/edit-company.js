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
  Toast,
  DatePicker,
  Picker,
  Header,
  Left,
  Body,
  Label,
  View
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
import PickerAddNewUser from './picker-add-user';
import cities from 'constants/cities';
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
  'name',
  'short_name',
  'contacts',
  'date',
  'office_address',
  'city',
  'website',
  'phone',
  'email',
  'latest_update',
  'note',
  'image',
  'manager'
]

class EditCompanyContainer extends React.Component {
  constructor (props) {
    super(props)
    const company = _.get(this.props, 'navigation.state.params.company', {})
    this.state = {
      company: {
        users: [],
        user: null,
        name: '',
        short_name: '',
        contacts: [],
        date: '',
        office_address: '',
        city: '',
        website: '',
        phone: '',
        email: '',
        latest_update: moment().format('DD/MM/YYYY HH:mm:ss'),
        note: '',
        manager: '',
        image: '',
        ...company
      }
    }
  }

  _saveCompanyInfo = async () => {
    console.log(this.state.company)
    if (_.get(this.state, 'company.name')) {
      const data = this.state.company//_.pick(this.state, fieldData)
      const msg = {text: 'Đã có lỗi xày ra vui lòng thử lại!', type: 'danger', position: 'top'}
      const rs = await companyApi.update(data.id, {data, access_token: _.get(this.props, 'user.access_token', '')})
      if (!_.has(rs, 'error.message')) {
        msg.text = `Cập nhật thành công!`
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
    const company = this.state.company
    company[key] = value
    this.setState(company)
  }

  handleUploadImage = () => {
    ImageCropPicker.openPicker({
      // width: 670,
      // height: 286,
      // cropping: true,
      cropperChooseText: 'Chọn',
      cropperCancelText: 'Hủy bỏ'
    }).then(async data => {
      const image = await companyApi.upload(data)
      if (image) {
        const company = this.state.company
        company.image = _.get(this.state, 'company.image')
        this.setState(company)
      } else {
        Toast.show({text: `Đã có lỗi xảy ra.`, type: 'warning'})
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
    if (_.isArray(contacts)) {
      const company = this.state.company
      company.contacts = contacts
      this.setState(company)
    }
  }


  renderImage = () => {
    if (_.get(this.state, 'company.image')) {
      return <Thumbnail large square source={{ uri: _.get(this.state, 'company.image') }}/>
    }
    return <UserListView />
  }

  addUser = () => {
    //this.refs.refUser.open(this.state.contacts)
    this.refs.refNewUser.open()
  }

  handleAddContact = contact => {
    const contacts = _.get(this.state, 'company.contacts', [])
    contacts.push(contact)
    const company = this.state.company
    company.contacts = contacts
    this.setState(company)
    this.refs.refNewUser.open()
  }

  renderCityHeader = goBack => {
    return (
      <Header transparent noShadow>
        <Left>
          <Icon name='chevron-left' type='Feather' onPress={goBack}/>
        </Left>
        <Body>
          <Label>Thành phố (Tỉnh)</Label>
        </Body>
      </Header>
    )
  }

  renderRowDatePicker = isLatestUpdate => {
    return (
      <Item
        regular
        style={[mypStyles.mTop3, mypStyles.borderDarkSkyBlue]}
        >
        <Icon name='calendar' style={{ color: '#727272', fontSize: 24, marginRight: 4}}/>
        <DatePicker
          disabled={isLatestUpdate}
          timeZoneOffsetInMinutes={undefined}
          modalTransparent={false}
          animationType={"fade"}
          androidMode={"default"}
          placeHolderText={isLatestUpdate? moment().format('DD/MM/YYYY') : 'Ngày thành lập'}
          textStyle={{ color: "green" }}
          placeHolderTextStyle={{ color: isLatestUpdate? '#727272' : '#212121'}}
          onDateChange={date => this.onChangeText('date', moment(date).format('DD/MM/YYYY'))}
        />
      </Item>
    )
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
              defaultValue={_.get(this.state, 'company.name')}
              placeholder='Tên công ty'
              onChangeText={value => this.onChangeText('name', value)}
            />
            <Item
              regular
              style={[mypStyles.mTop3, mypStyles.borderDarkSkyBlue]}
            >
              <Input
                placeholder='Viết tắt'
                defaultValue={_.get(this.state, 'company.short_name')}
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
              _.get(this.state, 'company.contacts', []).length > 0 &&
              <UserView>
                <UserListView>
                  ({_.get(this.state, 'company.contacts', []).length}){' '}
                  {_.join(_.get(this.state, 'company.contacts', []).map(({full_name, name}) => full_name || name), ', ')}
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
            {/* <Item
              regular
              style={[mypStyles.mTop3, mypStyles.borderDarkSkyBlue]}
              onPress={this.showCalendar}
            >
              <Icon active name='calendar' />
              <Input
                placeholder='DD/MM/YYYY'
                onChangeText={value => this.onChangeText('date', value)}
              />
            </Item> */}
            {
              this.renderRowDatePicker()
            }

            <Item
              regular
              style={[mypStyles.mTop3, mypStyles.borderDarkSkyBlue]}
            >
              <Input
                placeholder='Giám Đốc'
                defaultValue={_.get(this.state, 'company.manager')}
                onChangeText={value => this.onChangeText('manager', value)}
              />
            </Item>
            <Item
              regular
              style={[mypStyles.mTop3, mypStyles.borderDarkSkyBlue]}
            >
              <Input
                defaultValue={_.get(this.state, 'company.office_address')}
                placeholder='Địa chỉ VP'
                onChangeText={value =>
                  this.onChangeText('office_address', value)
                }
              />
            </Item>
            <Item
              disabled
              picker
              regular
              style={[mypStyles.mTop3, mypStyles.borderDarkSkyBlue]}
            >
              {/* <Input
                placeholder='Thành phố (Tỉnh)'
                onChangeText={value => this.onChangeText('city', value)}
              /> */}
              <Picker
                mode='dropdown'
                style={{ width: undefined, minWidth: 260 }}              
                renderHeader={this.renderCityHeader}
                placeholder='Thành phố (Tỉnh)'
                placeholderStyle={{ color: '#bfc6ea' }}
                placeholderIconColor='#007aff'
                selectedValue={_.get(this.state, 'company.city')}
                onValueChange={value => this.onChangeText('city', value)}
              >
                {
                  cities.map(item => <Picker.Item key={item.id} label={item.name} value={item.name} />)
                }
              </Picker>
              {/* <Icon name='chevron-down' type='Feather' /> */}
            </Item>
            <Item
              regular
              style={[mypStyles.mTop3, mypStyles.borderDarkSkyBlue]}
            >
              <Input
                placeholder='Trang web'
                defaultValue={_.get(this.state, 'company.website')}
                onChangeText={value => this.onChangeText('website', value)}
              />
            </Item>
            <Item
              regular
              style={[mypStyles.mTop3, mypStyles.borderDarkSkyBlue]}
            >
              <Input
                placeholder='Số điện thoại'
                defaultValue={_.get(this.state, 'company.phone')}
                onChangeText={value => this.onChangeText('phone', value)}
              />
            </Item>
            <Item
              regular
              style={[mypStyles.mTop3, mypStyles.borderDarkSkyBlue]}
            >
              <Input
                placeholder='Email'
                defaultValue={_.get(this.state, 'company.email')}
                onChangeText={value => this.onChangeText('email', value)}
              />
            </Item>
            {/* <Item
              regular
              style={[mypStyles.mTop3, mypStyles.borderDarkSkyBlue]}
            >
              <Input
                placeholder='Cập nhật mới nhất'
                onChangeText={value =>
                  this.onChangeText('latest_update', value)
                }
              />
            </Item> */}
            {
              this.renderRowDatePicker(true)
            }
            <Textarea
              style={[mypStyles.mTop3, mypStyles.borderDarkSkyBlue]}
              rowSpan={5}
              bordered
                defaultValue={_.get(this.state, 'company.note')}
                placeholder='Ghi chú cá nhân'
              onChangeText={value => this.onChangeText('note', value)}
            />
            {/* <Item
              regular
              style={[mypStyles.mTop3, mypStyles.borderDarkSkyBlue]}
            >
              <Input placeholder='Dự án liên quan đến công ty' value={_.get(this.state, 'project.name')} />
              <Icon active name='search' onPress={this.handleSearchProject} />
            </Item> */}
          </Form>
        </Content>
        <PickerSearchUser
          ref='refUser'
          onItemChange={this.handleUserChange}
          dataSource={this.state.users}
          value={this.state.user}
          showAddContact={this.handleShowAddContact}
        />
        <PickerAddNewUser
          ref='refNewUser'
          onAddContact={this.handleAddContact}
        />
      </Container>
    )
  }
}
export default connectAutoDispatch(state => ({user: _.get(state, 'auth.user')}), {getCompanies})(EditCompanyContainer)