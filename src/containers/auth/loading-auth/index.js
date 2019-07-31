import React from 'react'
import { Container } from 'native-base';
import styled from 'styled-components/native'
import colors from '../../../themes/colors';
import KEY from 'constants/cache-key'
import CACHE from 'utils/cache'
import authApi from 'api/authApi';
import { login, saveUserInfoLocal, logoutInfo } from '@redux/actions/authAction'
import { getNotifications } from '@redux/actions/notifyAction'
import connectAutoDispatch from '../../../@redux/connect';
import * as _ from 'lodash'

const ImageView = styled.Image.attrs({
  source: require('images/logo.png'),
  resizeMode: 'contain' //
})`
  marginTop: 60
  alignSelf: center
`

const LoadingLabel = styled.Text`color: ${colors.white} fontWeight: bold paddingTop: 12 fontSize: 19 letterSpacing: 2`

class LoadingAuth extends React.Component {

  goToAuth() {
    CACHE.removeCache(KEY.USER_LOCAL)
    this.props.navigation.navigate('Auth')
  }

  async componentDidMount () {
    try {
      const rs = await CACHE.getCache(KEY.USER_LOCAL)
      const fcm = await CACHE.getCache(KEY.FCM_TOKEN)
      console.log('LOGIN -LOADING', fcm, rs)
      const { email = null, password = null } = rs
      
      // if (saveToken) {
      //   await this.props.logoutInfo(saveToken)
      // }
      if (email && password) {
        const fcm = await CACHE.getCache(KEY.FCM_TOKEN)
        const user = await this.props.login(email, password, fcm.fcmToken)
        if (_.get(user, 'accessDenied') === true) {
          CACHE.removeCache(KEY.USER_LOCAL)
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
              this.props.saveUserInfoLocal(rs, fcm, {...user, password: rs.password})
              this.props.navigation.navigate('app')
              this.props.getNotifications(user)
            }
          } else {
            this.goToAuth()
          }
        }
      } else {
        this.goToAuth()
      }  
    } catch (error) {
      this.goToAuth()
      console.log('LOGIN LOADING..... ---- ', error)
    }
    
  }

  render () {
    return (
      <Container style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: colors.rouge }}>
        <ImageView />
        <LoadingLabel>Loading...</LoadingLabel> 
      </Container>
    )
  }
}

export default connectAutoDispatch(state => ({}), {
  login, saveUserInfoLocal, getNotifications, logoutInfo
})(LoadingAuth)