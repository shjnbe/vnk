import { Platform } from 'react-native'
import { getFetch, postFetch, putFetch, deleteFetch } from 'utils/fetch'
import { has, isArray } from 'lodash'
import moment from 'moment'

export default {
  sentNotify: ({ body, title, to, from, color = '#00ACD4', id = 'view' }, access_token) => {
    const data = {
      from,
      to,
      data: {
        body,
        title,
        notification: {
          body,
          title,
          color,
          priority: 'high',
          id,
          show_in_foreground: true
        }
      },
      created: moment().toJSON()
    }
    return postFetch(`notify?access_token=${access_token}`, data)
  },
  all: ({ access_token, id }) => {
    return getFetch(`notify`, { params: { filter: { where: { to: id }, order: 'created desc', limit: 150 } }, access_token })
  },
  add: (data, access_token) => {
    return postFetch('notify', data, { params: { access_token } })
  },
  sentNotifyToUser: ({ data, toUserId, access_token }) => {
    return postFetch(`notify/send-notify-to/${toUserId}`, { data }, { params: { access_token } })
  },
  postToken: ({ user_id, token_key, access_token }) => {
    return postFetch(`token`, { user_id, token_key, device: Platform.OS }, { params: { access_token } })
  },
  deleteToken: async ({ user_id, access_token, fcmToken }) => {
    try {
      const rs = await getFetch('token', { params: { filter: { where: { user_id, token_key: fcmToken } } }, access_token })
      if (rs && isArray(rs)) {
        rs.forEach(element => {
          deleteFetch(`token/${element.id}`, { params: { access_token } })
        });
        return true
      }
      return null
    } catch (error) {
      return null
    }
  },
  deleteNotify: async ({ id, access_token }) => {
    try {
      await deleteFetch(`notify/${id}`, { params: { access_token } })
      return true
    } catch (error) {
      return null
    }
  },

}
