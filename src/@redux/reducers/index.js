import { createNavigationReducer } from 'react-navigation-redux-helpers'

import SwitchApp from '../../vnk-navigation'
import auth from './authReducer'
import settings from './settingReducer'
import project from './projectReducer'
import company from './companyReducer'
import notify from './notifyReducer'

const nav = createNavigationReducer(SwitchApp)

export default {
  nav,
  auth,
  settings,
  project,
  company,
  notify,
}
