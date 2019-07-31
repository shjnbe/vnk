import React from 'react'
import { Dimensions } from 'react-native'
import { SafeAreaView } from 'react-navigation';
import colors from '../../../themes/colors'
import * as _ from 'lodash'
import styled from 'styled-components/native'
import {
  View,
  Icon,
  Content,
  Container,
  Toast
} from 'native-base'
import TabItem from '../pro-details/tab-item'
import ProOverview from '../pro-details/overview'
import BackButton from 'components/elements/back-button'
import NoteContainer from '../pro-details/note'
import moment from 'moment'
import connectAutoDispatch from '../../../@redux/connect';
import { postFollowProject } from '../../../@redux/actions/projectAction'
import dataTask from '../data-task'
import CircleButton from '../../../components/elements/circle-button'
import AddContainer from './add-container';

const ArTimeView = styled.View`
  marginBottom: 8
  marginLeft: 8
  flexDirection: row
  justifyContent: flex-end
`

const ArLocation = styled.Text`
  opacity: 0.95
  marginRight: 8
  fontSize: 12
  fontWeight: bold
  fontStyle: normal
  letterSpacing: 0
  color: ${colors.black}
`

const ArTime = styled.Text`
  opacity: 0.8
  marginRight: 8
  marginLeft: 4
  fontSize: 12
  letterSpacing: 0
  color: ${props => props.color || colors.black}
`

const TabContainer = styled.View`
  flexDirection: row
  justifyContent: center
`

class AddProjectContainer extends React.Component {
  constructor (props) {
    super(props)
    this.width = Dimensions.get('window').width
    this.tabData = this.getTabData()
    this.state = {
      indexSeleted: 0,
      stautsTask: _.get(dataTask, `[1]`, {}),
      project: {}
    }
  }

  getTabData = () => {
    return [
      {
        key: 'general',
        title: 'Tổng quan',
        icon: require('../../../images/projects/ic_general.png'),
        isTab: true
      },
      {
        key: 'contact',
        title: 'Người liên hệ',
        icon: require('../../../images/projects/ic_contact.png'),
        navigateKey: 'memberList'
      },
      {
        key: 'note',
        title: 'Ghi chú',
        icon: require('../../../images/projects/ic_note.png'),
        isTab: true
      },
      {
        key: 'follow',
        title: 'Theo dõi',
        icon: require('../../../images/company/follow.png'),
        navigateKey: 'modal_check'
      },
      {
        key: 'addStack',
        title: 'Giao việc',
        icon: require('../../../images/projects/ic_add_stack.png'),
        navigateKey: 'taskAssign'
      }
    ]
  }

  onTabSelected = indexSeleted => {
    this.setState({ indexSeleted })
  }

  handleNavigate = (navigateKey, project = {}) => {
    if (navigateKey !== 'modal_check') {
      this.props.navigation.navigate(navigateKey, project)      
    }
  }

  goBack = () => {
    this.props.navigation.goBack()
  }
  
  render () {
    return (
      <Container>
        <SafeAreaView 
          style={{
            flexDirection: 'row',
            padding: 8
        }}>
            <BackButton  style={{
              alignSelf: 'center'
            }}/>
            <View  style={{flex: 1, flexDirection: 'column', alignItems: 'flex-end'}}>
              <ArTimeView>
                <Icon
                  name='calendar'
                  type='Feather'
                  style={{ opacity: 0.8, color: colors.black, fontSize: 12 }}
                />
                <ArTime>{moment().format('DD/MM/YYYY')}</ArTime>
              </ArTimeView>
              <ArTimeView>
                <Icon
                  name='map-pin'
                  type='Feather'
                  style={{
                    opacity: 0.95,
                    color: colors.black,
                    marginRight: 4,
                    fontSize: 12
                  }}
                />
                <ArLocation>Việt Nam</ArLocation>
              </ArTimeView>
            </View>
            <CircleButton
              color={this.state.stautsTask.colorText}
              size={80}
              title={this.state.stautsTask.name}
              bgColor={this.state.stautsTask.color}/>
        </SafeAreaView>
        <TabContainer>
          {_.map(this.tabData, (item, index) => (
            <TabItem
              key={item.key}
              focus={_.isEqual(this.state.indexSeleted, index)}
              index={index}
              onTabSelected={this.onTabSelected}
              handleNavigate={this.handleNavigate}
              item={item}
              width={this.width / _.size(this.tabData)}
            />
          ))}
        </TabContainer>
        <Content style={{ margin: 12 }}>
          {this.state.indexSeleted === 0 && (
            <AddContainer 
              goBack={this.goBack}
              stautsTask={this.state.stautsTask}/>
          )}
          {this.state.indexSeleted === 2 && <NoteContainer />}
        </Content>
      </Container>
    )
  }
}

export default connectAutoDispatch(
  state => (
    { 
      listBySystem: state.project.listBySystem,
      followProjects: state.project.followProjects,
      idParentProjects: state.project.idParentProjects,
      user: state.auth.user
    }),
  {
    postFollowProject
  }
)( AddProjectContainer )