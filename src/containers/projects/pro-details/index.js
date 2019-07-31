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
import TabItem from './tab-item'
import ProOverview from './overview'
import BackButton from '../../../components/elements/back-button'
import NoteContainer from './note'
import moment from 'moment'
import ModalDialog from '../../../components/elements/modal-dialog'
import connectAutoDispatch from '../../../@redux/connect';
import { postFollowProject, deleteFollowProject } from '../../../@redux/actions/projectAction'
import dataTask from '../data-task'
import CircleButton from '../../../components/elements/circle-button'

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
const Title = styled.Text`
  fontFamily: Helvetica
  fontSize: ${props => props.size || 14}
  letterSpacing: 0
  textAlign: right
  fontWeight: normal
  marginRight: 8
  color: ${props => props.color || '#006dff'}
`

const TabContainer = styled.View`
  flexDirection: row
  justifyContent: center
`

const Touchable = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8
})``

class ProDetails extends React.Component {
  constructor (props) {
    super(props)
    this.width = Dimensions.get('window').width
    this.state = {
      indexSeleted: 0,
      isFollow: _.get(this.props.projectSelected, 'is_follow', false),//_.has(this.props.projectSelected, 'parent_project_id'),// this.props.projectSelected.parent_project_id ?  true : false,
      stautsTask: _.get(dataTask, `[${this.props.projectSelected.status_code}]`, {})
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      const stautsTask = _.get(dataTask, `[${nextProps.projectSelected.status_code}]`, {})
      this.setState({
        stautsTask,
        isFollow: _.get(nextProps.projectSelected, 'is_follow', false)
      })
    }
  }

  getTabData = isFollow => {
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
        icon: isFollow ? require('../../../images/company/follow.png') : require('../../../images/company/unfollow.png'),
        navigateKey: 'modal_check'
      },
      {
        key: 'addStack',
        title: 'Giao việc',
        icon: _.get(this.props.user, 'packageOrder') === 'enterprise' ? require('../../../images/projects/ic_add_stack.png') : require('../../../images/projects/ic_add_task_disable.png'),
        navigateKey: 'taskAssign'
      }
    ]
  }

  onTabSelected = indexSeleted => {
    this.setState({ indexSeleted })
  }

  handleNavigate = (navigateKey, project = {}) => {
    if (navigateKey === 'modal_check') {
      this.handleChangeFollow()
    } else if (navigateKey === 'taskAssign') {
      if (_.get(this.props.user, 'packageOrder') === 'enterprise') {
        this.props.navigation.navigate(navigateKey, {project: _.get(this.props, 'projectSelected', {})})
      } else {
        Toast.show({
          type: 'warning',
          text: `Xin vui lòng nâng cấp dịch vụ để được thực hiện tính năng này.`,
          position: 'top',
          duration: 1000
        })
      }
    } else {
      this.props.navigation.navigate(navigateKey, project)
    }
  }

  handleChangeFollow = async () => {
    if ( !this.state.isFollow ) {
      let data =  _.omit(_.clone(this.props.projectSelected), ['idParentProjects', 'id'])
      data.user_id = _.get(this.props, 'user.id')
      data.team_id = _.get(this.props, 'user.team_id')
      data.parent_project_id = this.props.projectSelected.id
      data.last_modified = moment().format()
      data.status = 'Sàng lọc'
      data.status_code = 1  
  
      const result = await this.props.postFollowProject( data, this.props.followProjects,  this.props.listBySystem)
      this.toastNotification(result, `Theo dõi dự án thành công.`)
      if (result) {
        this.setState({
          isFollow: true,
          stautsTask: _.get(dataTask, `[${result.status_code}]`, {})
        })
      }
    } else {
        this.props.projectSelected.titleModal = `Bạn muốn huỷ theo dõi dự án này chứ?` 
        this.refs.modal.open(this.props.projectSelected)
    }
  }


  comfirmDeleteFollowProjects = async followProject => {
    const result = await this.props.deleteFollowProject(followProject, this.props.followProjects,  this.props.listBySystem)
    this.toastNotification(result, `Huỷ theo dõi dự án thành công.`)
    
    if (result) {
      this.setState({
        isFollow: false
      })
    }
  }
  
  toastNotification = (result, titleSuccess) => {
    if (result) {
      Toast.show({
        type: 'success',
        text: titleSuccess,
        position: 'top',
        duration: 1000
      })
    } else {
      Toast.show({
        type: 'warning',
        text: `Đã xảy ra lỗi vui lòng thử lại.`,
        position: 'top',
        duration: 1000
      })
    }
  }
  

  render () {
    const tabData = this.getTabData(this.state.isFollow)
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
                <ArTime>
                  {this.props.projectSelected.last_modified &&
                    moment(this.props.projectSelected.last_modified).format('DD/MM/YYYY')}
                </ArTime>
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
                <ArLocation>{this.props.projectSelected.district}</ArLocation>
              </ArTimeView>
              {
                this.state.isFollow &&
                <Touchable onPress={() => this.handleNavigate('proManagement', this.props.projectSelected)}>
                  <Title size={16}>{'CHUYỂN TRẠNG THÁI'}</Title>
                </Touchable>
              }
            </View>
            {
              this.state.isFollow &&
              <CircleButton
                color={this.state.stautsTask.colorText}
                size={80}
                title={this.state.stautsTask.name}
                bgColor={this.state.stautsTask.color}/>
            }
        </SafeAreaView>
        <TabContainer>
          {_.map(tabData, (item, index) => (
            <TabItem
              key={item.key}
              focus={_.isEqual(this.state.indexSeleted, index)}
              index={index}
              onTabSelected={this.onTabSelected}
              handleNavigate={this.handleNavigate}
              item={item}
              width={this.width / _.size(tabData)}
            />
          ))}
        </TabContainer>
        <Content style={{ margin: 12 }}>
          {this.state.indexSeleted === 0 && (
            <ProOverview project={this.props.projectSelected} />
          )}
          {this.state.indexSeleted === 2 && <NoteContainer />}
        </Content>
        <ModalDialog
          ref='modal'
          title='Bạn muốn theo dõi dự án này?'
          textOk='Đồng ý'
          textCancel='Hủy'
          onOk={this.comfirmDeleteFollowProjects}
        />
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
      projectSelected: state.project.projectSelected,
      user: state.auth.user
    }),
  {
    postFollowProject,
    deleteFollowProject
  }
)( ProDetails )