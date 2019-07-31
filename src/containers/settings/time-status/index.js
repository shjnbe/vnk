import React from 'react'
import { Container, Content, Button, Text, Toast } from 'native-base'
import styled from 'styled-components/native'
import { SettingGeneralView } from '../header-setting-view'
import Divider from 'components/elements/divider'
import TimeStatusItem from './time-status-item'
import rows, { STATUS_DATA_DEFAULT } from './data-status'
import * as _ from 'lodash'
import settingApi from 'api/settingApi';
import connectAutoDispatch from '../../../@redux/connect';

const Title = styled.Text`
  paddingLeft: 16
  paddingTop: 16
  paddingBottom: 16
  fontSize: 14
  fontWeight: 900
  letterSpacing: 0
  color: #0445f8
`

class TimeStatusContainer extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      schedule: STATUS_DATA_DEFAULT
    }  
  }

  handleValueChange = (value, code) => {
    const schedule = this.state.schedule
    schedule[code] = value
    this.setState({ schedule })
  }

  async componentDidMount () {
    try {
      const schedule = await settingApi.getSchedule(this.props.user)
      if (!_.has(schedule, 'error.message')) {
        this.setState({schedule})
      }
    } catch (error) {
      console.log(error)
    }
  }

  saveSchedule = async () => {
    const msg = {position: 'top', type: 'warning', text: 'Thiết lập khoảng thời gian lỗi'}
    try {
      const rs = await settingApi.createSchedule(this.props.user, this.state.schedule)
      if (!_.has(rs, 'error.message')) {
        msg.type = 'success'
        msg.text = 'Thiết lập khoảng thời gian thành công'
      }
    } catch (error) {
      console.log(error)
    } finally {
      Toast.show(msg)
    }
  }

  render () {
    return (
      <Container>
        <SettingGeneralView
          title='Thời gian gữa các trạng thái'
          source={require('images/settings/s-time.png')}
        />
        <Title>THIẾT LẬP KHOẢNG THỜI GIAN</Title>
        <Divider />
        <Content padder>
          {
            rows.map(({title, key}) => 
              <TimeStatusItem key={key} title={title} value={_.get(this.state, ['schedule', key], 0)} code={key} onChangeText={this.handleValueChange} />)
          }
          <Divider style={{ marginTop: 24 }} />
          <Button
            onPress={this.saveSchedule}
            style={{
              paddingLeft: 16,
              paddingRight: 16,
              backgroundColor: '#5c93f8',
              marginTop: 16
            }}
            info
          >
            <Text>Lưu</Text>
          </Button>
        </Content>
      </Container>
    )
  }
}
export default connectAutoDispatch(state => ({
  user: _.get(state, 'auth.user', {})
}), {})(TimeStatusContainer)