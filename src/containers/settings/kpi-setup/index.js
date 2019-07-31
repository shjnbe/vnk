import React from 'react'
import { Platform } from 'react-native'
import { Container, Content, Toast } from 'native-base'
import styled from 'styled-components/native'
import { get, isArray, size, clone, has, find, toNumber } from 'lodash'
import SubHeaderView from '../sub-header-view'
import KpiSetupItem from './kpi-setup-item'
import Divider from '../../../components/elements/divider'
import colors from '../../../themes/colors'
import connectAutoDispatch from '../../../@redux/connect'
import { configKpiMonth } from '@redux/actions/settingAction'
import settingApi from '../../../api/settingApi';
import DropdowButton from './dropdow-button';
import MypPicker from 'components/elements/myp-picker'
import saleTypes, { POSITION } from 'constants/position-sale'
import authApi from '../../../api/authApi';

const styleShadowInput = {
  shadowColor: 'rgba(33, 150, 243, 0.56)',
  shadowOffset: {
    width: 0,
    height: 0
  },
  shadowRadius: 2,
  shadowOpacity: 1
}

const SubTitle = styled.Text`
fontSize: 14
fontWeight: 900
color: #0445f8
`

const TextNote = styled.Text`
fontSize: 14
color: #232326
`

const TextInput = styled.TextInput`
  flex: 1
  height: ${Platform.OS === 'android' ? 40 : 33}
  backgroundColor: ${colors.white}
  borderWidth: 1
  borderColor: #2196f3
  fontSize: 14
  textAlign: center
  color: #ee5a55
`

const UserInfoView = styled.View`
  flexDirection: row
  marginTop: 16
  flex: 2
  alignItems: center

`

const ButtonSave = styled.TouchableOpacity.attrs({ activeOpacity: 0.8 })`
  width: 110
  height: 47
  borderRadius: 100
  justifyContent: center
  alignItems: center
  backgroundColor: ${colors.veryLightPink}
  marginTop: 16
  color: #232326
`

const ButtonTitle = styled.Text`
color: #232326
fontSize: 16
fontWeight: bold
color: ${colors.greyishBrown}
`

class KPISetupContainer extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      kpiConfig: clone(props.kpiConfig),
      saleType: saleTypes[3],
      users: []
    }
  }

  handleSave = async () => {
    try {
      const dailyScore = toNumber(get(this.state, 'kpiConfig.daily_score'))
      console.log('dailyScore: ', dailyScore)
      if (!dailyScore || dailyScore === 0) {
        Toast.show({
          text: 'Số điểm trên 1 ngày phải lớn hơn 0',
          type: 'warning',
          position: 'top'
        })

        return
      }

      const rs = await settingApi.saveKpi(this.state.kpiConfig)
      if (has(rs, 'error.message')) {
        Toast.show({
          text: rs.error.message,
          type: 'warning',
          position: 'top'
        })
      } else {
        Toast.show({
          text: 'Thiết lập thành công!',
          type: 'success',
          position: 'top'
        })
      }
    } catch (error) {
      Toast.show({
        text: error.message,
        type: 'danger',
        position: 'top'
      })
    }
  }

  onChangeText = (value, code) => {
    const kpiConfig = this.state.kpiConfig
    kpiConfig[code] = value
    this.setState({ kpiConfig })
  }

  async componentDidMount () {
    try {
      const us = get(this.props, 'user')
      if (us.team_id) {
        const users = await authApi.getUserByTeam(us)
        if (isArray(users) && size(users) > 0) {
          this.setState({users})
          await this.changeConfig(users[0])
        } else {
          this.setState({users})
        }
      } else {
        this.setState({users: [us]})
        await this.changeConfig(us)
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  changeConfig = async sale => {
    const params = {sale, kpiConfig: clone(this.props.kpiConfig)}
    try {
      const keySelf = get(sale, ['saleteam_position'], POSITION.SALE_MAN)
      params.saleType = saleTypes[3]
      if (keySelf) {
        params.saleType = find(saleTypes, ({key}) => key === keySelf)
      }
      const rs = await settingApi.getKPIBy(get(sale, 'id'), get(this.props, 'user.access_token'))
      if (!get(rs, 'error.message')) {
        params.kpiConfig = rs
      } else {
        params.kpiConfig.user_id = sale.id
      }
    } catch (error) {
      console.log(error.message)
    } finally {
      if (!has(params, 'kpiConfig.user_id')) {
        params.kpiConfig.user_id = sale.id
      }
      this.setState(params)
    }
  }

  render () {
    return (
      <Container>
        <SubHeaderView
          title='Thiết lập KPIs: Lương hàng ngày cho NV:'
          source={require('../../../images/settings/business-icon.png')}
        />
        <Content style={{ padding: 16 }}>
          <SubTitle>THIẾT LẬP LƯƠNG KPIs:</SubTitle>
          <KpiSetupItem
            title='1. Lương KPIs'
            subTitle='Đồng/1 NGÀY'
            value={`${get(this.state, 'kpiConfig.salary', 0)}`}
            source={require('../../../images/settings/salary-kpi.png')}
            code='salary'
            onChangeText={this.onChangeText}
          />

          <KpiSetupItem
            title='2. Điểm'
            subTitle='Điểm/1 NGÀY'
            value={`${get(this.state, 'kpiConfig.daily_score', 0)}`}
            source={require('../../../images/settings/point_ico.png')}
            code='daily_score'
            onChangeText={this.onChangeText}
          />

          <KpiSetupItem
            title='3. Tổng số ngày'
            subTitle='Ngày/1 Tháng'
            value={`${get(this.state, 'kpiConfig.date_count', 0)}`}
            code='date_count'
            onChangeText={this.onChangeText}
            source={require('../../../images/settings/ic_today.png')}
          />
          <Divider style={{ marginTop: 16, marginBottom: 16 }} />
          <SubTitle>THIẾT LẬP THƯỞNG DOANH SỐ:</SubTitle>
          <TextNote style={{ marginTop: 16, marginBottom: 4 }}>
            % Thưởng
          </TextNote>
          <UserInfoView>
            <TextInput
              value={`${get(this.state, 'kpiConfig.bonus', 0)}`}
              onChangeText={value => this.onChangeText(value, 'bonus')}
              style={{
                ...styleShadowInput,
                marginRight: 2,
                textAlign: 'center',
                fontWeight: 'bold'
              }}
            />
            <TextNote style={{ flex: 1, paddingLeft: 8 }}>%</TextNote>
          </UserInfoView>
          <UserInfoView>
            <DropdowButton style={{ marginRight: 4 }} 
              title={get(this.state, 'sale.full_name', '')}
              onPress={() => this.refs.sales.open()}
            />
            <DropdowButton
              title={this.state.saleType.name}
              style={{ marginLeft: 4 }}
              onPress={() => this.refs.saleTypes.open()}
            />
          </UserInfoView>
          <UserInfoView
            style={{ alignItems: 'center', justifyContent: 'center' }}
          >
            <ButtonSave onPress={this.handleSave}>
              <ButtonTitle>Thiết lập</ButtonTitle>
            </ButtonSave>
          </UserInfoView>
        </Content>
        <MypPicker
          title='Chọn nhóm'
          ref='saleTypes'
          value={this.state.saleType}
          labelKey='name'
          code='key'
          dataSource={saleTypes}
          onItemChange={saleType => this.setState({ saleType })}
        />
        <MypPicker
          title='Chọn nhân viên'
          ref='sales'
          value={this.state.sale}
          labelKey='full_name'
          code='id'
          dataSource={this.state.users}
          onItemChange={this.changeConfig}
        />
      </Container>
    )
  }
}

export default connectAutoDispatch(
  state => ({
    user: get(state, 'auth.user', {}),
    kpiConfig: get(state, 'settings.kpiConfig', {})
  }),
  {
    configKpiMonth
  }
)(KPISetupContainer)
