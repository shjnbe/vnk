import React from 'react'
import { TouchableHighlight, ListView } from 'react-native'
import { Icon, Text, Left, Body, View, Thumbnail, SwipeRow, Button } from 'native-base'
import styled from 'styled-components/native'
import * as _ from 'lodash'
import moment from 'moment'
import ThumbnailView from './thumbnail-view'
const HeaderView = styled.View` flexDirection: row `

export default class NotifyRow extends React.Component {

  getIcon = () => {
    const type = _.get(this.props, 'data.notification.id')
    switch (type) {
      case 'task_assigned': // Noi bo nhom
        return require('../../images/globe/notify_inteam.png')
      case 'project_status_changed': // Noi bo nhom
        return require('../../images/globe/notify_project_status.png')
      case 'project_status_need_update': // Noi bo nhom
        return require('../../images/globe/notify_need_update.png')
      case 'salary_confirmation': // Noi bo nhom
        return require('../../images/globe/ic_money.png')
      default:
        return require('../../images/globe/notify_sys.png')
    }
  }

  getColor = () => {
    const key = _.get(this.props, 'data.notification.id')
    switch (key) {
      case 'project_status_need_update':
        return '#d0021b'
      case 'salary_confirmation':
        return '#4fba6f'
      default:
        return '#417505'
    }
  }


  renderBody = () => {
    const icon = this.getIcon()
    const color = this.getColor()
    return (
      <TouchableHighlight onPress={this.props.onPress} style={{flex: 1}} activeOpacity={0.3} underlayColor='transparent'>
      <View avatar style={{ marginLeft: 0, flex: 1, alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }}>
        <View>
          {
            icon ? <Thumbnail source={icon} /> : <ThumbnailView backgroundColor={this.props.color} />
          }
        </View>
        <View style={{flex: 1, paddingLeft: 16}}>
          <HeaderView>
            <Text style={{ flex: 1 }} numberOfLines={1}>{_.get(this.props, 'data.title')}</Text>
            <Text note numberOfLines={1}>
              <Icon name='calendar' style={{ fontSize: 12 }} />
              {`  `}
              {moment(_.get(this.props, 'created')).fromNow()}
            </Text>
          </HeaderView>
          <Text numberOfLines={2} note style={{ color }} numberOfLines={2}>
            <Icon name='target' type='Feather' style={{ fontSize: 6, color }} />
            {`  `}
            {_.get(this.props, 'data.body')}
          </Text>
        </View>
      </View>
      </TouchableHighlight>
    )
  }

  renderRight = () => {
    return (
      <Button danger onPress={() => alert(_.get(this.props, 'data.title'))}>
        <Icon active name="trash" />
      </Button>
    )
  }

  /**
   * Khi giao việc: task_assigned
   * Khi project chuyển trạng thái: project_status_changed
   * Dự án sắp quá hạn trạng thái: project_status_need_update
   * @Nghia Với Công ty của riêng cá nhân đó em cho thêm trường created_by 
     để phân biệt nhé, default = 0 với các company của hệ thống
   *  */

  render() {

    return (
      <SwipeRow
        rightOpenValue={-75}
        right={this.renderRight()}
        body={this.renderBody()}
      />
    )
  }
}
