import { NavigationActions } from 'react-navigation'

export const onNavigate = (routeName, params = {}) => {
  return NavigationActions.navigate({ routeName, params })
}
