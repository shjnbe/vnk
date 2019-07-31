import React from 'react'
import { View, Icon, Text, ListItem, Left, Body, Toast } from 'native-base'
import colors from '../../../themes/colors'
import styled from 'styled-components/native'
import Swipeout from 'react-native-swipeout'
import { CachedImage } from 'react-native-cached-image'
import * as OpenAnything from 'react-native-openanything'

const StatusView = styled.View`
  width: 8
  height: 8
  borderRadius: 4
  backgroundColor: ${props => props.backgroundColor || colors.appleGreen}
`

const IconRow = styled.Image.attrs({
  resizeMode: 'contain'
})`
  width: 38
  height: 38
`

const TouchableOut = styled.TouchableWithoutFeedback.attrs({
  activeOpacity: 0.8
})``

export default class MemberRow extends React.Component {

  constructor(props) {
    super(props)
    this.renderListButton = [
      {
        backgroundColor: '#ffffff',
        component: this.renderButton(require('../../../../images/globe/phone.png')),
        onPress: () => this.callAction('phone', props.phone)
      },
      { 
        backgroundColor: '#ffffff',
        component: this.renderButton(require('../../../../images/globe/message.png')),
        onPress: () => this.callAction('emal', props.email)
      },
      {
        backgroundColor: '#ffffff',
        component: this.renderButton(require('../../../../images/globe/map.png')),
        onPress: () => props.handleMap()
      },
      {
        backgroundColor: '#ffffff',
        component: this.renderButton(require('../../../../images/globe/contact_delete.png')),
        onPress: () => props.handleDelteteContact(props.index)
      }
    ]
  
  }

  callAction = (key, value) => {
    if (value) {
      switch (key) {
        case 'phone':
          OpenAnything.Call(value)
          break
        case 'email': 
          OpenAnything.Email(value)
          break
      }
    } else {
      Toast.show({
        type: 'warning',
        text: `Chưa có thông tin này.`,
        position: 'top',
        duration: 1000
      })
    }
  }

  renderButton (source) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <IconRow source={source} />
      </View>
    )
  }

  render () {
    return (
      <Swipeout
        style={{ backgroundColor: 'white' }}
        right={this.renderListButton}
        onOpen={() => console.log(this.props.item)}
        buttonWidth={48}
      >
        <TouchableOut onPress={() => this.props.handleMember(false, this.props.index, false)}>
          <ListItem avatar >
            <Left>
              <CachedImage source={this.props.avatar
                ? { uri: this.props.avatar }
                : require('../../../../images/logo.png')}
                style={{
                  width: 40,
                  height: 40,
                  marginLeft: 2,
                  borderRadius: 20
                }}
              />
            </Left>
            <Body >
              <Text>{this.props.full_name}</Text>
              <View style={{
                paddingTop: 8,
                flexDirection: 'row',
                alignItems: 'center'
              }}>
                <StatusView backgroundColor={colors.appleGreen} />
                <Text note style={{ paddingLeft: 8, color: colors.appleGreen }}>
                  {this.props.type}
                </Text>
              </View>
            </Body>
          </ListItem>
        </TouchableOut>
      </Swipeout>
    )
  }
}
