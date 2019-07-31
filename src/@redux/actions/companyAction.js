import { get } from 'lodash'
import companyApi from '../../api/companyApi'

export const FETCH_ALL_COMPANY = 'company/fetch-all'
export const FETCH_USER_COMPANY = 'company/fetch-company-follow-by-user'
export const FOLLOW_COMPANY = 'company/follow'
export const UN_FOLLOW_COMPANY = 'company/un-follow'
export const SELECTED_COMPANY = 'company/selected'

export const fetchUserFollowCompany = (user) => {
  return async dispatch => {
    if (user && user.id) {
      const companyFollow = await companyApi.getFollowCompany(user)
      dispatch({type: FETCH_USER_COMPANY, payload: companyFollow})
    }
  }
}

export const getCompanies = (user) => {
  return async dispatch => {
    let payload = []
    const filter = {
      include: {
        relation: 'users',
        scope: { 
          where: { email: user.email },
          fields: ['email', 'full_name', 'id']
        }
      }
    }
    if (user && user.packageOrder) {
      if (user.packageOrder === 'basic') {
        filter.where = { created_by: user.id }
        payload = await companyApi.getAll(filter)
      } else  {
        filter.where = { or: [{created_by: user.id}, { created_by: 0 }] }
        payload = await companyApi.getAll(filter)
      } 
    }
    
    // if (user && user.id) {
    //   dispatch(fetchUserFollowCompany(user))
    // }
    dispatch({type: FETCH_ALL_COMPANY, payload})
    return payload
  }
}

export const followCompany = (company, user) => {
  return async dispatch => {
    try {
      const data = await companyApi.followCompany(user.id, company.id, user.access_token)
      if (!get(data, 'error.message')) {
        //dispatch({ type: FOLLOW_COMPANY, payload: company})
        dispatch(getCompanies(user))
        return true
      }
      return false
    } catch (error) {
      return false
    }
  }
}

export const unFollowCompany = (companyId, user) => {
  return async dispatch => {
    try {
      const data = await companyApi.unFollowCompany(user.id, companyId, user.access_token)
      if (!get(data, 'error.message')) {
        //dispatch({ type: UN_FOLLOW_COMPANY, payload: companyId})
        dispatch(getCompanies(user))
        return true
      }
      return false
    } catch (error) {
      return false
    }
  }
}

export const onCompanySelected = company => ({type: SELECTED_COMPANY, payload: company})

export const onCompanyUpdate = (company, user) => {
  return async dispatch => {
    try {
      const rs = await companyApi.update(company.id, {data: company, ...user})
      dispatch(onCompanySelected(rs))
      return true
    } catch (error) {
      return false      
    }
  }
}

export const onChangeImage = (dataImage, company, user) => {
  return async dispatch => {
    try {
      const image = await companyApi.upload(dataImage)
      if (image) {
        company.image = image
        const rs = await dispatch(onCompanyUpdate(company, user))
        return !!rs
      }
    } catch (error) {
      return false
    }
  }
}