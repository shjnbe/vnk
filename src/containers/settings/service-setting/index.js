import React from 'react'
import { Container, Content, Icon, Toast } from 'native-base'
import SubHeaderView from '../sub-header-view'
import styled from 'styled-components/native'
import colors from '../../../themes/colors'
import Divider from 'components/elements/divider'
import ServiceSettingItem from './service-setting-item'
import settingApi from 'api/settingApi';
import connectAutoDispatch from '@redux/connect';
import * as _ from 'lodash'
import orders from './data-orders'
import ModalDialog from 'components/elements/modal-dialog';
import moment from 'moment'

const SubHeader = styled.View`
  flexDirection: row
  paddingLeft: 16
  paddingRight: 16
  paddingTop: 16
`

const SubTitle = styled.Text` 
fontSize: 22
fontWeight: bold
color: #545252
flex: 1
`

const DateView = styled.View`flexDirection: row paddingRight: 8`

const Touchable = styled.TouchableOpacity.attrs({ activeOpacity: 0.8 })``

const ButtonSave = Touchable.extend`
  width: 110
  height: 47
  borderRadius: 100
  justifyContent: center
  alignItems: center
  backgroundColor: ${colors.veryLightPink}
  marginTop: 24
  color: #232326
`

const ButtonTitle = styled.Text`
fontSize: 16
fontWeight: bold
color: ${colors.greyishBrown}
`

const DateText = styled.Text`
fontSize: 14
fontWeight: bold
color: ${colors.rouge}
`

class ServiceSettingContainer extends React.Component {

  state = {
    current: {},
    package: null
  }

  async componentDidMount () {
    try {
      const current = await settingApi.getOrder({user_id: this.props.user.id, team_id: this.props.user.team_id}, this.props.user.access_token)
      if (!_.get(current, 'error.message')) {
        this.setState({current})
      } 
      console.log(current)
    } catch (error) {
      console.log(error)
    }
  }

  handleConfirm = async () => {
    try {
      const params = {
        user_id: this.props.user.id,
        package: this.state.package.key,
        note: this.state.package.title,
        created: moment()
      }

      if (this.props.user.team_id) {  
        params.team_id = this.props.user.team_id
      }

      const rs = await settingApi.serviceOrder(params, this.props.user.access_token)
      if (_.has(rs, 'error')) {
        Toast.show({
          text: `Mua gói cước không thành công. ${_.get(rs, 'error.message')}`,
          type: 'danger', position: 'top'
        })
      } else {
        Toast.show({
          text: `Mua gói cước thành công, bộ phận sale sẽ liên hệ với bạn!`,
          type: 'success', position: 'top'
        })
      }
    } catch (error) {
      Toast.show({
        text: `Mua gói cước không thành công. ${_.get(error, 'message')}`,
        type: 'danger', position: 'top'
      })
    }
  }

  handleSave = () => {
    if (this.state.package) {
      this.refs.confirmOrder.open()
    }
  }

  renderRight = () => {
    if (!_.isEmpty(this.state.current) && _.get(this.state, 'current.expire_date'))
      return (
        <DateView>
          <Icon name='calendar' style={{fontSize: 15, marginRight: 4}}/>
          <DateText>{moment(this.state.current.expire_date).format('DD/MM/YYYY')}</DateText>
        </DateView>
      )
      return <SubTitle>{` `}</SubTitle>
  }

  render () {
    return (
      <Container>
        <SubHeaderView
          title='Gói dịch vụ'
          source={require('images/settings/s-service.png')}
          right={this.renderRight()}
        />
        <SubHeader>
          <SubTitle>Gói Dịch vụ hiện tại</SubTitle>
          <Icon
            name='edit'
            type='Feather'
            style={{ color: colors.appleGreen }}
          />
        </SubHeader>
        <Content style={{ paddingLeft: 16, paddingRight: 16 }}>
          {
            _.map(orders, item => item.isDivider ?
            <Divider
              {...item}
              style={{
                marginTop: 16,
                marginBottom: 16
              }}
            />
            :
            <Touchable key={item.key} onPress={() => {
              let _package = null
              if (!_.isEqual(this.state.package, item)) {
                _package = item
              }
              this.setState({package: _package})
            }}>
              <ServiceSettingItem
                {...item}
                active={item.key === _.get(this.state, 'package.key') || item.key === _.get(this.state, 'current.package')}
              />
            </Touchable>
            )
          }
          <ButtonSave onPress={this.handleSave}>
            <ButtonTitle>Lưu</ButtonTitle>
          </ButtonSave>
        </Content>
        <ModalDialog 
          ref='confirmOrder'
          title='Bạn muốn nâng cấp dịch vụ?'
          onOk={this.handleConfirm}
        />
      </Container>
    )
  }
}

export default connectAutoDispatch(state => ({user: state.auth.user}), {})(ServiceSettingContainer)