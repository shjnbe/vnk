import React from 'react'
import styled from 'styled-components/native'

const Wrapper = styled.View`
flexDirection: row justifyContent: flex-start alignItems: center marginTop: 16
marginLeft: 16
marginRight: 16`

const Image = styled.Image.attrs({
  resizeMode: 'contain',
  source: require('images/settings/salary-kpi.png')
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
color: ${props => props.color || '#232326'}
`

const TitleView = styled.View`
  flex: 1
  paddingLeft: 8
  paddingRight: 8
  flexDirection: row
`

const SubTitle = TextBase.extend` paddingLeft: 8 color: #232326`

const ArValue = TextBase.extend`
width: 40
fontWeight: 600
color: #232326
textAlign: center
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
      <Image />
      <TitleView>
        <Title style={{ paddingRight: 2 }}>{props.title} (<ANumber style={{ paddingRight: 2 }}>{props.point}</ANumber>
          <AUnit> {props.unit}</AUnit>)
        </Title>
      </TitleView>
      <ArValue>{props.total}</ArValue>
      <SubTitle>{props.label}</SubTitle>
    </Wrapper>
  )
}
