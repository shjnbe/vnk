import update from 'react-addons-update'
import { 
  RECEIVED_PROJECT_FETCH_LOADING,
  RECEIVED_PROJECT_FETCH_SUCCESS,
  RECEIVED_PROJECT_FETCH_ERROR,
  RECEIVED_FOLLOW_PROJECTS,
  SELECT_PROJECT,
  CLEAN_DATA_CACHE
} from '../../@redux/actions/projectAction'


const stateDefault = {
  list: [],
  listBySystem: [],
  followProjects: [],
  idParentProjects: [], // Chứa id các project parent.
  projectSelected: {},
  isLoading: true
}

export default (state = stateDefault, action) => {
  const { type } = action
  switch (type) {
    case RECEIVED_PROJECT_FETCH_LOADING:
      return receivedProjectsFetchLoading(state)
    case RECEIVED_PROJECT_FETCH_SUCCESS:
      return receivedProjectsFetchSuccess(state, action)
    case RECEIVED_PROJECT_FETCH_ERROR:
      return receivedProjectsFetchError(state)
    case RECEIVED_FOLLOW_PROJECTS: 
      return receivedFollowProjects(state, action)
    case SELECT_PROJECT: 
      return receivedSelectProject(state, action)
    case CLEAN_DATA_CACHE: 
      return receivedCleanDataCache(state)
    default:
      return { ...state }
  }
}

function receivedProjectsFetchLoading (state) {
  return update(state,  { isLoading: { $set: true } })
}

function receivedProjectsFetchSuccess (state, action) {
  return update(state, {
    $apply: oldData => {
      return {
        ...oldData,
        isLoading: false,
        list: action.payload.list,
        listBySystem: action.payload.listBySystem
      }
    }
  })
}

function receivedProjectsFetchError (state) {
  return update(state,  { isLoading: { $set: false } })
}

function receivedFollowProjects (state, action) {
  return update(state, {
    $apply: oldData => {
      return {
        ...oldData,
        followProjects: action.payload.followProjects,
        idParentProjects: action.payload.idParentProjects,
        list:  action.payload.list
      }
    }
  })
}

function receivedSelectProject (state, action) {
  return update(state, {
    $apply: oldData => {
      return {
        ...oldData,
        projectSelected: action.payload.projectSelected
      }
    }
  })
}

function receivedCleanDataCache (state) {
  return update(state, {
    $apply: () => {
      return {
        list: [],
        listBySystem: [],
        followProjects: [],
        idParentProjects: [],
        projectSelected: {},
        isLoading: false
      }
    }
  })
}
