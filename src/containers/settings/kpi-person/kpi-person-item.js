import React from 'react'
import styled from 'styled-components/native'
import { Platform } from 'react-native'

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

const Input = styled.TextInput`
width: 40
color: #232326
height: ${Platform.OS === 'android' ? 40 : 30}
borderWidth: 1
borderColor: #2196f3
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
          <Title style={{ paddingRight: 2 }}>{props.title} (<ANumber style={{ paddingRight: 2 }}>{props.point}</ANumber> <AUnit>{props.unit}</AUnit>)
          </Title>
        </TitleView>
      <Input
          onChangeText={value => props.onChangeText(value, props.code)}
          value={props.total}
        />
        <SubTitle>{props.label}</SubTitle>
    </Wrapper>
  )
}
