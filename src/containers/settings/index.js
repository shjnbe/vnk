import { createStackNavigator } from 'react-navigation'
import { get } from 'lodash'

import colors from 'themes/colors'
import SettingsList from './list'
import SettingsDetail from './detail'
import SettingListContainer from './setting-list'
import MyProfileContainer from './my-profile'
import TimeStatusContainer from './time-status'
import ServiceSettingContainer from './service-setting'
import KPISetupContainer from './kpi-setup'
import KPIPersonContainer from './kpi-person'
import KPIStatisticsContainer from './kpi-statistics'
import MapContainer from '../map'
import KpiMonthContainer from './kpi-month'
import KpiPersonTodayContainer from './kpi-person-today'
import HelpContainer from './help';

export default createStackNavigator(
  {
    settingsList: {
      screen: SettingsList,
      navigationOptions: ({ navigation }) => ({
        title: navigation.state.params.title
      })
    },
    settingsDetail: {
      screen: SettingsDetail,
      navigationOptions: ({ navigation }) => ({
        title: navigation.state.params.title
      })
    },
    settingsListFunc: {
      screen: SettingListContainer,
      navigationOptions: ({ navigation }) => ({
        title: 'Cài Đặt'
      })
    },
    myProfile: {
      screen: MyProfileContainer,
      navigationOptions: ({ navigation }) => ({
        title: navigation.state.params.title
      })
    },
    timeStatusContainer: {
      screen: TimeStatusContainer,
      navigationOptions: ({ navigation }) => ({
        title: navigation.state.params.title
      })
    },
    serviceContainer: {
      screen: ServiceSettingContainer,
      navigationOptions: ({ navigation }) => ({
        title: navigation.state.params.title
      })
    },
    kpiSetupContainer: {
      screen: KPISetupContainer,
      navigationOptions: ({ navigation }) => ({
        title: navigation.state.params.title
      })
    },
    kpiMonthContainer: {
      screen: KpiMonthContainer,
      navigationOptions: ({ navigation }) => ({
        title: navigation.state.params.title
      })
    },
    kpiPersonContainer: {
      screen: KPIPersonContainer,
      navigationOptions: ({ navigation }) => ({
        title: navigation.state.params.title
      })
    },
    kpiPersonToday: {
      screen: KpiPersonTodayContainer,
      navigationOptions: ({ navigation }) => ({
        title: navigation.state.params.title
      })
    },

    kpiStatisticsContainer: {
      screen: KPIStatisticsContainer,
      navigationOptions: ({ navigation }) => ({
        title: navigation.state.params.title
      })
    },
    mapContainer: {
      screen: MapContainer,
      navigationOptions: ({ navigation }) => ({
        title: get(navigation, 'state.params.title', 'Bản đồ')
      })
    },
    helpContainer: {
      screen: HelpContainer,
      navigationOptions: ({ navigation }) => ({
        title: get(navigation, 'state.params.title', 'Trợ giúp')
      })
    }
  },
  {
    initialRouteName: 'settingsListFunc',
    // headerMode: 'none',
    cardStyle: {
      backgroundColor: colors.white
    },
    navigationOptions: {
      headerBackTitle: null,
      headerTintColor: '#666b65',
      headerTitleStyle: { color: colors.black },
      headerStyle: {
        borderBottomWidth: 0
      }
    }
  }
)
