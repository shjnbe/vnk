import { getFetch, postFetch, putFetch, deleteFetch, uploadFileCrop, API } from '../utils/fetch'

export default {
  getAll: (filter= {}) => {
    filter.order = 'status asc'
    return getFetch('kpi-summary', { params: { filter } })
  },
  update: params => {
    return putFetch(`kpi-summary/${params.id}`, params)
  }
}
