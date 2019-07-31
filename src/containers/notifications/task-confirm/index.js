import React from 'react'
import { FlatList } from 'react-native'
import { Container, Content, Fab, Icon, Footer, Button, Text, Header, Body, Left, Row, Toast } from 'native-base';
import styled from 'styled-components/native'
import colors from '../../../themes/colors';
import mypStyles from '../../../themes/myp-styles';
import PickerMonth from '../../../containers/projects/picker-month';
import moment from 'moment'
import * as _ from 'lodash'
import connectAutoDispatch from '../../../@redux/connect';
import authApi from '../../../api/authApi';
import { SALES, POSITION } from '../../../constants/position-sale';
import taskApi from 'api/taskApi';
import notifyApi from 'api/notifyApi'
import TaskRow from './task-item'
import ModalDialog from '../../../components/elements/modal-dialog';
import { getProjectById } from '../../../@redux/actions/projectAction'

const Circle = styled.View`
  width: 14
  height: 14
  borderRadius: 7
  backgroundColor: ${colors.dodgerBlue}
`

const Empty = styled.View``

const Line = styled.View`
  height: 1
  flex: 1
  backgroundColor: ${colors.dodgerBlue}
`


class TaskAssignComponent extends React.Component {

  state = {
    tasks: [],
    task: null,
    monthCurrent: moment().format('MMM')
  }

  onValueChange = currentSale => {
    this.setState({ currentSale })
  }

  handleSelectStaff = () => {
    this.refs.pickerStaff.open()
  }

  onTaskChange = (content, index) => {
    this.setState({content})
  }

  getData = () => {
    const ls = _.clone(this.state.tasks)
    return _.filter(ls, ({created}) => moment(created).format('MMM') === this.state.monthCurrent)
  }

  componentDidMount () {
    // const dataNotification = _.get(this.props, 'navigation.state.params.data')
    // console.log('kakaka', JSON.stringify(dataNotification))
    this.loadTask()
    this.receivedTask()
  }

  receivedTask = async () => {
    const idDetect = _.get(this.props, 'navigation.state.params.data.data.notification.idDetect')
    if (idDetect) {
      const task = await taskApi.getById(idDetect)
      if (!_.get(task, 'custom.received')) {
        this.setState({task})
        this.refs.modal.open()
      }
    }
  }

  loadTask = async () => {
    try {
      const rs = await taskApi.myTasks(this.props.user)
      this.setState({ tasks: rs })
    } catch (error) {
    }
  }

  handleConfirm = async () => {
    const data = this.state.task
    if (data && data.custom) {
      data.custom.received = true
    } else {
      data.custom = {received: true}
    }
    const rs = await taskApi.update(this.state.task.id, data)
    if (rs) {
      const dataNotification = _.get(this.props, 'navigation.state.params.data')
      const full_name = _.get(this.props, 'user.full_name')
      try {
        const title = 'Đã nhận công việc'
        const body = `[${full_name}] Đã nhận công việc [${_.get(dataNotification, 'data.body')}]`
        const access_token = _.get(this.props, 'user.access_token')

        const data = {
          body, 
          title,
          notification: {
            body,
            title, 
            color: '#00ACD4',
            priority: 'high',
            id: 'received_job', 
            idDetect: _.get(dataNotification, 'data.notification.idDetect'), 
            show_in_foreground: true
          }
        }
        const toUserId = _.get(dataNotification, 'from')
        // const add = await notifyApi.add({
        //   from: _.get(dataNotification, 'to'),
        //   to: toUserId,
        //   token: null,
        //   data
        // },
        //   access_token
        // )
        notifyApi.sentNotifyToUser({toUserId, data, access_token})
      } catch (error) {
        console.log('hihi', error)
      }

      Toast.show({
        text: 'Nhận việc thành công',
        type: 'success',
        position: 'top'
      })
    }
  }

  handleOpenProject = item => {
    if (item && item.project_id) {
      this.props.getProjectById(item.project_id)
      this.props.navigation.navigate('proDetails', {})
    }
  }

  render () {
    return (
      <Container>
        <Header noShadow transparent style={mypStyles.styleHeader}> 
          <Left>
            <Icon name='chevron-left' type='Feather'  style={{ fontSize: 30}} onPress={() => this.props.navigation.goBack()} />
          </Left>
          <Body style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
            <PickerMonth onValueChange={this.onValueChange} monthCurrent={this.state.monthCurrent} />
            <Text style={{
              backgroundColor: colors.appleGreen,
              fontFamily: 'Helvetica',
              fontSize: 14,
              fontWeight: 'bold',
              letterSpacing: 0,
              borderRadius: 3,
              paddingBottom: 4, paddingTop: 4, paddingLeft: 16, paddingRight: 16,
              color: colors.white
            }}>{_.get(this.props, 'user.full_name')}</Text>
          </Body>
        </Header>
        <Content style={{ padding: 12 }}>
          <FlatList 
            data={this.getData()}
            keyExtractor={({id}) => `${id}`}
            renderItem={({item}) => <TaskRow key={`${item.id}`} {...item} onPress={() => this.handleOpenProject(item)}/>}
          />
        </Content>
        <Footer style={[{
          flexDirection: 'row',
          justifyContent: 'flex-end',
          backgroundColor: '#FFF'
        }, mypStyles.styleHeader]}>
          <Button transparent>
            <Text style={{color: colors.blue, fontWeight: '600'}}>Đã nhận việc</Text>
          </Button>
        </Footer>
        <ModalDialog
          ref='modal'
          title='Xác nhận nhận việc?'
          textOk='Xác nhận'
          textCancel='Hủy'
          onOk={this.handleConfirm}
        />
      </Container>
    )
  }
}

export default connectAutoDispatch(state => ({
  user: _.get(state, 'auth.user', {})
}), {getProjectById})(TaskAssignComponent)