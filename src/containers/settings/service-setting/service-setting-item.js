import React from 'react'
import styled from 'styled-components/native'
import colors from '../../../themes/colors'

const Wrapper = styled.View`
  flexDirection: row
  justifyContent: flex-start
  alignItems: center
  paddingTop: 12
  paddingRight: 12
`

const Image = styled.Image.attrs({
  resizeMode: 'contain',
  source: require('../../../images/logo.png')
})`
  width: 60
  height: 60
`

const Right = styled.View` flex: 1 paddingLeft: 8`

const Title = styled.Text`
fontSize: 14
fontWeight: bold
letterSpacing: 0
color: ${props => (props.active ? '#0aa90b' : '#232326')}
`

const Box = styled.View`
  marginTop: 8
  flexDirection: row
`

const Price = styled.Text`
backgroundColor: ${props => (props.active ? '#e2fac6' : colors.white)}
borderWidth: 1
fontSize: 14
borderColor: #2196f3
paddingTop: 4
paddingBottom: 4
paddingLeft: 16
paddingRight: 16
`
const PerLabel = styled.Text`
marginLeft: 1
paddingTop: 4
paddingBottom: 4
paddingLeft: 16
paddingRight: 16
backgroundColor: ${props => (props.active ? '#e2fac6' : colors.white)}
borderWidth: 1
fontSize: 14
borderColor: #2196f3
`

export default props => {
  return (
    <Wrapper>
      <Image />
      <Right>
        <Title active={props.active}>{props.title}</Title>
        <Box>
          <Price active={props.active}>{props.price_label}</Price>
          <PerLabel active={props.active}>
            {props.perLabel} {`▼`}
          </PerLabel>
        </Box>
      </Right>
    </Wrapper>
  )
}
