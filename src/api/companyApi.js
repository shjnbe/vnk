import { getFetch, postFetch, putFetch, deleteFetch, uploadFileCrop, API } from '../utils/fetch'

export default {
  getAll: (filter= {}) => {
    filter.limit =  100
    filter.order = 'id desc'
    return getFetch('company', { params: { filter } })
  },
  getFollowCompany: (user, filter = {}) => {
    return getFetch(`user/${user.id}/companies`, { params: { filter, access_token: user.access_token} })
  },
  followCompany: (userId, companyId, access_token) => {
    return putFetch(`user/${userId}/companies/rel/${companyId}`, undefined, { params: { access_token} })
  },
  unFollowCompany: (userId, companyId, access_token) => {
    return deleteFetch(`user/${userId}/companies/rel/${companyId}`, { params: { access_token } })
  },
  add: async data => {
    return postFetch('company', data)
  },
  update: async (id, {data, access_token}) => {
    return putFetch(`company/${id}?access_token=${access_token}`, data)
  },
  delete: async id => {
    return deleteFetch(`company/${id}`, {})
  },
  upload: async file => {
    try {
      const rs = await uploadFileCrop(API + 'file-upload', file)
      if (rs && rs.link) {
        return rs.link
      }
      return null
    } catch (error) {
      console.log('upload error', error.message)
      return null
    }
  },
  projectByCompanyId: ({company_id, access_token}) => {
    return getFetch('contact', { params: { filter: { where: { company_id }}, access_token } })
  }
}
