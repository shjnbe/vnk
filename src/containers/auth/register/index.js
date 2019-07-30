import React from 'react'
import styled from 'styled-components/native'
import colors from 'themes/colors'
import * as _ from 'lodash'
import KEY from 'constants/cache-key'
import CACHE from 'utils/cache'

import { Container, Content, Button, Text, Footer, Toast } from 'native-base'

import InputLogin from 'components/elements/input-login'
import authApi from 'api/authApi'

const ImageView = styled.Image.attrs({
  source: require('images/logo.png'),
  resizeMode: 'contain' //
})`
  marginTop: 60
  alignSelf: center
`

export default class RegisterContainer extends React.Component {
  state = {
    phone: '',
    password: '',
    email: '',
    full_name: ''
  }

  handleRegister = async () => {
    const { phone, password, email, full_name } = this.state
    try {
      if (phone && password && email && full_name) {
        const rs = await authApi.register(
          _.pick(this.state, ['phone', 'password', 'email', 'full_name'])
        )
        // console.log('kakaka', rs)
        if (_.has(rs, 'error')) {
          Toast.show({
            text: _.get(rs, 'error.details.messages.email.[0]', 'Đăng ký không thành công'),
            type: 'danger',
            position: 'top'
          })
        } else {
          Toast.show({
            text:
              `Chúng tôi đã nhận được đăng ký của bạn. Chúng tôi sẽ liên hệ với bạn qua Email hoặc điện thoại của bạn trong thời gian tới. Bạn có thể Add số Zalo 0927 161 161 để được hỗ trợ nhé`,
            type: 'success',
            position: 'top',
            duration: 5000
          })
          this.props.navigation.goBack()
        }
      } else {
        Toast.show({
          text: 'Vui lòng nhập đầy đủ thông tin',
          type: 'warning',
          position: 'top'
        })
      }
    } catch (error) {
      Toast.show({
        text: 'Đăng ký không thành công',
        type: 'danger',
        position: 'top'
      })
    }
  }

  handleLogin = () => {
    this.props.navigation.navigate('login')
  }

  onChangeText = (value, code) => {
    this.setState({ [code]: value })
  }

  componentDidMount () {
    CACHE.removeCache(KEY.USER_LOCAL)
  }

  render () {
    return (
      <Container style={{ backgroundColor: colors.rouge }}>
        <Content style={{ marginLeft: 16, marginRight: 16 }}>
          <ImageView />
          <InputLogin
            placeholder='Họ tên'
            label='Họ tên'
            onChangeText={value => this.onChangeText(value, 'full_name')}
          />
          <InputLogin
            placeholder='example@company.com'
            label='Thư điện tử'
            onChangeText={value => this.onChangeText(value, 'email')}
          />
          <InputLogin
            placeholder='Số điện thoại'
            label='Số điện thoại'
            onChangeText={value => this.onChangeText(value, 'phone')}
          />
          <InputLogin
            secureTextEntry
            placeholder='Mật khẩu'
            label='Mật khẩu'
            onChangeText={value => this.onChangeText(value, 'password')}
          />
          <Button
            textStyle={{ color: colors.rouge }}
            large
            block
            light
            rounded
            onPress={this.handleRegister}
            style={{ marginTop: 24, backgroundColor: colors.veryLightPink }}
          >
            <Text
              style={{ fontSize: 16, fontWeight: 'bold', color: '#4a4a4a' }}
            >
              {' '}
              Đăng ký{' '}
            </Text>
          </Button>
        </Content>
        <Footer style={{ backgroundColor: 'transparent' }}>
          <Button onPress={this.handleLogin} light transparent>
            <Text style={{ color: colors.powderBlue }}>Đăng nhập</Text>
          </Button>
        </Footer>
      </Container>
    )
  }
}
