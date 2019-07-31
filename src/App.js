import React from 'react'
import { Provider, connect } from 'react-redux'
import { reduxifyNavigator } from 'react-navigation-redux-helpers'
import { YellowBox, Platform } from 'react-native'
import { StyleProvider, getTheme, Root } from 'native-base'
import configureStore from './@redux'
import vnkTheme from './themes/native-base-theme'
import codePush from 'react-native-code-push'
import FCM, { NotificationActionType, FCMEvent } from "react-native-fcm";
import { registerKilledListener, registerAppListener } from './utils/fcm-listeners'
import KEY from './constants/cache-key'
import CACHE from './utils/cache'
import 'moment/locale/vi'

import MyApp from './vnk-navigation'
registerKilledListener()
const AppRedux = reduxifyNavigator(MyApp, 'app')
const mapStateToProps = state => ({
  state: state.nav
})

const AppWithNavigationState = connect(mapStateToProps)(AppRedux)

class App extends React.Component {
  constructor(props) {
    super(props)
    YellowBox.ignoreWarnings([
      'Warning: isMounted(...) is deprecated',
      'Module RCTImageLoader'
    ])
  }

  async componentDidMount() {
    registerAppListener(this.props.navigation);
    try {
      let result = await FCM.requestPermissions({
        badge: true,
        sound: true,
        alert: true
      });
    } catch (e) {
      console.error(e);
    }

    FCM.getFCMToken().then(fcmToken => {
      console.log("TOKEN (getFCMToken)", fcmToken);
      if (fcmToken) {
        CACHE.setCache(KEY.FCM_TOKEN, { fcmToken })
        this.setState({ token: fcmToken || "" });
      }
    });

    if (Platform.OS === "ios") {
      FCM.getAPNSToken().then(token => {
        console.log("APNS TOKEN (getFCMToken)", token);
      });
    }
  }

  render() {
    return (
      <Provider store={configureStore}>
        <StyleProvider style={getTheme(vnkTheme)}>
          <Root>
            <AppWithNavigationState />
          </Root>
        </StyleProvider>
      </Provider>
    )
  }
}

export default codePush({
  updateDialog: true, installMode: codePush.InstallMode.IMMEDIATE
})(App)