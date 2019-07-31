import React from 'react'
import { Dimensions } from 'react-native'
import Modal from 'react-native-modalbox'
import { Right, Icon, Body, Text, Content, ListItem, Input, Item, View, Title, Label, Toast, Form } from 'native-base';
import colors from '../../themes/colors';
import mypStyles from '../../themes/myp-styles';
import * as _ from 'lodash'
import moment from 'moment';
import styled from 'styled-components/native'


const Header = styled.View`
  flexDirection: row
  justifyContent: center
  alignItems: center
  paddingTop: 12
  paddingBottom: 12
  paddingLeft: 8
  paddingRight: 8
`

const fieldData = [
  {
    key: 'name',
    placeholder: 'Họ và tên'
  },
  {
    key: 'phone',
    placeholder: 'Điện thoại'// Họ và tên, điện thoại, địa chỉ mail, địa chỉ nhà
  },
  {
    key: 'email',
    placeholder: 'Địa chỉ mail'
  },
  {
    key: 'address',
    placeholder: 'Địa chỉ nhà'
  }
]

export default class PickerAddNewUser extends React.Component {

  state = {
    contact: {},
    size: _.min([Dimensions.get('window').width, Dimensions.get('window').height]),
  }

  open = () => {
    this.refs.modal.open()
    this.setState({
      contact: {
        id: moment().unix(),
        name: '',
        phone: '',
        email: '',
        address: '',
        type: '',
        company: '',
        position: '' 
      }
    })
  }

  handleChangeText = (code, value) => {
    const contact = this.state.contact
    contact[code] = value
    this.setState({contact})
  }

  addUser = () => {
    if (!this.state.contact.name) {
      Toast.show({text: 'Họ và tên không được để trống!', type: 'warning'})
      return 
    }

    if (!this.state.contact.phone) {
      Toast.show({text: 'Diện thoại không được để trống!', type: 'warning'})
      return 
    }
    this.props.onAddContact(this.state.contact)
    this.refs.modal.close()
  }

  close = () => {
    this.refs.modal.close()
  }

  render () {
    return (
      <Modal ref='modal' 
        swipeToClose={false}
        style={{height: 1.2*this.state.size, width: this.state.size-80, borderRadius: 5}}
      >
        <Header transparent noShadow style={mypStyles.styleHeader}>
          <Icon name='chevron-left' type='Feather' onPress={this.close} />
          <Text style={{flex: 1, textAlign: 'center'}} numberOfLines={1}>Thêm liên hệ</Text>
          <Icon name='person-add' style={{ color: colors.darkSkyBlue }} onPress={this.addUser} />
        </Header>
        <Content>
          <Form>
            <Item floatingLabel>
              <Label>Tên đầy đủ</Label>
              <Input value={this.state.contact.name || this.state.contact.full_name} onChangeText={value => this.handleChangeText('name', value)}/>
            </Item>
            <Item floatingLabel>
              <Label>Vị trí</Label>
              <Input value={this.state.contact.position} onChangeText={value => this.handleChangeText('position', value)}/>
            </Item>
            <Item floatingLabel>
              <Label>Mobile</Label>
              <Input value={this.state.contact.phone} keyboardType='phone-pad' onChangeText={value => this.handleChangeText('phone', value)}/>
            </Item>
            <Item floatingLabel>
              <Label>Email</Label>
              <Input value={this.state.contact.email} autoCapitalize='none'
                
                keyboardType='email-address'
                onChangeText={value => this.handleChangeText('email', value)}
              />
            </Item>
            <Item floatingLabel>
              <Label>Vai trò</Label>
              <Input 
                
                value={this.state.contact.type}
                onChangeText={value => this.handleChangeText('type', value)}
              />
            </Item>
            <Item floatingLabel>
              <Label>Công ty</Label>
              <Input value={this.state.contact.company} onChangeText={value => this.handleChangeText('company', value)} />
            </Item>
            <Item floatingLabel>
              <Label>Địa chỉ</Label>
              <Input value={this.state.contact.address} onChangeText={value => this.handleChangeText('address', value)}/>
            </Item>
          </Form>
        </Content>
      </Modal>
    )
  }
}
