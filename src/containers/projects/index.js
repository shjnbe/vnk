import { createStackNavigator } from 'react-navigation'

import ProListComponent from './pro-list'
import colors from '../../themes/colors'
import ProDetails from './pro-details'
import ManagementProcessContainer from './pro-management-process'
import MemberListContainer from './pro-details/member-list'
import AddProjectContainer from './add-project'
import DetailsMember from './pro-details/member-list/details-member'

export default createStackNavigator(
  {
    proHome: {
      screen: ProListComponent,
      navigationOptions: ({ navigation }) => ({
        header: null
      })
    },
    proDetails: {
      screen: ProDetails,
      navigationOptions: ({ navigation }) => ({
       header: null
      })
    },
    proManagement: {
      screen: ManagementProcessContainer,
      navigationOptions: ({ navigation }) => ({
        header: null
      })
    },
    memberList: {
      screen: MemberListContainer,
      navigationOptions: ({ navigation }) => ({
        title: 'Liên hệ'
      })
    },
    addProject: {
      screen: AddProjectContainer,
      navigationOptions: ({ navigation }) => ({
        header: null
      })
    },
    detailsMember: {
      screen: DetailsMember,
      navigationOptions: ({ navigation }) => ({
        title: 'Chi tiết liên hệ'
      })
    }
  },
  {
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
