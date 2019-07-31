import React from 'react'
import { Dimensions } from 'react-native'
import Modal from 'react-native-modalbox'
import { Right, Icon, Body, Text, Content, ListItem, Input, Item, View, Title, Label, Toast, Form } from 'native-base';
import colors from '../../themes/colors';
import mypStyles from '../../themes/myp-styles';
import * as _ from 'lodash'
import moment from 'moment';
import styled from 'styled-components/native'
import * as OpenAnything from 'react-native-openanything'


const Header = styled.View`
  flexDirection: row
  justifyContent: center
  alignItems: center
  paddingTop: 12
  paddingBottom: 12
  paddingLeft: 8
  paddingRight: 8
`

const ViewW = styled.View``

const UserItem = ({placeholder, iconName, value, onPress}) => (
  <ViewW style={{ marginTop: 12, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
    <Label style={{ fontSize: 14, opacity: 0.8 }}>{placeholder}:</Label>
    <ViewW style={{ flexDirection: 'row', marginTop: 6, paddingBottom: 4, justifyContent: 'flex-start', alignItems: 'center' }}>
      <Label style={{fontSize: 16, flex: 1}}>{value}</Label>
      {
        iconName && <Icon name={iconName} type='Feather' style={{ color: '#000', opacity: 0.7, fontSize: 22 }} onPress={() => onPress(iconName, value)}/>
      }
    </ViewW>
  </ViewW>
)

const fieldData = [
  {
    key: 'name',
    placeholder: 'Họ và tên'
  },
  {
    key: 'phone',
    placeholder: 'Điện thoại', iconName: 'phone'// Họ và tên, điện thoại, địa chỉ mail, địa chỉ nhà
  },
  {
    key: 'email',
    placeholder: 'Địa chỉ mail',
    iconName: 'mail'
  },
  {
    key: 'address',
    placeholder: 'Địa chỉ nhà'
  }
]

export default class PickerDetailUser extends React.Component {

  state = {
    contact: {},
    size: _.min([Dimensions.get('window').width, Dimensions.get('window').height]),
  }

  open = contact => {
    this.setState({ contact })
    console.log('contact', contact)
    this.refs.modal.open()
  }

  close = () => {
    this.refs.modal.close()
  }

  callAction = (type, value) => {
    if (type === 'mail') {
      OpenAnything.Email(value)
    }

    if (type === 'phone') {
      OpenAnything.Call(value)
    }
  }

  render () {
    return (
      <Modal ref='modal' 
        swipeToClose={false}
        style={{height: 1.2*this.state.size, width: this.state.size-80, borderRadius: 5}}
      >
        <Header transparent noShadow style={mypStyles.styleHeader}>
          <Icon name='chevron-left' type='Feather' onPress={this.close} />
          <Text style={{flex: 1, textAlign: 'center'}} numberOfLines={1}>Thông tin liên hệ</Text>
        </Header>
        <Content padder>
          <Form>
            <UserItem onPress={this.callAction} placeholder='Họ và tên' value={_.get(this.state, `contact.name`, _.get(this.state, `contact.full_name`))}/>
            <UserItem placeholder='Điện thoại' iconName='phone' value={_.get(this.state, `contact.phone`)}/>
            <UserItem placeholder='Địa chỉ mail' iconName='mail' value={_.get(this.state, `contact.email`)}/>
            <UserItem placeholder='Địa chỉ nhà' value={_.get(this.state, `contact.address`)}/>
          {/* {
            _.map(fieldData, item => <UserItem onPress={this.callAction} {...item} value={_.get(this.state, `contact.${item.key}`)} />)
           } */}
           </Form>
        </Content>
      </Modal>
    )
  }
}
