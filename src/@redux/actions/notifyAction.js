import notifyApi from '../../api/notifyApi'
import * as _ from 'lodash'
import { notifyWelcome } from '../../constants/notify-data'
import FCM from 'react-native-fcm'

export const RECEIVED_NOTIFY_INFO = 'notify/received-list'
export const USER_LOGOUT = 'auth/user-logout'

export const FCM_BADGE_RESET = 'notify/bage-reset'

export const getNotifications = (user) => {
  return async dispatch => {
    try {
      const result = await notifyApi.all(user)
      const badge = await FCM.getBadgeNumber()
      if (_.isArray(result) && _.size(result) === 0) {
        await notifyApi.sentNotify({ ...notifyWelcome, to: user.id }, user.access_token)
        const rs = await notifyApi.all(user)
        dispatch({ type: RECEIVED_NOTIFY_INFO, payload: {ls: rs, badge} })
      } else {
        dispatch({ type: RECEIVED_NOTIFY_INFO, payload: {ls: result, badge} })
      }

    } catch (error) {
      console.error(error);
    }
  }
}

export function resetBadge () {
  return dispatch => {
    dispatch({type: FCM_BADGE_RESET, payload: { badge: 0 }})
  }
  FCM.setBadgeNumber(0)
}

export function deleteNotify(id, access_token) {
  return async dispatch => {
    notifyApi.deleteNotify({ id, access_token })
  }
}