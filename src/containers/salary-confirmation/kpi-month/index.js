import React from 'react'
import { Container, Content } from 'native-base'
import styled from 'styled-components/native'
import SubHeaderView from './sub-header-view'
import UserInfo from './kpi-user-info'
import Divider from 'components/elements/divider'
import rows from './data-kpi-person'
import KpiPersonItem from './kpi-person-item'
import styles from './styles'
import ResultKpi from './result-kpi'
import connectAutoDispatch from '@redux/connect'
import * as _ from 'lodash'
import settingApi from 'api/settingApi';
import moment from 'moment'
import scores from 'constants/score-kpi'
import { NavHeader } from 'components/elements/nav-header'
import EditKpiComponent from '../edit-kpi';
import salaryApi from 'api/salaryApi';

const Text = styled.Text`
  fontFamily: Helvetica
  letterSpacing: 0
`

class KPIMonthContainer extends React.Component {
  constructor(props) {
    super(props)
    const params = props.navigation.getParam('data')
    this.state = {
      kpi: _.get(params, 'kpi', {}),
      kpiConfig: {},
      result: {
      },
      user: _.get(params, 'user', {})
    }
  }



  async componentDidMount() {
    //   let params = {}
    try {
      const kpiConfig = await settingApi.getKPIBy(this.state.user.id, this.props.access_token)
      if (kpiConfig) {
        this.setState({ kpiConfig })
      }
      //     const from = moment().startOf('months').toJSON()
      //     const to = moment().endOf('months').toJSON()
      //     const kpi = await settingApi.getKpiMonth(this.props.user, from, to)
      //     if (kpi && _.isArray(kpi)) {
      //       const salary = _.get(params, 'kpiConfig.salary', 0)
      //       const daily_score = _.get(params, 'kpiConfig.daily_score', 0)

      //       params.kpi = _.map(kpi, ({ cuoc_goi, lich_hen_gap, chao_gia, chot_don_hang }) => {
      //         const totalScore = cuoc_goi * scores.cuoc_goi + scores.lich_hen_gap * lich_hen_gap + scores.chao_gia * chao_gia + scores.chot_don_hang * chot_don_hang
      //         return {
      //           cuoc_goi,
      //           lich_hen_gap,
      //           chao_gia,
      //           chot_don_hang,
      //           totalScore,
      //           salary: _.round(totalScore / daily_score, 2) * salary
      //         }
      //       })
      //     }

    } catch (error) {
      console.log(error.message)
    }
    // } finally {
    //     if (!_.isEmpty(params)) {
    //       this.setState(params)
    //     }
    //   }
  }

  handleEdit = () => {
    this.refs.editKpi.onOpen(this.state.kpi)
  }

  handleEditSave = async ({ month_salary, note }) => {
    this.saveData({...this.state.kpi, month_salary: Number(month_salary), note})
  }

  handleSave = () => {
    this.saveData({...this.state.kpi, status: 1})
  }

  async saveData (params) {
    const data = await salaryApi.update(params)
    this.props.navigation.goBack()
  }

  render() {
    const monthTitle = `${_.padStart(this.state.kpi.month, 2, '0')}/${this.state.kpi.year}`
    return (
      <Container>
        <NavHeader navigation={this.props.navigation} isBack title='Xác nhận KPIs'
          onEdit={this.handleEdit}
          onSave={this.handleSave}
        />
        <SubHeaderView
          title={`KPIs: Lương ngày tháng ${monthTitle}`}
          source={require('images/settings/business-icon.png')}
        />
        <Content>
          <UserInfo {...this.state.user} monthTitle={monthTitle} />
          <Divider />
          <Text style={styles.tNhGiKpIs}>ĐÁNH GIÁ KPIs:</Text>
          <Divider />
          <KpiPersonItem icon={require('./icon/m_answer.png')} score={_.get(this.state.kpi, 'cuoc_goi', 0)} title='1. Cuộc gọi' />
          <Divider />
          <KpiPersonItem icon={require('./icon/m_building.png')} score={_.get(this.state.kpi, 'lich_hen_gap', 0)} title='2. Lịch hẹn gặp' />
          <Divider />
          <KpiPersonItem icon={require('./icon/m_moneny.png')} score={_.get(this.state.kpi, 'chao_gia', 0)} title='3. Chào giá' />
          <Divider />
          <KpiPersonItem icon={require('./icon/m_revenue.png')} score={_.get(this.state.kpi, 'chot_don_hang', 0)} title='4. Chốt đơn hàng' />
          <Divider style={styles.mT4} />
          <ResultKpi kpiConfig={this.state.kpiConfig} {...this.state.kpi} />
        </Content>
        <EditKpiComponent ref='editKpi' onSave={this.handleEditSave} />
      </Container>
    )
  }
}
export default connectAutoDispatch(
  state => ({
    access_token: _.get(state, 'auth.user.access_token'),
  }),
  {}
)(KPIMonthContainer)
