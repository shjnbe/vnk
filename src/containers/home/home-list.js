import React from 'react'
import { Dimensions, BackHandler } from 'react-native'
import { get, isEqual } from 'lodash'

import { Container, Content, Icon, Item, Input, Label, View } from 'native-base'

import HeaderView from './header'
import ProjectFollow from './project-follow'
import CompanyFollow from './company-follow'
import connectAutoDispatch from '../../@redux/connect';
import { getCompanies } from '../../@redux/actions/companyAction'
import { getFollowProjects, selectedProject } from '@redux/actions/projectAction'
import HomeNoData from './home-no-data'

class HomeContainer extends React.Component {
  state = {
    size: (Dimensions.get('window').width - 16) / 3,
    textSearch: ''
  }

  onLayout = () => {
    this.setState({ size: (Dimensions.get('window').width - 48) / 3 })
  }

  handleCompanySelected = (navKey, company) => {
    this.props.navigation.navigate(navKey, { company })
  }

  handleProject = (navKey, project) => {
    if (project) {
      this.props.selectedProject(project)
    }

    this.props.navigation.navigate(navKey)
  }

  componentDidMount () {
    if (this.props.user.packageOrder) {
      this.props.getFollowProjects(get(this.props, 'user', {}))
    }
    
    this.props.getCompanies(this.props.user)
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress)
  }

  componentWillUnmount () {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress)
  }

  onBackPress = () => {
    const current = get(this.props.nav, 'routes[1].routes[0]', {})
    const indexHome = get(current, 'routes[0].index')
    if (current.index === 0 && indexHome === 0) {
      return false
    } else {
      this.props.navigation.goBack(null)
    }
    
    return true
  }

  onChangeText = textSearch => {
    this.setState({ textSearch })
  }

  render () {
    let hasData = get(this.props, 'user.packageOrder', false)
    if (isEqual(hasData, 'basic')) {
      hasData = false
    }
    
    return (
      <Container onLayout={this.onLayout}>
        {
          !hasData ? <HomeNoData navigation={this.props.navigation}/> : <View />
        }
        { hasData ?
          <Content style={{ paddingTop: 12 }}>
          <Label
            style={{
              marginLeft: 16,
              fontFamily: 'Helvetica',
              fontSize: 14,
              fontWeight: 'bold',
              fontStyle: 'normal',
              color: '#333333',
              marginBottom: 6
            }}
          >
            TÌM KIẾM
          </Label>
          <Item
            regular
            style={{ borderRadius: 4, marginLeft: 16, marginRight: 16 }}
          >
            <Input
              style={{fontFamily: 'Helvetica'}}
              paddingLeft={8}
              onChangeText={this.onChangeText}
              placeholder='Gõ dự án hoặc công ty cần tìm'
            />
            <Icon active name='search' />
          </Item>
          <HeaderView title='DỰ ÁN ĐANG THEO' />
          <ProjectFollow textSearch={this.state.textSearch} onNavigateProject={this.handleProject} style={{ height: this.state.size * 2 }} />
          <View style={{ height: 1, backgroundColor: '#cdcdcd' }} />
          <HeaderView title='CÔNG TY ĐANG THEO' />
          <CompanyFollow textSearch={this.state.textSearch} onNavigateCompany={this.handleCompanySelected} style={{ height: this.state.size * 2 }} />
        </Content> : <View />}
      </Container>
    )
  }
}

export default connectAutoDispatch(state => ({
  user: get(state, 'auth.user', {}),
  nav: state.nav
}), {
  getCompanies,
  getFollowProjects,
  selectedProject
})(HomeContainer)