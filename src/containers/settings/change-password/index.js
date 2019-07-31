import React from 'react'
import { View, Modal } from 'react-native'
import colors from '../../../themes/colors';
import { Container, Content, Label as NewLabel, Text, Button, Input, Toast } from 'native-base';
import styled from 'styled-components/native'
import authApi from '../../../api/authApi';
import connectAutoDispatch from '../../../@redux/connect';
import * as _ from 'lodash'

const Label = styled(NewLabel)`
  fontSize: 14
  fontStyle: normal
  letterSpacing: 0
  color: ${colors.white}
color: white fontWeight: bold margin-bottom: 8 marginLeft: 16`


const ImageView = styled.Image.attrs({
  source: require('../../../images/logo.png'),
  resizeMode: 'contain' //
})`
  marginTop: 60
  alignSelf: center
`

export default class ChangePassComponent extends React.Component {

  state = {
    modalVisible: false,
    error: null
  }

  onOpen = () => {
    this.setState({ modalVisible: true })
  }

  onClose = () => {
    this.setState({ modalVisible: false })
  }

  handleChange ({value, key}) {
    this.setState({[key]: value, error: null})
  }

  handleSuccess = async e => {
    const { oldPassword, newPass, newPassword } = this.state
    if (!oldPassword || !newPass || !newPassword) {
      this.setState({ error: 'Vui lòng kiểm tra lại dữ liệu!' })
    } else {
      if (newPass === newPassword) {
        this.setState({ error: null })
        try {
          const data = await authApi.changePassword({oldPassword, newPassword}, _.get(this.props, 'user.access_token'))
          this.props.navigation.navigate('changePassword', { title: '' })
        } catch (err) {
          console.log(err)
          this.setState({error: 'Đã có lỗi xảy ra vui lòng kiểm tra lại'})
        }
      } else {
        this.setState({ error: 'Mật khẩu mới không giống nhau!' })
      }
    }
  }

  render () {
    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={this.state.modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
        <Container style={{ backgroundColor: colors.rouge, flex: 1 }}>
          <Content>
            <ImageView />
            <TextInput name='current' title='Mật khẩu hiện tại (*)' onChangeText={value => this.handleChange({value, key: 'oldPassword'})}/>
            <TextInput name='pass' title='Mật khẩu mới (*)' onChangeText={value => this.handleChange({value, key: 'newPass'})}/>
            <TextInput name='againPass' title='Nhập lại mật khẩu mới (*)' onChangeText={value => this.handleChange({value, key: 'newPassword'})}/>
            {
              this.state.error ? 
              <Note style={{ color: 'yellow', fontSize: 15, marginTop: 24, marginHorizontal: 40 }}>{this.state.error}</Note> 
              : <View/>
            }
            <Button onPress={this.handleSuccess} full style={myStyle.button}><Text style={myStyle.textButton}>Tiếp tục</Text></Button>
          </Content>
        </Container>
      </Modal>
    )
  }
}

const Note = styled(NewLabel)`
fontSize: 22
letterSpacing: 0
color: ${colors.white}
`

export class ChangePassSuccess extends React.Component {

  handleDone = () => {
    this.props.navigation.navigate('Auth')
  }

  render () {
    return (
      <Container style={{ backgroundColor: colors.rouge }}>
        <Content>
          <ImageView style={{ marginBottom: 32, marginTop: 80 }}/>
          <Note style={{ paddingHorizontal: 32 }}>Đổi mật khẩu thành công!</Note>
          <Note style={{ marginTop: 8, paddingHorizontal: 32 }}>Hãy dùng mật khẩu mới để đăng nhập!</Note>
          <Button onPress={this.handleDone} full style={[myStyle.button, { marginTop: 32 }]}><Text style={myStyle.textButton}>Xong</Text></Button>
        </Content>
      </Container>
    )
  }
}

class TextInput extends React.Component {

  state = {
    borderColor: colors.white
  }

  handleBlur = e => {
    this.setState({ borderColor: colors.white })
  }

  handleFocus = e => {
    this.setState({ borderColor: '#a8e490' })
  }

  render () {
    return (
      <View style={{ marginHorizontal: 32, marginTop: 16 }}>
        <Label>{this.props.title}</Label>
        <Input {...this.props} onFocus={this.handleFocus} onBlur={this.handleBlur} style={[myStyle.input, { borderColor: this.state.borderColor }]} secureTextEntry />
      </View>
    )
  }
}

const myStyle = {
  input: {
    height: 50,
    borderRadius: 100,
    backgroundColor: "#fafff2",
    shadowColor: "#00000060",
    shadowOffset: {
      width: 0,
      height: 1
    },
    paddingLeft: 16,
    shadowRadius: 1,
    shadowOpacity: 1,
    borderStyle: "solid",
    borderWidth: 1
  },
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