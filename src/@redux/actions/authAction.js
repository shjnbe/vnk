import { AsyncStorage } from 'react-native'
import { get, isArray } from 'lodash'
import authApi from '../../api/authApi'
import { setCache, getCache } from 'utils/cache'
import CACHE from '../../utils/cache'
import KEY from '../../constants/cache-key'
import * as _ from 'lodash'
import moment from 'moment'
import { getNotifications } from './notifyAction'
import { NavigationActions } from 'react-navigation'
import notifyApi from '../../api/notifyApi';
import FCM from 'react-native-fcm'

export const RECEIVED_USER_INFO = 'auth/user-info-success'
export const RECEIVED_USER_INCLUDE = 'auth/received-user-include-full-name'
export const RECEIVED_UPDATE_USER_INFO = 'auth/user-info-update'
export const USER_LOGOUT = 'auth/user-logout'
export const RECEIVED_TASK_OF_ME = 'auth/task-of-me-update'
export const RECEIVED_FCM_TOKEN = 'fcm/received-token'

const getTaskOfMe = (id) => {
  return async dispatch => {
    AsyncStorage.getItem(`note_user_${id}`)
    .then(data => {
      if (data && isArray(data)) {
        dispatch({type: RECEIVED_TASK_OF_ME, payload: JSON.parse(data)})
      }
    })
  }
}

let timer = null
const INTERVAL = 30000

export const getOrderByUser = user => {
  return async dispatch => {
    try {
      const order = await authApi.getOrderByUser(user)
      return order
    } catch (error) {
      console.log(error.message)
      return null
    }
  }
}

export const login = (email, password, deviceToken) => {
  return async dispatch => {
    try {
      const rs = await authApi.login(email, password, deviceToken)
      if (_.get(rs, 'status') === 'access_denied' || _.get(rs, 'status') === 'account_blocked') {
        return {
          accessDenied: true, message: 'Bạn đã bị khoá. Lý do vì đăng nhập trên nhiều điện thoại. Hãy liên hệ MYP để được trợ giúp'
        }
      }

      if (get(rs, 'userId')) {
        const payload = await authApi.me(rs.userId)
        let packageOrder = undefined
        let packageExpire = undefined
        const order = await dispatch(getOrderByUser(payload))
        if (order && get(order, 'active')) {
          packageOrder = get(order, 'package')
          const expire_date = moment(get(order, 'expire_date'))
          if (expire_date.isValid()) {
            packageExpire = expire_date.diff(moment()) > 0
          }
        }
        timer = setInterval(() => {
          dispatch(getNotifications(payload))
        }, INTERVAL)
        const data = { ...payload, access_token: rs.id, password, packageOrder, packageExpire }
        dispatch({ type: RECEIVED_USER_INFO, payload: data })
        dispatch(getTaskOfMe(rs.id))
        return data
      }
      return null
    } catch (error) {
      console.log('error', error)
      return null
    }
  }
}

export const updateMyProfile = user => {
  return async dispatch => {
    try {
      const rs = await authApi.updateMyProfile(user, user.access_token)
      if (!get(rs, 'error.message')) {
        dispatch({ type: RECEIVED_UPDATE_USER_INFO, payload: { ...rs } })
        return rs
      }

      return null
    } catch (error) {
      return null
    }
  }
}

export const saveUserInfoLocal = (userLocal, fcm, user) => {
  return async dispatch => {
    if (userLocal) {
      await CACHE.setCache(KEY.USER_LOCAL, userLocal)
    } else {
      await CACHE.removeCache(KEY.USER_LOCAL)
    }

    if (_.get(fcm, 'fcmToken') && user) {
      // const params = _.merge(user, {custom})
      dispatch(updateMyProfile(user))
      dispatch(updateToken(user, fcm.fcmToken))
    }

    dispatch({type: RECEIVED_FCM_TOKEN, payload: fcm })
  }
}

const updateToken = (user, token_key) => {
  return async dispatch => {
    try {
      console.log(user, token_key)
      const data = await notifyApi.postToken({...user, user_id: user.id, token_key})
      console.log('data', data)
    } catch (error) {
      console.log('loi cap nhat token', error.message)
    }
  }
}

export const saveTaskOfMe = (user, payload) => {
  return async dispatch => {
    AsyncStorage.setItem(`note_user_${user.id}`, JSON.stringify(payload))
    dispatch({type: RECEIVED_TASK_OF_ME, payload})
  }
}

export const logout = (user) => {
  return async dispatch => {
    const { fcmToken, access_token } = user
    if (user && user.custom) {
      user.custom.fcmTokens = _.filter(_.get(user, 'custom.fcmTokens', []), tk => tk !== fcmToken)
      // user.custom.fcmTokens = []
    }
    FCM.setBadgeNumber(0)
    clearInterval(timer)
    dispatch(updateMyProfile(user))
    dispatch({type: USER_LOGOUT})
    dispatch(NavigationActions.navigate({ routeName: 'Auth', params: { title: 'Login' } }))
    notifyApi.deleteToken({user_id: user.id, ...user})
    authApi.logout(access_token)
    CACHE.removeCache(KEY.USER_LOCAL)
  }
}

export const logoutInfo = access_token => {
  return async dispatch => {
    try {
      return await authApi.logout(access_token)
    } catch (error) {
      return {success: true}
    }
  }
}

export const getUserInclude = (id, access_token) => {
  return async dispatch => {
    try {
      const payload = await authApi.getFullName(id, access_token)
      dispatch({type: RECEIVED_USER_INCLUDE, payload})
      return payload
    } catch (error) {
      return null
    }
  }
}

