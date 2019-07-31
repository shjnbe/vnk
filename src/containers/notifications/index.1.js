import React from 'react'
import { AsyncStorage, FlatList, Platform, StatusBar } from 'react-native'
import styled from 'styled-components/native'
import { Container, Content, Icon, Label, List } from 'native-base'
import NavHeader from 'components/elements/nav-header'
import NotifyRow from './notify-row'
import DATA from './data'
import RnLoading from './rn-loading';
import messageDefault from '../../constants/notify-data'
import moment from 'moment'
import CACHE from '../../utils/cache'
import connectAutoDispatch from '../../@redux/connect';
import * as _ from 'lodash'
import { getProjectById } from '@redux/actions/projectAction'

const SHOW_MSG_LOCAL = 'SHOW_MSG_LOCAL'

const Touchable = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8
})``

const CommentView = styled.View`
  flexDirection: row
  justifyContent: flex-start
  alignItems: center
  height: 40
  backgroundColor: #fafff2
`

class NotificationsContainer extends React.Component {
  // state = {
  //   list: []
  // }

  // async componentDidMount () {
  //   const rs = await CACHE.getCacheNotJson(SHOW_MSG_LOCAL + _.get(this.props, ['user', 'id'], ''))
  //   if (rs) {
  //     messageDefault.time = moment(rs * 1000).fromNow()
  //     this.setState({list: [messageDefault]})
  //   }
  // }

  handleNotifyOpen = data => {
    const key = _.get(data, 'data.notification.id')
    switch (key) {
      case 'task_assigned':
        this.props.navigation.navigate('taskConfirm', { data })
        break;
        
      case 'project_status_need_update':
      case 'project_status_changed':
        const projectId = _.get(data, 'data.notification.idDetect')
        if (projectId) {
          this.props.getProjectById(projectId)
          this.props.navigation.navigate('proDetails', { data })
        } else {
          this.props.navigation.navigate('notifyDetail', { data })
        }
        break;
      case "salary_confirmation":
        this.props.navigation.navigate('salaryConfirm', { data })
        break
      default:
        this.props.navigation.navigate('notifyDetail', { data })
        break;
    }
  }

  _renderItem = ({item}) => {
    return <NotifyRow {...item} onPress={() => this.handleNotifyOpen(item)}/>
  }

  _keyExtractor = item => `${item.id}`

  render () {
    return (
      <Container>
        <StatusBar hidden={Platform.OS === 'android'} />
        <NavHeader title='Thông báo' isRight />
        <CommentView>
          <Icon
            name='bell'
            type='Feather'
            style={{ color: '#a8e490', paddingLeft: 16, paddingRight: 8 }}
          />
          <Label>Thông báo từ Hệ thống</Label>
        </CommentView>
        <Content style={{ paddingLeft: 16, paddingRight: 16 }} scrollEnabled={false}>
          <FlatList
            keyExtractor={this._keyExtractor}
            data={_.get(this.props, 'notify.list', [])}
            renderItem={this._renderItem}
          />
        </Content>
      </Container>
    )
  }
}
export default connectAutoDispatch(state => ({
  user: state.auth.user,
  notify: state.notify
}), {
  getProjectById
})(NotificationsContainer)