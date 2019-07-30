import { getFetch, postFetch, putFetch, uploadFileCrop, postFetchRegister, API, postLogin } from 'utils/fetch'
import { has } from 'lodash'
import moment from 'moment'
export default {
  login: (email, password, access_token) => {
    console.log('login ------------- ', `user/login?access_token=${access_token}`, email, password)
    if (access_token)
      return postLogin(`user/login?access_token=${access_token}`, { email, password, access_token })
    return postLogin('user/login', { email, password })
  },
  getFullName: (id, access_token) => {
    return getFetch(`user/findOne`, { 
      params: {
        access_token, filter: {
          where: {id},
          fields: {full_name: true, id: true}
        }
      }
    })
  },
  uploadAvatar: async file => {
    return uploadFileCrop(`${API}file-upload`, file)
  },
  updateMyProfile: (data, access_token) => {
    return putFetch('user/'+ data.id +'?access_token=' + access_token, data, {})
  },
  me: userId => {
    return getFetch(`user/${userId}`, {})
  },
  register: async data => {
    try {
      data.team_id = 0
      const rs = await postFetchRegister('user', data) 
      return rs
    } catch (error) {
      console.log('error', error)
      return error
    }
  },
  logout: (access_token) => {
    return postFetch('user/logout?access_token='+access_token)
  },
  changePassword: (data, access_token) => {
    return postFetch(`user/change-password?access_token=${access_token}`, data)
  },
  getUsers: async (filter, access_token) => {
    return getFetch(`user`, {
      params: { filter, access_token }
    })
  },
  getUserByTeam: async (user, includeSelf = true) => {
    const where = { }
    if (user.team_id) {
      where.team_id = user.team_id
    } else {
      where.team_id = -1
    }
    if (!includeSelf) {
      where.id = { neq: user.id }
    }
    const params = { filter: { where }, access_token: user.access_token }
    return getFetch(`user`, {
      params
    })
  },
  getOrderByUser: async (user) => {
    let filter = {}
    if (user.team_id) {
      filter.where = { team_id: user.team_id, active: true, expire_date: {neq: null} }
    } else {
      filter.where = { user_id: user.id, active: true, expire_date: {neq: null} }
    }
    return getFetch(`order/findOne`, {
      params: { filter, access_token: user.access_token }
    })
  }
}
