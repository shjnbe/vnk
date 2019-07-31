import React from 'react'
import styled from 'styled-components/native'
import scores from '../../../constants/score-kpi'
import { join, map, sum, round, get, mapKeys, isNaN } from 'lodash'

const Wrapper = styled.View`
  marginLeft: 16 marginRight: 16
  marginTop: 8
`
const Row = styled.View`
  flexDirection: row
  flex: 1
  justifyContent: flex-start
`

const Text = styled.Text`
fontSize: 14
fontWeight: ${props => props.fontWeight || 'bold'}
color: ${props => props.color || '#373636'}
`

export default props => {
  const rs = props.info || {}
  let total = 0
  const values = []
  mapKeys(scores, (score, key) => {
    total+= get(rs, key, 0) * score
    values.push(`${score}x${get(rs, key, 0)||0}`)
    return key
  })

  const daily_score = get(props, 'kpiConfig.daily_score', 0)
  const _kpi = round(total / daily_score, 2)
  const result = round((total / daily_score) * 100, 0)
  return (
    <Wrapper>
      <Row>
        <Text>Tổng: </Text>
        <Text fontWeight='normal' color='#5f5c5c'>
          ({join(values, ' + ')}) =
        </Text>
        <Text color='#f90909'>{` ${total} `}</Text>
        <Text color='#417505' fontWeight='normal'>{` Điểm`}</Text>
      </Row>
      <Row style={{ marginTop: 4 }}>
        <Text fontWeight='normal' color='#2b5eec'>
          Quy định mỗi ngày đạt {daily_score} điểm sẽ
          hưởng {total === 0 ? 0 : 100}% lương
        </Text>
      </Row>
      <Row style={{ marginTop: 4, marginBottom: 4 }}>
        <Text fontWeight='normal' color='#2b5eec'>
          KPIs: ({total} : {daily_score}) =
        </Text>
        <Text color='#f90909'>{` ${isNaN(_kpi) ? '' : _kpi}`}</Text>
      </Row>
      <Row style={{flex: 1}}>
        <Text fontWeight='normal' color='#2b5eec'>
          Hôm nay bạn được hưởng:
        </Text>
        <Text color='#f90909'>{` ${(isNaN(result) || daily_score === 0 ) ? '' : result }% `}</Text>
        <Text fontWeight='normal' color='#2b5eec'>lương KPIs</Text>
      </Row>
    </Wrapper>
  )
}
