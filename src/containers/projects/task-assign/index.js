import React from 'react'
import { FlatList } from 'react-native'
import { Container, Content, Fab, Icon, Footer, Button, Text, Header, Body, Left, Row, Toast, Label } from 'native-base';
import styled from 'styled-components/native'
import colors from '../../../themes/colors';
import mypStyles from '../../../themes/myp-styles';
import PickerMonth from '../picker-month';
import moment from 'moment'
import PickerOptionSale from '../picker-option-sale';
import staffTypes from 'constants/staff-type';
import MypPicker from 'components/elements/myp-picker';
import DropdowButton from './dropdow-button';
import TaskInput from 'components/elements/task-input';
import * as _ from 'lodash'
import connectAutoDispatch from '../../../@redux/connect';
import authApi from '../../../api/authApi';
import { SALES, POSITION } from 'constants/position-sale';
import taskApi from 'api/taskApi';
import TaskRow from './task-item'
import TaskModal from './add-new-task'

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

  constructor (props) {
    super (props) 
    const project_id = _.get(props, 'navigation.state.params.project.id', null)
    this.state = {
      monthCurrent: moment().format('MMM'),
      // taskOfAssign: [],
      content: '',
      currentSale: null,
      users: [],
      isSave: false,
      tasks: [],
      project_id
    }
  }

  handleAddTask = async () => {
    if (this.state.currentSale) {
      this.refs.newTask.open()
    } else {
      Toast.show({
        text: 'Bạn chưa chọn người giao việc',
        position: 'top',
        type: 'warning'
      })
    }
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

  async componentDidMount () {
    this.props.navigation.setParams({
      onValueChange: this.onValueChange,
      monthCurrent: this.state.monthCurrent
    })

    const users = await authApi.getUserByTeam(this.props.user, false)
    this.setState({users})
  }

  loadTask = async currentSale => {
    try {
      const rs = await taskApi.tasks(currentSale.id, this.props.user)
      this.setState({ tasks: rs, currentSale })
    } catch (error) {
      this.setState({ currentSale })
    }
  }

  handleChangeUser = currentSale => {
    this.loadTask(currentSale)
  }

  handleSaveTask = async content => {
    try {
      const rs = await taskApi.add({
        project_id: this.state.project_id,
        content,
        user_id: _.get(this.state, 'currentSale.id'),
        created_by: _.get(this.props, 'user.id')
      }, this.props.user.access_token)
      
      Toast.show({
        text: `Bạn vừa giao việc thành công cho ${_.get(this.state, 'currentSale.full_name')}`,
        type: 'success',
        position: 'top'
      })
      this.loadTask(_.get(this.state, 'currentSale'))
    } catch (error) {
      Toast.show({
        text: `Lỗi, ${error.message}`,
        type: 'danger',
        position: 'top'
      })  
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
              backgroundColor: 'red',
              fontFamily: "Helvetica",
              fontSize: 14,
              fontWeight: "bold",
              letterSpacing: 0,
              borderRadius: 3,
              paddingBottom: 4, paddingTop: 4, paddingLeft: 16, paddingRight: 16,
              color: colors.white
            }}>Giao Việc</Text>
            {/* <Icon  type='Feather' name='edit' style={{ color: colors.appleGreen }} onPress={this.onEdit} /> */}
          </Body>
        </Header>
        <Content style={{ padding: 12 }}>
          <Row style={{ paddingBottom: 4 }}>
            {_.get(this.props, 'user.saleteam_position') === POSITION.SALE_MANAGER ? <Text>Giao cho</Text> : <Label style={{ color: 'red', textAlign: 'center' }}>Bạn không phải là Sale Manager</Label>}
          </Row>
          {
            _.get(this.props, 'user.saleteam_position') === POSITION.SALE_MANAGER &&
            <Row>
              <DropdowButton title={_.get(this.state, 'currentSale.full_name')} style={{marginRight: 6}} onPress={this.handleSelectStaff} />
              <DropdowButton title={_.get(SALES, [_.get(this.state, 'currentSale.saleteam_position', POSITION.SALE_MAN), 'name'])} style={{marginLeft: 6}} />
            </Row>
            
          }
          <Row style={{ alignItems: 'center', paddingBottom: 8, paddingTop: 8 }}>
            <Circle />
            <Line />
          </Row>
          <FlatList 
            data={this.getData()}
            keyExtractor={({id}) => `${id}`}
            renderItem={({item}) => <TaskRow key={`${item.id}`} {...item}/>}
          />
          {
            //this.state.taskOfAssign.map((item, index)=> <TaskInput inx={index} key={`${item.date.unix()}`} onValueChange={this.onTaskChange} />)
            // this.state.isSave ? <TaskInput onValueChange={this.onTaskChange} /> : <Empty />
            // this.state.tasks.map(item => <TaskRow key={`${item.id}`} {...item}/>)
          }
        </Content>
        {/* <Footer style={[{
          flexDirection: 'row',
          justifyContent: 'flex-end',
          backgroundColor: '#FFF'
        }, mypStyles.styleHeader]}>
          <Button transparent>
            <Text style={{color: colors.blue, fontWeight: '600'}}>Giao việc</Text>
          </Button>
        </Footer> */}
        { _.get(this.props, 'user.saleteam_position') === POSITION.SALE_MANAGER &&
          <Fab
            direction='up'
            containerStyle={{
              marginBottom: 20
            }}
            style={{ backgroundColor: colors.tomato }}
            onPress={this.handleAddTask}
          >
            <Icon type='Feather' name={this.state.isSave ? 'save' : 'plus'} />
          </Fab>
        }
        <MypPicker
          title='Chọn sale'
          code='id'
          ref='pickerStaff'
          labelKey='full_name'
          dataSource={this.state.users}
          value={this.state.currentSale}
          onItemChange={this.handleChangeUser}
        />
        <TaskModal 
          ref='newTask'
          onAddTask={this.handleSaveTask}
        />
      </Container>
    )
  }
}

export default connectAutoDispatch(state => ({
  user: _.get(state, 'auth.user', {})
}), {})(TaskAssignComponent)