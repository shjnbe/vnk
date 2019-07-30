import { getFetch, postFetch, putFetch, deleteFetch } from 'utils/fetch'

export default {
  getAll: () => {
    return getFetch('sale-team', {})
  },
  add: async data => {
    return postFetch('sale-team', data)
  },
  update: async (id, data) => {
    return putFetch(`sale-team/${id}`, { data })
  },
  delete: async id => {
    return deleteFetch(`sale-team/${id}`, {})
  }
}
