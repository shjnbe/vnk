import React from 'react'
import { Dimensions } from 'react-native'
import Modal from 'react-native-modalbox'
import { Header, Right, Icon, Body, Text, Content, ListItem, Input, Item, View } from 'native-base';
import colors from '../../themes/colors';
import mypStyles from 'themes/myp-styles';
import { map, get, min, clone, filter, includes, lowerCase, find, concat } from 'lodash'

export default class PickerSearchUser extends React.Component {

  state = {
    size: min([Dimensions.get('window').width, Dimensions.get('window').height]),
    textSearch: '',
    contacts: []
  }

  open = (contacts) => {
    contacts = contacts || []
    this.refs.modal.open()
    this.setState({contacts})
  }

  getData = () => {
    if (this.state.textSearch) {
      return filter(clone(this.props.dataSource)||[], ({full_name}) => includes(lowerCase(full_name), lowerCase(this.state.textSearch)))
    }
    return this.props.dataSource || []
  }

  onChangeText = textSearch => {
    this.setState({textSearch})
  }

  render () {
    const me = this
    return (
      <Modal ref='modal' 
        swipeToClose={false}
        style={{height: this.state.size*1.2, width: this.state.size-80, borderRadius: 5} }
      >
        <Item>
          <Input placeholder='Tìm kiếm...' onChangeText={this.onChangeText} />
          <Icon name='search' />
          <Icon name='add-circle' onPress={this.props.showAddContact} />
        </Item>
        <Content>
          {
            map(this.getData(), item => {
              let isChecked = false
              const it = find(me.state.contacts, ({id}) => item.id === id)
              if (it) {
                isChecked = true
              }
              return (
                <MypPickerItem
                  {...item}
                  onItemChange={() => {
                    let contacts = me.state.contacts
                    if (isChecked) {
                      contacts = filter(contacts, ({id}) => item.id !== id)
                    } else {
                      contacts = concat(contacts, [item])
                    }
                    me.setState({ contacts })
                    me.props.onItemChange(contacts)
                  }}
                  key={get(item, ['id'])}
                  isChecked={isChecked}
                />
              )  
            })
          }
        </Content>
      </Modal>
    )
  }
}

export class MypPickerItem extends React.Component {
  render () {
    return (
      <ListItem onPress={this.props.onItemChange} style={{
        padding: 4
      }}>
        <Text style={{
          flex: 1,
          color: colors.black
        }}>
          {this.props.full_name}
        </Text>
        {this.props.isChecked && <Icon name='check' type='Feather' style={{ fontSize: 20 }}/>}
      </ListItem>
    )
  }
}