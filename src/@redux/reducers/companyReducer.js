import update from 'react-addons-update'
import { 
  FOLLOW_COMPANY,
  UN_FOLLOW_COMPANY,
  FETCH_ALL_COMPANY,
  FETCH_USER_COMPANY,
  SELECTED_COMPANY
 } from '@redux/actions/companyAction'
 import { concat, size, filter, get } from 'lodash'

const stateDefault = {
  list: [],
  companyFollow: [],
  companySelected: null
}

export default (state = stateDefault, action) => {
  const { type } = action
  switch (type) {
    case FOLLOW_COMPANY:
      return followCompany(state, action)
    case UN_FOLLOW_COMPANY:
      return unFollowCompany(state, action)
    case FETCH_ALL_COMPANY:
      return getAllCompany(state, action)
    case FETCH_USER_COMPANY:
      return companyOfUser(state, action)
    case SELECTED_COMPANY: 
      return receivedCompanySelected(state, action)
    default:
      return { ...state }
  }
}

function getAllCompany (state, action) {
  const companyFollow = filter(action.payload || [], ({users}) => size(users||[]) > 0)
  return update(state, { list: { $set: action.payload }, companyFollow: {$set: companyFollow} })  
}

function receivedCompanySelected (state, { payload }) {
  let companySelected = payload
  const list = get(state, 'list', [])
  for (let index = 0; index < list.length; index++) {
    const element = list[index];
    if (element.id === payload.id) {
      companySelected = {...element, ...payload}
      list[index] = companySelected
    }
  }

  const companyFollow = get(state, 'companyFollow', [])

  for (let index = 0; index < companyFollow.length; index++) {
    const element = companyFollow[index];
    if (element.id === payload.id) {
      companyFollow[index] = companySelected
    }
  }

  return update(state, { 
    companySelected: { $set: companySelected },
    list: {$set: list},
    companyFollow: {$set: companyFollow}
  })
}

function companyOfUser (state, action) {
  return update(state, { companyFollow: { $set: action.payload } })  
}

function followCompany (state, action) {
  return update(state, { companyFollow: { $set: concat(action.payload, state.companyFollow || []) } })
}

function unFollowCompany (state, action) {
  const list = state.companyFollow.filter(it => it.id !== action.payload)
  return update(state, { companyFollow: { $set: list } })
}

function updateImage (state, action) { 
  return update(state, {  })
}
