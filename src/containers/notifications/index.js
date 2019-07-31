import React from 'react'
import { FlatList, Platform, StatusBar, ListView } from 'react-native'
import styled from 'styled-components/native'
import { Container, Content, Icon, Label, List, ListItem, Button } from 'native-base'
import NavHeader from 'components/elements/nav-header'
import NotifyRow from './notify-row'
import connectAutoDispatch from '../../@redux/connect';
import * as _ from 'lodash'
import { getProjectById } from '@redux/actions/projectAction'
import { deleteNotify } from '@redux/actions/notifyAction.js'
import FCM from "react-native-fcm";

const CommentView = styled.View`
  flexDirection: row
  justifyContent: flex-start
  alignItems: center
  height: 40
  backgroundColor: #fafff2
`

class NotificationsContainer extends React.Component {

  static navigationOptions = ({ }) => {
    return {
      tabBarOnPress: ({defaultHandler}) => {
        FCM.setBadgeNumber(0)
        defaultHandler()
      }
    }
  }

  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      basic: true,
      listViewData: _.get(props, 'notify.list', []),
    };
  }

  deleteRow(data, secId, rowId, rowMap) {
    this.props.deleteNotify(data.id, _.get(this.props, 'user.access_token', ''))
    rowMap[`${secId}${rowId}`].props.closeRow();
    const newData = [...this.state.listViewData];
    newData.splice(rowId, 1);
    this.setState({ listViewData: newData });
  }

  getData () {
    return (new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }))
  }

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

  _renderItem = item => {
    return <NotifyRow {...item} onPress={() => this.handleNotifyOpen(item)}/>
  }

  _renderRightHiddenRow = (data, secId, rowId, rowMap) => {
    return (
      <Button full danger onPress={_ => this.deleteRow(data, secId, rowId, rowMap)}>
        <Icon active name="trash" />
      </Button>
    )
  }

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
          <List
            // keyExtractor={this._keyExtractor}
            // data={_.get(this.props, 'notify.list', [])}
            // renderItem={this._renderItem}
            //leftOpenValue={75}
            rightOpenValue={-75}
            dataSource={this.ds.cloneWithRows(this.state.listViewData)}
            renderRow={this._renderItem}
            renderRightHiddenRow={this._renderRightHiddenRow}
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
  getProjectById,
  deleteNotify
})(NotificationsContainer)