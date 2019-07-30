import React from 'react'
import styled from 'styled-components/native'
import * as _ from 'lodash'

const Wrapper = styled.View`
  marginLeft: 16 marginRight: 16
  marginTop: 8
`
const Row = styled.View`
  flexDirection: row
  justifyContent: flex-start
  alignItems: center
  marginTop: 4
  marginBottom: 4
`

const Text = styled.Text`
fontSize: 14
fontWeight: ${props => props.fontWeight || 'bold'}
color: ${props => props.color || '#373636'}
`

export default props => {
  const date_count = _.get(props, 'kpiConfig.date_count', 0)
  const daily_score = _.get(props, 'kpiConfig.daily_score', 0)
  // const bonus = _.get(props, 'kpiConfig.bonus', 0)
  const totalScore = props.totalScore
  
  const month_salary = _.get(props, 'month_salary', 0)
  const totalSalary = _.get(props, 'origin_salary', 0)
  const totalBonus = month_salary - totalSalary//totalSalary*bonus/100
  const per = date_count === 0 ? 0 : _.round(totalScore / date_count / daily_score * 100, 0)
  return (
    <Wrapper>
      <Row>
        <Text>Tổng cả tháng: </Text>
        <Text color='#f90909'>{` ${totalScore} `}</Text>
        <Text color='#417505' fontWeight='normal'>{` Điểm `}</Text>
        <Text fontWeight='normal' color='#5f5c5c'>
          (= {
            _.isNaN(per) ? '' : per
          }% lương KPIs)
        </Text>
      </Row>
      <Row style={{ marginTop: 4 }}>
        <Text>{`% Thưởng: `}</Text>
        <Text fontWeight='normal' color='#5f5c5c'>
          (Giá trị x % Thưởng) = {` `}
        </Text>
        <Text color='#f90909'>{` ${totalBonus.toLocaleString()} `}</Text>
        <Text color='#417505' fontWeight='normal'>{` Đồng `}</Text>
      </Row>
      <Row>
        <Text>Tổng thu nhập:</Text>
        <Text
          fontWeight='normal'
          color='#5f5c5c'
        >{` Lương KPIs (lương CB) + % DS `}</Text>
      </Row>
      <Row style={{ justifyContent: 'center' }}>
        <Text>{` = `}</Text>
        <Text color='#f90909'>{ (month_salary).toLocaleString() }</Text>
        {/* <Text color='#f90909'>{ (totalSalary + totalBonus).toLocaleString() }</Text> */}
        <Text color='#417505'>{` Đồng `}</Text>
      </Row>
    </Wrapper>
  )
}
