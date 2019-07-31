import React from 'react'
import { Dimensions, FlatList } from 'react-native'
import { Container, Content, Icon, Fab, Toast, View, Textarea, Header, Text, Card, CardItem, Button, DatePicker } from 'native-base'
import colors from '../../../themes/colors'
import moment from 'moment'
import styled from 'styled-components/native'
import * as _ from 'lodash'
import connectAutoDispatch from '../../../@redux/connect'
import InputTextbox from './input-textbox'
import { updateMyProfile } from '@redux/actions/authAction'
import Modal from 'react-native-modalbox';
import TaskRow from './task-row'

class TaskComponent extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isEdit: true,
      today: new Date(),
      content: '',
      taskOfMe: _.get(props, 'user.custom.notes', [])
    }
  }
  handleBack = e => {
    this.props.navigation.goBack()
  }

  onValueChange = today => {
    this.setState({today})
    this.props.navigation.setParams({
      onValueChange: this.onValueChange,
      today
    })
  }

  componentDidMount () {
    this.props.navigation.setParams({
      onValueChange: this.onValueChange,
      today: this.state.today
    })
  }

  handleNewTask = () => {
    const date = moment(this.state.today)
      .hour(moment().hour())
      .minute(moment().minute())
      .second(moment().second())
    this.setState({ content: '', today: date })
    this.refs.newTask.open()
  }

  handleAddTask = () => {
    if (this.state.isEdit) {
      const taskOfMe = this.state.taskOfMe
      if (
        taskOfMe.length === 0 ||
        (_.head(taskOfMe) && _.head(taskOfMe).content)
      ) {
        const date = moment()
        taskOfMe.unshift({ key: date.unix(), date, content: '' })
        this.setState({ isEdit: false, taskOfMe })
      } else {
        Toast.show({
          text: 'Vui lòng nhập xong nội dung?',
          type: 'warning',
          position: 'top'
        })
      }
    } else {
      this.setState({isEdit: true})
      const user = _.get(this.props, 'user')
      if (user && user.custom) {
        user.custom.notes = _.filter(this.state.taskOfMe, ({content}) => !_.isEmpty(content))
      }
      this.props.updateMyProfile(user)
    }
  }

  onTaskChange = (content, index) => {
    const taskOfMe = this.state.taskOfMe
    taskOfMe[index].content = content
    this.setState({ taskOfMe })
  }

  getData = () => {
    const ls = _.get(this.props, 'user.custom.notes', [])
    const from = moment(this.state.today).startOf('days')
    const to = moment(this.state.today).endOf('days')
    const lsOrigin = _.clone(ls)
    return _.orderBy(_.filter(lsOrigin, ({date}) => moment(date).diff(from) > 0 && moment(date).diff(to) < 0), 'date', 'desc')
  }

  handleDateChange = today => {
    this.setState({today})
    this.props.navigation.setParams({
      onValueChange: this.onValueChange,
      today
    })
  }

  saveTask = async () => {
    const user = _.get(this.props, 'user')
    const notes = _.get(user, 'custom.notes', [])
    notes.push({
      key: moment().unix(), date: moment(this.state.today), content: this.state.content
    })

    if (user && user.custom) {
      user.custom.notes = notes//_.filter(this.state.taskOfMe, ({content}) => !_.isEmpty(content))
    }
    const rs = await this.props.updateMyProfile(user)
    if (rs) {
      Toast.show({
        text: 'Lưu thành công',
        type: 'success',
        position: 'top'
      })
    }
    this.handleClose()
  }

  handleClose = () => {
    this.refs.newTask.close()
    this.setState({ content: '' })
  }

  _renderItem = ({item}) => {
    return <TaskRow {...item}/>
  }

  _keyExtractor = ({key}) => `${key}`

  onChangeTextarea = content => {
    this.setState({ content })
  }

  render () {
    return (
      <Container>
        <FlatList
          keyExtractor={this._keyExtractor}
          data={this.getData()}
          renderItem={this._renderItem}
        />
        <Fab
          direction='up'
          containerStyle={{}}
          style={{ backgroundColor: colors.tomato }}
          onPress={this.handleNewTask}
        >
          <Icon type='Feather' name={ this.state.isEdit ? 'plus' : 'save' }  />
        </Fab>
        <Modal ref='newTask' style={{
           height: 275,
           borderRadius: 5,
           width: Dimensions.get('screen').width - 80
          }} position='center'
          swipeToClose={false}
          backdropPressToClose={false}
        >
          <View style={{borderRadius: 5}}>
            <View style={{justifyContent: 'center', alignItems: 'center', height: 50}}>
              <Text style={{fontWeight: 'bold'}}>Thêm ghi chú</Text>
            </View>
            <Textarea onChangeText={this.onChangeTextarea} rowSpan={5} bordered placeholder='Nhập nội dung...' />
            {/* <View style={{ flexDirection: 'row' }}>
              <Icon name='calendar' type='Feather' style={{ fontSize: 17, marginTop: 10, marginLeft: 8 }} />
              <DatePicker
                defaultDate={this.state.today}
                modalTransparent={false}
                animationType={"fade"}
                androidMode={"default"}
                placeHolderText={moment(this.state.today).format('DD/MM/YYYY')}
                onDateChange={this.handleDateChange}
              />
            </View> */}
            <View style={{justifyContent: 'flex-end', alignItems: 'center', marginTop: 12, paddingRight: 16, flexDirection: 'row'}}>
              <Button onPress={this.handleClose} bordered danger small style={{ marginRight: 16 }}><Text>Đóng</Text></Button>
              <Button disabled={this.state.content === ''} bordered danger small onPress={this.saveTask}><Text>Lưu</Text></Button>
            </View>
          </View>
        </Modal>
      </Container>
    )
  }
}

export default connectAutoDispatch(
  state => ({
    user: state.auth.user,
    // taskOfMe: state.auth.taskOfMe
  }),
  {updateMyProfile}
)(TaskComponent)
