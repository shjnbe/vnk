import React from 'react'
import { View, Modal } from 'react-native'
import colors from '../../themes/colors';
import { Container, Content, Label as NewLabel, Text, Button, Input, Toast } from 'native-base';
import styled from 'styled-components/native'
import authApi from 'api/authApi';
import connectAutoDispatch from '../../@redux/connect';
import * as _ from 'lodash'


const Note = styled(NewLabel)`
fontSize: 22
letterSpacing: 0
color: ${colors.white}
`

const Label = styled(NewLabel)`
  fontSize: 14
  fontStyle: normal
  letterSpacing: 0
  color: ${colors.white}
color: white fontWeight: bold margin-bottom: 8 marginLeft: 16`


const ImageView = styled.Image.attrs({
  source: require('images/logo.png'),
  resizeMode: 'contain' //
})`
  marginTop: 60
  alignSelf: center
`

export default class ChangePassSuccess extends React.Component {

  handleDone = () => {
    this.props.navigation.navigate('Auth')
  }

  render () {
    return (
      <Container style={{ backgroundColor: colors.rouge }}>
        <Content>
          <ImageView style={{ marginBottom: 32, marginTop: 80 }}/>
          <Note style={{ paddingHorizontal: 32, fontWeight: 'bold' }}>Tài khoản của bạn đã bị khoá!</Note>
          <Note style={{ marginTop: 8, paddingHorizontal: 32 }}>Lý do vì đăng nhập trên nhiều điện thoại. Hãy liên hệ MYP để được trợ giúp!</Note>
          <Button onPress={this.handleDone} full style={[myStyle.button, { marginTop: 32 }]}><Text style={myStyle.textButton}>Quay lại</Text></Button>
        </Content>
      </Container>
    )
  }
}

const myStyle = {
  button: {
    marginHorizontal: 32,
    marginTop: 24,
    height: 50,
    borderRadius: 100,
    backgroundColor: "#fbdede",
    shadowColor: "#0000001c",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowRadius: 1,
    shadowOpacity: 1
  },
  textButton: {
    fontSize: 16,
    fontWeight: "bold",
    fontStyle: "normal",
    letterSpacing: 0,
    textAlign: "center",
    color: colors.greyishBrown
  }
}