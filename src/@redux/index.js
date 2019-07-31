import { createStore, combineReducers } from 'redux'
import middlewares from '../middlewares'

import rootReducer from './reducers'

export default createStore(combineReducers(rootReducer), {}, middlewares)