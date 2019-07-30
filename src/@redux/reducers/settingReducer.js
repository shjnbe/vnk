import update from 'react-addons-update'
import { CONFIG_KPI_TODAY, CONFIG_KPI_MONTH } from '../actions/settingAction'

const stateDefault = {
  kpiConfig: {
    salary: 300000,
    daily_score: 15,
    date_count: 24,
    bonus: 10
  },
  kpiConfigToday: {
    call: {
      point: 1,
      total: 10
    },
    meet: {
      point: 3,
      total: 2
    },
    offers: {
      point: 5,
      total: 0
    },
    closeOrder: {
      point: 15,
      total: 1
    }
  }
}

export default (state = stateDefault, action) => {
  const { type } = action
  switch (type) {
    case CONFIG_KPI_TODAY:
      return setConfigKpiToday(state, action)
    case CONFIG_KPI_MONTH:
      return setConfigKpiMonth(state, action)
    default:
      return { ...state }
  }
}

function setConfigKpiToday (state, action) {
  return update(state, { kpiConfigToday: { $set: action.payload } })
}

function setConfigKpiMonth (state, action) {
  return update(state, { kpiConfig: { $set: action.payload } })
}
