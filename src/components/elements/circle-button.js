import React from 'react'
import styled from 'styled-components/native'
import colors from '../../themes/colors'

const Wrapper = styled.View`
  backgroundColor: ${props => props.bgColor || colors.white}
  width: ${props => props.size} height: ${props => props.size}
  borderRadius: ${props => props.size / 2}
  justifyContent: center
  alignItems : center
  shadowRadius: ${props => props.isShadow ? 4 : 0}
  shadowOpacity:  ${props => props.isShadow ? 0.6 : 0}
  borderWidth:  ${props => props.isShadow ? 0.3: 0}
`

const TextView = styled.Text`
  paddingLeft: 3
  paddingRight: 3
  fontSize: 12
  fontWeight: bold
  textAlign: center
  color: ${props => props.color || colors.black}
`

export default ({ title, style, bgColor, size, color, isShadow }) => (
  <Wrapper
    isShadow={isShadow}
    size={size}
    bgColor={bgColor}
    style={[
      {
        shadowOffset: {
          width: 0,
          height: 1
        }
      },
      style
    ]}
  >
    <TextView color={color}>{title}</TextView>
  </Wrapper>
)
