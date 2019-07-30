import React from 'react'
import { Icon } from 'native-base'
import { createStackNavigator } from 'react-navigation'
import { get } from 'lodash'
import colors from 'themes/colors'
import HomeNoDataContainer from './home-no-data'
import TaskComponent from './task-component'
import HomeListContainer from './home-list'
import ServiceSettingContainer from 'containers/settings/service-setting'
import PickerMonth from './task-component/picker-month'

const navigationOptionHome = ({ navigation }) => {
  return {
    headerRight: (
      <Icon
        name='add-circle'
        onPress={() => navigation.navigate('taskComponent')}
        style={{ color: colors.darkSkyBlue, paddingRight: 12 }}
      />
    ),
    // headerLeft: (
    //   <Icon
    //     name='search'
    //     onPress={() => {}}
    //     style={{ color: colors.rouge, paddingLeft: 12 }}
    //   />
    // ),
    title: get(navigation, 'state.params.title', 'Trang chủ')
  }
}

export default createStackNavigator(
  {
    homeNoData: {
      screen: HomeNoDataContainer,
      navigationOptions: navigationOptionHome
    },
    taskComponent: {
      screen: TaskComponent,
      navigationOptions: ({ navigation }) => {
        return {
          headerTitle: (
            <PickerMonth
              value={navigation.getParam('today') || new Date()}
              onValueChange={navigation.getParam('onValueChange')}
            />
          ),
          // headerRight: (
          //   <Icon
          //     name={navigation.getParam('isEdit') ? 'save' : 'edit'}
          //     type='Feather'
          //     style={{ color: colors.appleGreen, paddingRight: 8 }}
          //     onPress={navigation.getParam('onEdit')}
          //   />
          // )
        }
      }
    },
    homeListContainer: {
      screen: props => <HomeListContainer {...props}/>,
      navigationOptions: navigationOptionHome
    },
    servicePackageContainer: {
      screen: props => <ServiceSettingContainer {...props}/>,
      navigationOptions: ({ navigation }) => ({
        title: get(navigation, 'state.params.title', 'Gói dịch vụ')
      })
    }
  },
  {
    initialRouteName: 'homeListContainer',
    cardStyle: {
      backgroundColor: colors.white
    },
    navigationOptions: {
      headerBackTitle: null,
      headerTintColor: '#666b65',
      headerTitleStyle: { color: colors.black },
      headerStyle: {
        backgroundColor: '#ffffff',
        shadowColor: 'rgba(0, 0, 0, 0.15)',
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowRadius: 6,
        shadowOpacity: 1
      }
    }
  }
)
