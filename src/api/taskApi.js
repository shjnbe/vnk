import { getFetch, postFetch, putFetch, deleteFetch } from '../utils/fetch'
import { has } from 'lodash'
import moment from 'moment'
export default {
  add: (data, access_token) => {
    return postFetch(`task?access_token=${access_token}`, data)
  },
  update: (id, data) => {
    return putFetch(`task/${id}`, data)
  },
  delete: (id) => {
    return deleteFetch(`task/${id}`)
  },
  all: () => {
    return getFetch(`task/${id}`, {})
  },
  getById: id => {
    return getFetch(`task/${id}`)
  },
  tasks: (user_id, {access_token, id}) => {
    return getFetch(`task`, { params: { access_token, filter: { order: 'created desc', where: {created_by: id, user_id} }}})
  },
  myTasks: ({access_token, id}) => {
    return getFetch(`task`, { params: { access_token, filter: { order: 'created desc', where: {user_id: id} }}})
  }
}
