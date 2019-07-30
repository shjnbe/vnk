import React from 'react'
import styled from 'styled-components/native'
import { get } from 'lodash';
import * as OpenAnything from 'react-native-openanything'

const Wrapper = styled.View`
flexDirection: row
justifyContent: flex-start
alignItems: center
paddingLeft: 12
paddingRight: 12
`

const Left = styled.View`
flex: 1
flexDirection: column
justifyContent: center
alignItems: flex-start
`
const Right = styled.View`
flexDirection: row
justifyContent: flex-start
alignItems: center
`

const Text = styled.Text` height: 24 fontWeight: bold color: #353a41`
const SubText = styled.Text`
fontSize: 14
color: #5d6064
`

const Icon = styled.Image.attrs({
  resizeMode: 'contain'
})`
  width: 33
  height: 33
`

const Touchable = styled.TouchableOpacity``

export default class ProfileItem extends React.Component {

  handleNavigate = (key, value) => {
    console.log(key, value)
    switch (key) {
      case 'phone':
        OpenAnything.Call(value)
        break;
      case 'message':
        OpenAnything.Text(value)
        break;
      case 'mapContainer':
        this.props.onNavigation(key, {address: value})
        break;
      case 'email':
        OpenAnything.Email(value)
        break;
      default:
        break;
    }
  }

  render () {
    return (
      <Wrapper style={{ marginTop: this.props.first ? 4 : 24 }}>
        <Left style={{ flex: 1 }}>
          <Text>{this.props.title}</Text>
          <SubText>{this.props.subTitle}</SubText>
        </Left>
        <Right style={{ flexDirection: 'row' }}>
          {this.props.ico && (
            <Touchable onPress={() => this.handleNavigate(this.props.navKey, this.props.subTitle)}>
              <Icon
                source={this.props.ico}
                style={{ marginRight: this.props.ico1 ? 8 : 0 }}
              />
            </Touchable>
          )}
          {this.props.ico1 && (
            <Touchable onPress={() => this.handleNavigate(this.props.nav1Key, this.props.subTitle)}>
              <Icon source={this.props.ico1} />
            </Touchable>
          )}
        </Right>
      </Wrapper>
    )
  }
}
