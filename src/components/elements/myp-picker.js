import React from 'react'
import Modal from 'react-native-modalbox'
import { Header, Right, Icon, Body, Text, Content, ListItem } from 'native-base';
import colors from '../../themes/colors';
import mypStyles from '../../themes/myp-styles';
import { map, get } from 'lodash'

export default class MypPicker extends React.Component {

  open = () => {
    this.refs.modal.open()
  }

  onClose = () => {
    this.refs.modal.close()
  }

  render () {
    const me = this
    return (
      <Modal coverScreen={this.props.coverScreen || false} ref='modal'>
        <Header style={mypStyles.styleHeader}>
          <Body>
            <Text style={{
              color: colors.black
            }}>
              {this.props.title}
            </Text>
          </Body>
          <Right>
            <Icon name='x' type='Feather' style={{ color: colors.black }} onPress={this.onClose}/>
          </Right>
        </Header>
        <Content>
          {
            map(this.props.dataSource || [], (item, index) => {
              const keySelf = get(me.props.value, [me.props.code || 'key'])
              return (
                <MypPickerItem
                  title={get(item, [this.props.labelKey || 'title'])}
                  onItemChange={() => {
                    me.props.onItemChange(item, index)
                    me.refs.modal.close()
                  }}
                  key={get(item, [me.props.code || 'key'])}
                  isChecked={keySelf && get(item, [me.props.code || 'key']) === keySelf }
                />
              )}
            )
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
          {this.props.title}
        </Text>
        {this.props.isChecked && <Icon name='check' type='Feather' style={{ fontSize: 20 }}/>}
      </ListItem>
    )
  }
}