import { getFetch, postFetch, putFetch, uploadFileCrop } from 'utils/fetch'
import { has } from 'lodash'
import moment from 'moment'

export default {
  getPackageInfo: async params => {
    return getFetch(`order/findOne`, {
      params: {}
    })
  },
  getKPIBy: async (user_id, access_token) => {
    try {
      return getFetch(`kpi/findOne`, {
        params: { filter: {where: {user_id}}, access_token }
      })
    } catch (error) {
      console.log(error)
      return null
    }
  },
  saveKpi: async (data, access_token) => {
    if (has(data, 'id')) {
      return putFetch('kpi/'+ data.id, data, {params: {access_token}})
    } else {
      return postFetch('kpi', data, {params: {access_token}})
    }
  },
  createKpiScore: async (data, access_token) => {
    return postFetch('kpi', data, {params: {access_token}})
  },
  serviceOrder: (data, access_token) => {
    console.log('data ---->',JSON.stringify(data))
    if (has(data, 'id')) {
      return putFetch('order/'+ data.id, data, {params: {access_token}})
    } else {
      return postFetch(`order`, data, {params: {access_token}})
    }
  },
  getOrder: ({user_id, team_id}, access_token) => {
    const where = { active: true, expire_date: {neq: null}}
    if (team_id) {
      where.team_id = team_id
    } else {
      where.user_id = user_id
    }
    return getFetch('order/findOne', { params: { filter: { where }, access_token } })
  },
  getSelfScore: async (user_id, access_token) => {
    try {
      const params = { 
        access_token
        //,
        // where: { 
        //   user_id,
        //   and: [
        //     {created: { lt: moment().endOf('days').toJSON()}},
        //     {created: { gt: moment().startOf('days').toJSON()}}
        //   ]
        // }
      }
      return getFetch(`user/get-today-kpi/${user_id}`, { params })
    } catch (error) {
      return null
    }
  },
  createSelfScore: (data, user) => {
    data.user_id = user.id
    return postFetch(`user/save-kpi/${data.user_id}`, {
      score: data,
      created: null
    }, { params: { access_token: user.access_token } })
    // if (has(data, 'id')) {
    //   return putFetch('kpi-score/'+ data.id, data, {params: {access_token: user.access_token}})
    // } else {
    //   data.created = moment().toJSON()
    //   return postFetch('kpi-score', data, { params: { access_token: user.access_token } })
    // }
  },
  getKpiMonth: (user, from, to) => {
    return getFetch(`kpi-score`, {
      params: { filter: {where: {user_id: user.id, created: {gte: from, lte: to}}}, access_token: user.access_token }
    })
  },
  createSchedule: (user, data) => {
    data.user_id = user.id
    data.team_id = user.team_id
    data.project_id = 0
    if (has(data, 'id')) {
      return putFetch('schedule/'+ data.id, data, {params: {access_token: user.access_token}})
    } else {
      data.created = moment().toJSON()
      return postFetch('schedule', data, { params: { access_token: user.access_token } })
    }
  },
  getSchedule: (user) => {
    return getFetch(`schedule/findOne`, {
      params: { filter: { where: {user_id: user.id, team_id: user.team_id} }, access_token: user.access_token }
    })
  },

}