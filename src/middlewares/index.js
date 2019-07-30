import thunk from 'redux-thunk'
import logger from 'redux-logger'
import { applyMiddleware } from 'redux'
import app from './appMiddle'
import { createReactNavigationReduxMiddleware } from 'react-navigation-redux-helpers'
import { composeWithDevTools } from 'redux-devtools-extension'

const navigationRedux = createReactNavigationReduxMiddleware(
  'app',
  state => state.nav
)

export default (__DEV__
  ? composeWithDevTools(applyMiddleware(thunk, logger, app, navigationRedux))
  : applyMiddleware(thunk, app, navigationRedux))
