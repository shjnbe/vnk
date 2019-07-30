import update from 'react-addons-update'
import {
  RECEIVED_USER_INFO, 
  RECEIVED_UPDATE_USER_INFO,
  RECEIVED_TASK_OF_ME,
  RECEIVED_FCM_TOKEN,
  USER_LOGOUT,
  RECEIVED_USER_INCLUDE
} from '@redux/actions/authAction'

const stateDefault = {
  user: { email: '' },
  taskOfMe: [],
  userObj: {}
}

export default (state = stateDefault, action) => {
  const { type } = action
  switch (type) {
    case RECEIVED_USER_INFO:
      return receivedUserInfo(state, action)
    case RECEIVED_UPDATE_USER_INFO:
      return receivedUserInfoUpdate(state, action)
    case RECEIVED_TASK_OF_ME:
      return receivedTaskOfMe(state, action)
    case RECEIVED_FCM_TOKEN:
      return receivedFcmToken(state, action)
    case USER_LOGOUT:
      return stateDefault
    case RECEIVED_USER_INCLUDE:
      return receivedUserInclude(state, action)
    default:
      return { ...state }
  }
}

function receivedUserInclude (state, {payload}) {
  const userObj = state.userObj
  userObj[payload.id] = payload.full_name
  return update(state, { userObj: { $set: userObj } })
}

function receivedTaskOfMe (state, action) {
  return update(state, { taskOfMe: { $set: action.payload } })
}

function receivedUserInfo (state, action) {
  let newUser = state.user
  newUser = update(newUser, { $merge: action.payload })
  return update(state, { user: { $set: newUser } })
}

function receivedFcmToken (state, action) {
  let newUser = state.user
  newUser = update(newUser, { $merge: action.payload })
  return update(state, { user: { $set: newUser } })
}

function receivedUserInfoUpdate (state, action) {
  return receivedUserInfo(state, action)
  //return update(state, {user: {$apply: oldUser => { return {...oldUser,...action.payload}}}})
}
