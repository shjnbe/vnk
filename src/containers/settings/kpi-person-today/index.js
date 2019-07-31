import React from 'react'
import { Container, Content, Toast } from 'native-base'
import styled from 'styled-components/native'
import SubHeaderView from '../sub-header-view'
import UserInfo from './kpi-user-info'
import Divider from 'components/elements/divider'
import rows from '../data-kpi-person'
import scores from 'constants/score-kpi'
import KpiPersonItem from './kpi-person-item'
import styles from './styles'
import ResultKpi from './result-kpi'
import connectAutoDispatch from '../../../@redux/connect'
import { get, isEmpty } from 'lodash'
import settingApi from 'api/settingApi';

const Text = styled.Text``
const ButtonSave = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8
})``

const ImageRight = styled.Image.attrs({
  resizeMode: 'contain'
})`
  width: 20
  height: 20
`

const fields = [
  'cuoc_goi',
  'lich_hen_gap',
  'chao_gia',
  'chot_don_hang',
  'user_id'
]

class KPIPersonContainer extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      kpi: {
        cuoc_goi: 0,
        lich_hen_gap: 0,
        chao_gia: 0,
        chot_don_hang: 0
      },
      kpiConfig: null
    }
  }

  handleKpiMonth = () => {
    this.props.navigation.navigate('kpiMonthContainer', {
      title: 'KPIs tháng này'
    })
  }

  onChangeText = (value, code) => {
    let kpi = this.state.kpi
    kpi[code] = value
    this.setState({ kpi })
  }

  handleSave = () => {
    this.props.configKpiToday(this.state.kpi)
  }

  async componentDidMount () {
    console.log('init kpi')
    let params = {}
    try {
      const kpiConfig = await settingApi.getKPIBy(this.props.user.id, this.props.user.access_token)
      if (kpiConfig) {
        params.kpiConfig = kpiConfig
      }
      const kpi = await settingApi.getSelfScore(this.props.user.id, this.props.user.access_token)
      console.log('kpi', kpi)
      if (kpi) {
        params.kpi = get(kpi, 'kpi', {})
      }
    } catch (error) {
      Toast.show({
        text: 'Bạn chưa được thiết lập KPIs.',
        type: 'success',
        position: 'top'
      })
      console.log(error.message)
    } finally {
      if (!isEmpty(params)) {
        this.setState(params)
      }
    }
  }

  render () {
    return (
      <Container>
        <SubHeaderView
          title='KPIs: Chấm Lương ngày hôm nay'
          source={require('images/settings/business-icon.png')}
          right={
            <ButtonSave
              style={{ paddingLeft: 8, paddingRight: 8 }}
              onPress={this.handleKpiMonth}
            >
              <ImageRight source={require('images/settings/ic_today.png')} />
            </ButtonSave>
          }
        />
        <Content>
          <UserInfo {...this.props.user} />
          <Divider />
          <Text style={styles.tNhGiKpIs}>TỰ ĐÁNH GIÁ KPIs:</Text>
          <Divider />
          {rows.map(item => {
            console.log('KpiPersonItem: ', get(this.state, ['kpi', item.key], ''))
            return (
            <KpiPersonItem
              {...item}
              total={`${get(this.state, ['kpi', item.key], '')}`}
              point={`${get(scores, [item.key], 0)}`}
              code={item.key}
              onChangeText={this.onChangeText}
            />
          )})}
          <Divider style={styles.mT4} />
          <Text style={styles.tNhGiKpIs}>KẾT QUẢ THỰC HIỆN</Text>
          <Divider />
          <ResultKpi kpiConfig={this.state.kpiConfig} info={this.state.kpi} />
        </Content>
      </Container>
    )
  }
}
export default connectAutoDispatch(
  state => ({
    user: get(state, 'auth.user', {}),
  }),
  {}
)(KPIPersonContainer)
