import React from 'react'
import styled from 'styled-components/native'
import colors from '../../../themes/colors'
import styles from './styles'
import { login, saveUserInfoLocal } from '@redux/actions/authAction'
import { getNotifications } from '@redux/actions/notifyAction'
import CACHE from 'utils/cache'
import KEY from 'constants/cache-key'
import notifyDF from 'constants/notify-data'
import fcmClient from 'utils/fcm-client'
import {
  Container,
  Content,
  View,
  Text,
  Label,
  Switch,
  Button,
  Toast
} from 'native-base'

import InputLogin from 'components/elements/input-login'
import connectAutoDispatch from '../../../@redux/connect'
import moment from 'moment'
import FCM from 'react-native-fcm'
import * as _ from 'lodash'


const ImageView = styled.Image.attrs({
  source: require('images/logo.png'),
  resizeMode: 'contain' //
})`
  marginTop: 60
  alignSelf: center
`
// {
	
// 	"registration_ids": ["fjUVPOCVcCU:APA91bGkB_15R1BzOj-gv2wqag-Rmwx2YA-Xh3WRWFpveNTIlxrGMn1aaq1YbYTEvhF6WnGb3Eggb4oEpM6zzOteEDf7LEzFHTOMylqW0AuJXpySyQL2B_5aVa2LKrSVAW3tfjFommQy"],
//         "collapse_key": "1543594244378245%6a24bae6f9fd7ecd",
//         "notification": {"title": "DVT", "body": "test"},
//         "data": {}

// }
function getNotification (to, title, msg) {
  return {
    registration_ids: [to],
    notification: {
      id: 'view',
      body: msg,
      title,
    },
    data: {
      notification: {
        body: msg,
        title,
        color: '#00ACD4',
        priority: 'high',
        id: 'view',
        show_in_foreground: true
      }
    }
  }
}

class LoginContainer extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      fcm: null,
      rememberMe: true,
      email: __DEV__ ? 'thuandv7@gmail.com' : '',
      password: __DEV__ ? '123456' : ''
    }
  }

  async componentWillMount () {

  }
 
  async componentDidMount () {
    const rs = await CACHE.getCache(KEY.USER_LOCAL)
    if (rs) {
      this.setState(rs)
    }
    const fcm = await CACHE.getCache(KEY.FCM_TOKEN)
    if (fcm) {
      this.setState({fcm})
    }
  }

  handleLogin = async () => {
    //CACHE.removeCache('SHOW_MSG_LOCAL')
    const { email = null, password = null, rememberMe, fcm } = this.state
    if (email && password) {
      const user = await this.props.login(email, password, fcm.fcmToken)
      if (_.get(user, 'accessDenied') === true) {
        this.props.navigation.navigate('AccessDenied')
      } else {
        if (user) {
          if (user && user.packageExpire === false) {
            Toast.show({
              type: 'warning',
              text: 'Tài khoản đã hết hạn sử dụng đề nghị liên hệ với website myp.vn hoặc hotline: 0927161161 để sử dụng tiếp dịch vụ',
              position: 'top',
              duration: 4000
            })
          } else {
            this.props.saveUserInfoLocal(rememberMe ? { email, password, rememberMe, saveToken: fcm.fcmToken } : null, fcm, {...user, password})
            this.props.getNotifications(user)
            this.props.navigation.navigate('app')
          }
        } else {
          Toast.show({
            type: 'warning',
            text: 'Đăng nhập không thành công!',
            position: 'top'
          })
        }
      }
    } else {
      Toast.show({
        type: 'warning',
        text: 'Vui lòng nhập đầy đủ thông tin đăng nhập',
        position: 'top'
      })
    }
  }

  handleRegister = () => {
    CACHE.removeCache(KEY.USER_LOCAL)
    this.setState({ password: '', email: '' })
    this.props.navigation.navigate('register')
  }

  handleRememberMe = rememberMe => {
    this.setState({ rememberMe })
  }

  onChangeText = (key, value) => {
    this.setState({ [key]: value })
  }

  render () {
    return (
      <Container style={{ backgroundColor: colors.rouge }}>
        <Content style={{ marginLeft: 16, marginRight: 16 }}>
          <ImageView />
          <InputLogin
            placeholder='example@company.com'
            label='Email'
            defaultValue={this.state.email}
            onChangeText={value => this.onChangeText('email', value)}
          />
          <InputLogin
            secureTextEntry
            placeholder='Mật khẩu'
            label='Mật khẩu'
            defaultValue={this.state.password}
            onChangeText={value => this.onChangeText('password', value)}
          />
          <View style={styles.rememberMeView}>
            <Label style={styles.rememberMe}>Lưu mật khẩu?</Label>
            <Switch
              trackColor={{ false: colors.white, true: colors.lightblue }}
              value={this.state.rememberMe}
              onValueChange={this.handleRememberMe}
            />
          </View>
          <Button
            large
            block
            light
            rounded
            onPress={this.handleLogin}
            style={{ marginTop: 16, backgroundColor: colors.veryLightPink }}
          >
            <Text
              style={{
                color: colors.brownishGrey,
                fontWeight: 'bold',
                fontFamily: 'Helvetica',
                fontSize: 16
              }}
            >
              {' '}
              Đăng Nhập{' '}
            </Text>
          </Button>

          <Button
            transparent
            light
            onPress={this.handleRegister}
            style={{ marginTop: 16, marginBottom: 12, alignSelf: 'center' }}
          >
            <Text style={{ color: colors.powderBlue, fontFamily: 'Helvetica' }}>
              Đăng ký ?
            </Text>
          </Button>
        </Content>
      </Container>
    )
  }
}

export default connectAutoDispatch(state => ({}), {
  login, saveUserInfoLocal, getNotifications
})(LoginContainer)
