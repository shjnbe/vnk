import React from 'react'
import {
  createStackNavigator,
  createBottomTabNavigator
} from 'react-navigation'

import styled from 'styled-components/native'

import LoginContainer from '../containers/auth/login'
import RegisterContainer from '../containers/auth/register'

import HomeContainer from '../containers/home'
import CompanyContainer from '../containers/company'
import ProjectContainer from '../containers/projects'
import NotificationsContainer from '../containers/notifications'
import SettingsContainer from '../containers/settings'
import colors from '../themes/colors'
import TaskAssignComponent from '../containers/projects/task-assign';
import NotifyDetailContainer from '../containers/notifications/notify-detail';
import TaskConfirmComponent from '../containers/notifications/task-confirm'
import SalaryConfirmComponent from '../containers/salary-confirmation'
import SalaryConfirmDetail from '../containers/salary-confirmation/kpi-month'
import BadgeIcon from './badge-icon'

const Label = styled.Text.attrs({ numberOfLines: 1 })`
  fontFamily: Helvetica
  fontSize: 10
  fontWeight: 900
  fontStyle: normal
  letterSpacing: 1.5
  textAlign: center
  color: ${props => props.color || '#000'}
`

const TabIcon = styled.Image.attrs({
  resizeMode: 'contain'
})`
  width: ${props => props.size || 20}
  height: ${props => props.size || 20}
`

const tabHelper = (navigation, title, icon, iconActive) => {
  return {
    tabBarIcon: ({ focused }) => <TabIcon source={focused ? iconActive : icon} />,
    tabBarLabel: ({ tintColor }) => (
      <Label color={tintColor}>{title}</Label>
    )
  }
}

const tabNotifyHelper = () => {
  return {
    tabBarIcon: async ({ focused, tintColor }) => (<BadgeIcon focused={focused} />),
    tabBarLabel: ({ focused, tintColor }) => (
      <Label color={tintColor}>Thông báo</Label>
    )
  }
}

export const AuthStack = createStackNavigator(
  {
    login: {
      screen: LoginContainer,
      navigationOptions: () => ({
        title: 'Login'
      })
    },
    register: {
      screen: RegisterContainer,
      navigationOptions: () => ({
        title: 'Registers'
      })
    }
  },
  {
    initialRouteName: 'login',
    headerMode: 'none',
    cardStyle: {
      backgroundColor: 'white'
    }
  }
)

export const AppTab = createBottomTabNavigator(
  {
    home: {
      screen: HomeContainer,
      navigationOptions: ({ navigation }) =>
        tabHelper(
          navigation,
          'Trang chủ',
          require('../images/tabs/tab-home.png'),
          require('../images/tabs/tab-home-active.png')
        )
    },
    company: {
      screen: CompanyContainer,
      navigationOptions: ({ navigation }) =>
        tabHelper(
          navigation,
          'Công ty',
          require('../images/tabs/tab-person.png'),
          require('../images/tabs/tab-person-active.png')
        )
    },
    project: {
      screen: ProjectContainer,
      navigationOptions: ({ navigation }) =>
        tabHelper(
          navigation,
          'Dự án',
          require('../images/tabs/tab-project.png'),
          require('../images/tabs/tab-project-active.png')
        )
    },
    notifications: {
      screen: NotificationsContainer,
      navigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused, tintColor }) => (<BadgeIcon focused={focused} badgeCount={3} />),
        tabBarLabel: ({ focused, tintColor }) => <Label color={tintColor}>Thông báo</Label>
      })
    },
    settings: {
      screen: SettingsContainer,
      navigationOptions: ({ navigation }) =>
        tabHelper(
          navigation,
          'Cài đặt',
          require('../images/tabs/tab-settings.png'),
          require('../images/tabs/tab-settings-active.png')
        )
    }
  },
  {
    initialRouteName: 'home',
    // navigationOptions: ({ navigation }) => {
    //   const name = get(navigation, 'state.routeName')
    //   return {
    //     tabBarIcon: ({ focused, tintColor }) => (
    //       <Icon
    //         name={tabs[name].icon}
    //         style={{
    //           color: tintColor,
    //           opacity: focused ? 1 : 0.7,
    //           fontSize: 22
    //         }}
    //       />
    //     ),
    //     tabBarLabel: ({ focused, tintColor }) => (
    //       <Label color={tintColor}>{tabs[name].title}</Label>
    //     )
    //   }
    // },
    tabBarOptions: {
      activeTintColor: colors.rouge,
      inactiveTintColor: '#726d6d',
      labelStyle: {
        fontSize: 10
      },
      style: {
        backgroundColor: colors.white
        // shadowColor: "rgba(0, 0, 0, 0.3)",
        // shadowOffset: {
        //   width: 0,
        //   height: -1
        // },
        // shadowRadius: 0,
        // shadowOpacity: 1
      }
    }
  }
)

export const MypStack = createStackNavigator({
  mypApp: {
    screen: AppTab,
  },
  taskAssign: {
    screen: TaskAssignComponent,
    navigationOptions: () => ({

    })
  },
  taskConfirm: {
    screen: TaskConfirmComponent,
  },
  notifyDetail: {
    screen: NotifyDetailContainer
  },
  salaryConfirm: {
    screen: SalaryConfirmComponent
  },
  kpiDetail: { screen: SalaryConfirmDetail }
}, {
    initialRouteName: 'mypApp',
    headerMode: 'none',
    cardStyle: {
      backgroundColor: colors.white
    }
  })
