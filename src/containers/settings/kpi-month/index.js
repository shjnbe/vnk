import React from 'react'
import { Container, Content } from 'native-base'
import styled from 'styled-components/native'
import SubHeaderView from '../sub-header-view'
import UserInfo from './kpi-user-info'
import Divider from 'components/elements/divider'
import rows from '../data-kpi-person'
import KpiPersonItem from './kpi-person-item'
import styles from './styles'
import ResultKpi from './result-kpi'
import connectAutoDispatch from '@redux/connect'
import * as _ from 'lodash'
import settingApi from 'api/settingApi';
import moment from 'moment'
import scores from 'constants/score-kpi'

const Text = styled.Text`
  fontFamily: Helvetica
  letterSpacing: 0
`

class KPIMonthContainer extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      kpi: [],
      kpiConfig: {},
      result: {

      }
    }
  }

  async componentDidMount () {
    let params = {}
    try {
      const kpiConfig = await settingApi.getKPIBy(this.props.user.id, this.props.user.access_token)
      if (kpiConfig) {
        params.kpiConfig = kpiConfig
      }
      const from = moment().startOf('months').toJSON()
      const to = moment().endOf('months').toJSON()
      const kpi = await settingApi.getKpiMonth(this.props.user, from, to)
      if (kpi && _.isArray(kpi)) {
        const salary = _.get(params, 'kpiConfig.salary', 0)
        const daily_score = _.get(params, 'kpiConfig.daily_score', 0)

        params.kpi = _.map(kpi, ({ cuoc_goi, lich_hen_gap, chao_gia, chot_don_hang }) => {
          const totalScore = cuoc_goi * scores.cuoc_goi + scores.lich_hen_gap * lich_hen_gap + scores.chao_gia * chao_gia + scores.chot_don_hang * chot_don_hang
          return {
            cuoc_goi,
            lich_hen_gap,
            chao_gia,
            chot_don_hang,
            totalScore,
            salary: _.round(totalScore/daily_score, 2) * salary
          }
        })
      }

    } catch (error) {
      console.log(error.message)
    } finally {
      if (!_.isEmpty(params)) {
        this.setState(params)
      }
    }    
  }

  render () {
    console.log('kpi: ', this.state)
    return (
      <Container>
        <SubHeaderView
          title='KPIs: Lương ngày tháng này'
          source={require('images/settings/business-icon.png')}
        />
        <Content>
          <UserInfo {...this.props.user} />
          <Divider />
          <Text style={styles.tNhGiKpIs}>ĐÁNH GIÁ KPIs:</Text>
          <Divider />
          {rows.map(item => (
            <KpiPersonItem
              {...item}
              kpiList={this.state.kpi}
              code={item.key}
            />
          ))}
          <Divider style={styles.mT4} />
          <ResultKpi kpiConfig={this.state.kpiConfig} list={this.state.kpi} />
        </Content>
      </Container>
    )
  }
}
export default connectAutoDispatch(
  state => ({
    user: _.get(state, 'auth.user', {}),
  }),
  {}
)(KPIMonthContainer)
