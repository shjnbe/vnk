import { getFetch, postFetch, putFetch, deleteFetch, uploadFileCrop, API } from '../utils/fetch'

export default {
  
  getAll: filter => {
    return getFetch('project', { params: { filter } })
  },
  getAvailable: (id, access_token) => {
    return getFetch(`user/get-available-projects/${id}?access_token=${access_token}`)
  },
  getById: id => {
    return getFetch(`FollowedProjects/${id}`)
  },
  getByProjectId: id => {
    return getFetch(`project/${id}`)
  },
  add: async data => {
    return postFetch('project', data)
  },
  update: async (id, data) => {
    return putFetch(`project/${id}`, data)
  },
  delete: async id => {
    return deleteFetch(`project/${id}`, {})
  },
  getFollowedProject: filter => {
    return getFetch('FollowedProjects', { params: { filter } })
  },
  addFollowedProject: async data => {
    return postFetch('FollowedProjects', data)
  },
  updateFollowedProject: async (id, data) => {
    return putFetch(`FollowedProjects/${id}`, data)
  },
  deleteFollowedProject: async id => {
    return deleteFetch(`FollowedProjects/${id}`, {})
  },
  upload: async file => {
    try {
      const rs = await uploadFileCrop(API+ 'file-upload', file)
      console.log('upload: ', rs)
    if (rs && rs.link) {
      return rs.link
    }
    return null
    } catch (error) {
      console.log('upload error', error.message)
      return null
    }
  },
  statisticCost: teamId => {
    return getFetch(`FollowedProjects/cost-stat/${teamId}`)
  },
  statisticCount: teamId => {
    return getFetch(`FollowedProjects/count-stat/${teamId}`)
  },
}
