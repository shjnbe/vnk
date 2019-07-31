import React from 'react'
import { Container, Content } from 'native-base'
import styled from 'styled-components/native'
import KpiUserInfo from './kpi-user-info'
import Divider from 'components/elements/divider'
import styles from './styles'
import KpiChart from './kpi-chart'
import KpiChartCost from './kpi-chart-cost'
import * as _ from 'lodash'
import projectApi from '../../../api/projectApi'

const ChartTitle = styled.Text`
  fontSize: 14
  fontWeight: bold
  color: #b5262c
  marginLeft: 16
  paddingTop: 12
  paddingBottom: 12
`

const SubChartTitle = styled.Text`
  color: ${props => props.color || '#007aff'}
  marginTop: 15
`

export default class KPIStatisticsContainer extends React.Component {

  state = {
    costs: []
  }

  render () {
    const user = _.get(this.props, 'navigation.state.params.user', {})
    return (
      <Container>
        <Divider />
        <Content>
          <KpiUserInfo
            {...user}
          />
          <Divider />
          <ChartTitle>BÁO CÁO CÁC DỰ ÁN TRONG QUÁ TRÌNH: </ChartTitle>
          <Divider />
          <KpiChartCost teamId={user.team_id} marginTop={22}  />
          <SubChartTitle style={styles.chartTitle}>
            Giá trị dự án đang theo dõi Triệu USD
          </SubChartTitle>
          <KpiChart teamId={user.team_id} marginTop={44} />
          <SubChartTitle color='#b5262c' style={styles.chartTitle}>
            Số lượng dự đang theo dõi
          </SubChartTitle>
        </Content>
      </Container>
    )
  }
}
