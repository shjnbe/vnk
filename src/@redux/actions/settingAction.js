export const CONFIG_KPI_TODAY = 'settings/kpi-config-today'
export const CONFIG_KPI_MONTH = 'settings/kpi-config-month'

export const configKpiToday = data => {
  return dispatch => {
    dispatch({ type: CONFIG_KPI_TODAY, payload: data })
  }
}
export const configKpiMonth = data => {
  return dispatch => {
    dispatch({ type: CONFIG_KPI_MONTH, payload: data })
  }
}
