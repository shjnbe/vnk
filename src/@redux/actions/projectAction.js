import * as _ from 'lodash'
import projectApi from 'api/projectApi'

export const RECEIVED_PROJECT_FETCH_LOADING = 'project/fetch-loading'
export const RECEIVED_PROJECT_FETCH_SUCCESS = 'project/fetch-success'
export const RECEIVED_PROJECT_FETCH_ERROR = 'project/fetch-error'

export const RECEIVED_FOLLOW_PROJECTS = 'project/follow-projects'
export const SELECT_PROJECT = 'project/selected'
export const CLEAN_DATA_CACHE = 'project/clean-cache'

export const getFollowProjects = user => {
  return async dispatch => {
    dispatch({ type: RECEIVED_PROJECT_FETCH_LOADING })
    let filter = {}
    if (user.team_id) {
      filter.where = { team_id: user.team_id }
    } else {
      filter.where = { user_id: user.id }
    }

    filter.order = "id DESC"

    const followProjects = await projectApi.getFollowedProject(filter)
    const idParentProjects = _.map(followProjects, 'parent_project_id')
    dispatch({ type: RECEIVED_FOLLOW_PROJECTS, payload: { followProjects, idParentProjects} })
    dispatch(getProjects(followProjects, idParentProjects, user))
  }
}

export const getProjects = (followProjects, idParentProjects, user) => {
  return async dispatch => {
    // let filter = {}
    // if (user && user.zone_available && user.zone_available !== 'ALL') {
    //   switch (user.zone_available) {
    //     case "HN":
    //       filter.where = { city_code: 18 }
    //       break;
    //     case "HCM":
    //       filter.where = { city_code: 50 }
    //       break
    //     default:
    //       filter.where = { zone: user.zone_available }
    //       break;
    //   }
    // }

    // if (!filter.where) {
    //   filter.where = {}
    // }
    // filter.where.type = user.type_available

    // if (!user.is_admin) {
      // filter.type = 12//user.type_available
    // }

    // console.log('Filter', filter)
    // filter.order = "id DESC"
    let listBySystem = await projectApi.getAvailable(user.id, user.access_token)
    let list = []
    if (_.isArray(listBySystem)) {
      if (_.size(idParentProjects) > 0) {
        list = _.concat(followProjects, _.filter(listBySystem, item => !_.includes(idParentProjects, item.id)))
      } else {
        list = _.clone(listBySystem)
      }
      dispatch({ type: RECEIVED_PROJECT_FETCH_SUCCESS, payload: { list, listBySystem} })
    } else {
      dispatch({ type: RECEIVED_PROJECT_FETCH_ERROR })
    }
  }
}

export const postFollowProject = (data, followProjectsCurrent, listBySystem) => {
  return async dispatch => {
    try {
      const rs = await projectApi.addFollowedProject(data)
      if (rs && _.isArray(followProjectsCurrent) && _.isArray(listBySystem)) {
        const followProjects = _.union([rs], followProjectsCurrent)
        const idParentProjects = _.map(followProjects, 'parent_project_id')
        let list = _.concat(followProjects, _.filter(listBySystem,  item => !_.includes(idParentProjects, item.id)))
        dispatch({ type: RECEIVED_FOLLOW_PROJECTS, payload: { followProjects, idParentProjects, list } })
        dispatch(selectedProject(rs))
        return rs
      } else {
        return null
      }
    } catch (error) {
      console.log('error', error)
      return null
    }
  }
}

export const deleteFollowProject = (followProject, followProjectsCurrent, listBySystem) => {
  return async dispatch => {
    try {
      const rs = await projectApi.deleteFollowedProject(followProject.id)
      if (rs) {
        const followProjects = _.filter(followProjectsCurrent, item => !_.isEqual(item.id, followProject.id))
        const idParentProjects = _.map(followProjects, 'parent_project_id')
        let list = _.concat(followProjects, _.filter(listBySystem, item => !_.includes(idParentProjects, item.id)))
        dispatch({ type: RECEIVED_FOLLOW_PROJECTS, payload: { followProjects, idParentProjects, list } })

        // Nếu delete followproject thì phải update lại project parent mà nó follow.
        const projectSelected =  _.filter(listBySystem, item => item.id === followProject.parent_project_id)
        dispatch(selectedProject(_.get(projectSelected, '[0]', {})))
        return rs
      } else {
        return nulls
      }
    } catch (error) {
      console.log('error: ', error)
      return null
    }
  }
}

export const updateFollowProject = (data, followProjectsCurrent, listBySystem) => {
  return async dispatch => {
    try {
      const rs = await projectApi.updateFollowedProject(data.id, data)
      if (rs) {
      const followProjects = _.map(followProjectsCurrent, (item, index) => {
        return item.id === data.id ? rs : item 
      })
      const idParentProjects = _.map(followProjects, 'parent_project_id')
      let list = _.concat(followProjects, _.filter(listBySystem, item => !_.includes(idParentProjects, item.id)))
      dispatch({ type: RECEIVED_FOLLOW_PROJECTS, payload: { followProjects, idParentProjects, list } })
      dispatch(getProjectById(data.id))
      return rs
      } else {
        return null
      }
    } catch (error) {
      console.log('error: ', error)
      return null
    }
  }
}

export const selectedProject = projectSelected => {
  return dispatch => {
    dispatch({type: SELECT_PROJECT, payload: { projectSelected }})
  }
}

export const getProjectById = id => {
  return async dispatch => {
    try {
      const item = await projectApi.getById(id)
      dispatch(selectedProject(item))
    } catch (error) {
      
    }
  }
}

export const getProjectId = id => {
  return async dispatch => {
    try {
      const item = await projectApi.getByProjectId(id)
      dispatch(selectedProject(item))
    } catch (error) {
      
    }
  }
}



export const postProject = data => {
  return async dispatch => {
    const rs = await projectApi.add(data)
    return rs
  }
}

export const putProject = (id, data) => {
  return async dispatch => {
    const rs = await projectApi.update(id, data)
    return rs
  }
}

export const deleteProject = id => {
  return async dispatch => {
    const rs = await projectApi.delete(id)
    return rs
  }
}

export const cleanDataCacheProject = () => {
  return dispatch => {
    dispatch({ type: CLEAN_DATA_CACHE })
  }
}