import React from 'react'
import styled from 'styled-components/native'
import { sumBy } from 'lodash'
import scores from 'constants/score-kpi'

const Wrapper = styled.View`
flexDirection: row justifyContent: flex-start alignItems: center
marginVertical: 8
marginHorizontal: 16`
const PointView = styled.View`
  flex: 1
  flexDirection: row justifyContent: flex-start alignItems: center
`

const Image = styled.Image.attrs({
  resizeMode: 'contain'
})`
  width: 33
  height: 33
`

const TextBase = styled.Text`
  fontFamily: Helvetica
  fontStyle: normal
`

const Title = TextBase.extend`
fontSize: 14
paddingLeft: 16
color: ${props => props.color || '#232326'}
flex: 2
`

const ANumber = TextBase.extend`
  fontWeight: 600
  color: rgb(249, 9, 9)
`
const AUnit = TextBase.extend`
  color: rgb(65, 117, 5);
`

export default props => {
  return (
    <Wrapper>
      <Image source={props.icon} />
      <Title style={{ paddingRight: 3 }}>{props.title}</Title>
      <ANumber>{props.score}</ANumber>
      <AUnit> Điểm</AUnit>
    </Wrapper>
  )
}
