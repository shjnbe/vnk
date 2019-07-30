import { createSwitchNavigator } from 'react-navigation'
import { AuthStack, MypStack } from './config-router'
import { ChangePassSuccess } from 'containers/settings/change-password'
import LoadingAuth from 'containers/auth/loading-auth'
import AccessDenied from 'containers/auth/access-denied'

const MyApp = createSwitchNavigator(
  {
    Auth: AuthStack,
    app: MypStack,
    changePassword: ChangePassSuccess,
    LoadingAuth,
    AccessDenied
  },
  {
    initialRouteName: 'LoadingAuth'
  }
)

export default MyApp
