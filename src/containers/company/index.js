import React from "react"
import { createStackNavigator } from "react-navigation"
import { Icon } from "native-base"
import { get, size } from "lodash"
import colors from "../../themes/colors"
import CompanyList from "./list"
import CompanyDetail from "./detail"
import AddCompanyContainer from "./add-company"
import EditCompanyContainer from "./edit-company"
import ContactContainer from './contact-new'
import { companySelected } from '@redux/actions/companyAction'

export default createStackNavigator(
  {
    contactNav: {
      screen: ContactContainer,
      navigationOptions: ({ navigation }) => {
        const disabled = navigation.getParam("disabled")
        const header = {
          title: get(navigation, "state.params.title", "Thông tin liên hệ")
        }

        const company = navigation.getParam('company')
        const user = navigation.getParam('user')
        if (get(user, 'id', '-') === get(company, 'created_by')) {
          // if (size(get(company, 'users', [])) > 0) {
          header.headerRight = (
            <Icon
              onPress={() => {
                const func = navigation.getParam("onClick")
                if (func) func()
              }}
              name={disabled ? 'edit' : 'save'}
              type='Feather'
              style={{ color: colors.toxicGreen, marginRight: 8 }}
            />
          )
        }
        
        return header
      }
    },
    companyList: {
      screen: CompanyList,
      navigationOptions: ({ navigation }) => {
        const isIcon = navigation.getParam("isIcon")
        const header = {
          title: get(navigation, "state.params.title", "Công ty")
        }
        if (isIcon) {
          header.headerRight = (
            <Icon
              name="add-circle"
              onPress={() => navigation.navigate("addCompany")}
              style={{ color: colors.darkSkyBlue, paddingRight: 12 }}
            />
          )
        }
        return header
          
      }
    },
    companyDetail: {
      screen: CompanyDetail,
      navigationOptions: ({ navigation }) => {
        const params = {
          title: get(navigation, "state.params.title", "Thông tin công ty")
        }
        const company = navigation.getParam("company") || {}
        const user = navigation.getParam("user") || {}
        if (company.created_by === user.id)
          params.headerRight = (
            <Icon
              name="edit-3"
              type="Feather"
              onPress={() => {
                  navigation.navigate("editCompany", {company, user})
                }
              }
              style={{ color: colors.darkSkyBlue, paddingRight: 12 }}
            />
          )
        return params
      }
    },
    editCompany: {
      screen: EditCompanyContainer,
      navigationOptions: ({ navigation }) => {
        return {
          title: get(navigation, "state.params.title", "Cập nhật công ty"),
          headerRight: (
            <Icon
              onPress={() => {
                const func = navigation.getParam("saveCompanyInfo")
                if (func) func()
              }}
              name="checkmark-circle"
              style={{ color: colors.toxicGreen, marginRight: 8 }}
            />
          )
        }
      }
    },
    addCompany: {
      screen: AddCompanyContainer,
      navigationOptions: ({ navigation }) => {
        return {
          title: get(navigation, "state.params.title", "Thêm công ty"),
          headerRight: (
            <Icon
              onPress={() => {
                const func = navigation.getParam("saveCompanyInfo")
                if (func) func()
              }}
              name="checkmark-circle"
              style={{ color: colors.toxicGreen, marginRight: 8 }}
            />
          )
        }
      }
    }
  },
  {
    initialRouteName: 'companyList',
    cardStyle: {
      backgroundColor: colors.white
    },
    navigationOptions: {
      headerBackTitle: null,
      headerTintColor: "#666b65",
      headerTitleStyle: { color: colors.black },
      headerStyle: {
        backgroundColor: "#ffffff",
        shadowColor: "rgba(0, 0, 0, 0.15)",
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
