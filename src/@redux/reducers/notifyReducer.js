import update from 'react-addons-update'
import { RECEIVED_NOTIFY_INFO, USER_LOGOUT, FCM_BADGE_RESET } from '../actions/notifyAction'

const stateDefault = {
  list: [],
  badge: 0
}

export default (state = stateDefault, action) => {
  const { type } = action
  switch (type) {
    case RECEIVED_NOTIFY_INFO:
      return receivedNotify(state, action)
    case USER_LOGOUT: return stateDefault
    case FCM_BADGE_RESET: return update(state, { badge: { $set: 0 } })
    default:
      return { ...state }
  }
}

function receivedNotify(state, { payload }) {
  return update(state, { list: { $set: payload.ls }, badge: { $set: payload.badge } })
}
