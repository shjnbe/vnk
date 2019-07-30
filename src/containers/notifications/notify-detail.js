import React from 'react'
import { AsyncStorage } from 'react-native'
import styled from 'styled-components/native'
import { Container, Content, Icon, Label, List, Card, CardItem, Text, Body, Right, View } from 'native-base'
import NavHeader from 'components/elements/nav-header'
import NotifyRow from './notify-row'
import DATA from './data'
import RnLoading from './rn-loading';
import * as _ from 'lodash'
import moment from 'moment'
import connectAutoDispatch from '@redux/connect';
import { getUserInclude } from '@redux/actions/authAction'

const CommentView = styled.View`
  flexDirection: row
  justifyContent: flex-start
  alignItems: center
  height: 40
  backgroundColor: #fafff2
`


class NotifyDetailContainer extends React.Component {
  state = {
    full_name: null
  }
  async componentDidMount () {
    const id = _.get(this.props, 'navigation.state.params.data.from')
    const task = _.get(this.props, 'navigation.state.params.data.data.notification.id')
    if (id && task === 'task_assigned') {
      const { full_name } = await this.props.getUserInclude(id, this.props.user.access_token)
      this.setState({full_name})
    }
  }

  render () {

    const data = _.get(this.props, 'navigation.state.params.data', {})
    return (
      <Container>
        <NavHeader navigation={this.props.navigation} isBack title='Thông báo' isRight />
        <Content padder>
          <Card style={{padding: 16}}>
            <CardItem header>
              <Text style={{fontWeight: '500'}}>{_.get(data, 'data.title', 'Thông báo')}</Text>
            </CardItem>
            <CardItem><Text note>{moment(_.get(data, 'created')).fromNow()}</Text></CardItem>
            <CardItem cardBody style={{ marginTop: 16 }}>
              <Body>
                <Text style={{ textAlign: 'justify' }}>{_.get(data, 'data.body' ,'No Data')}</Text>
              </Body>
            </CardItem>
            
            { this.state.full_name ? 
              <CardItem cardBody style={{ marginTop: 16 }}>
                <Body>
                  <Text style={{ textAlign: 'justify', fontSize: 13, fontWeight: '400' }}>Việc được tạo bởi: {this.state.full_name}</Text>
                </Body>
              </CardItem> : <View />
            }
          </Card>
        </Content>
      </Container>
    )
  }
}
export default connectAutoDispatch(state => ({
  user: state.auth.user
}), {getUserInclude})(NotifyDetailContainer)