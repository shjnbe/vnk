import React from 'react'
import { StyleSheet } from 'react-native'
import styled from 'styled-components/native'
import colors from '../../../themes/colors'
import { Icon } from 'native-base'

const Oval = styled.View`
width: ${props => props.size || 38}
height: ${props => props.size || 38}
borderRadius: ${props => (props.size || 38) / 2}
backgroundColor: ${props => props.bgColor || colors.appleGreen}
justifyContent: center
alignItems: center
`

const Text = styled.Text`
  color: ${props => props.color || colors.white}
  fontSize: ${props => props.fontSize || 14}
  fontWeight: bold
  textAlign: center
`

export const OvalView = props => (
  <Oval bgColor={props.bgColor} size={props.size}>
    {props.children}
  </Oval>
)

export const OvalIconView = props => (
  <OvalView bgColor={props.bgColor} size={props.size}>
    <Icon
      name={props.name}
      type={props.type || 'Ionicons'}
      style={{ color: props.color || colors.white }}
    />
  </OvalView>
)

export const OvalTextView = props => (
  <OvalView bgColor={props.bgColor} size={props.size}>
    <Text color={props.color} fontSize={props.fontSize}>
      {props.label}
    </Text>
  </OvalView>
)

export const RowBase = styled.View`
  flexDirection: row
  justifyContent: center
  alignItems: center
`
export const Row = RowBase.extend`
  marginTop: 16
  marginLeft: 16
  marginRight: 16
`

export const Line = styled.View`
flex: 1
height: 1
backgroundColor: rgba(38, 50, 56, 0.12)`

export const RowDes = styled.View`
  flexDirection: row
  alignItems: center
  marginTop: 8
  justifyContent: space-between
`

export const DescriptionView = styled.Text`
width: 109
fontSize: 14
textAlign: ${props => props.textAlign || 'center'}
color: #455a64
paddingTop: 8
paddingRight: 8
`

export const DesFlex = styled.Text`
flex: 1
fontSize: 14
textAlign: ${props => props.textAlign || 'center'}
color: #455a64
paddingTop: 8
paddingRight: 8
`

export const NumberView = styled.Text`
fontSize: 18
fontWeight: bold
textAlign: center
color: #070707
paddingBottom: 2
`

export const styles = StyleSheet.create({
  button: {
    paddingLeft: 24,
    paddingRight: 24,
    borderRadius: 24,
    height: 44
  },
  buttonText: {
    fontSize: 18,
    paddingTop: 12,
    paddingBottom: 12,
    textAlign: 'center',
    backgroundColor: 'transparent',
    fontFamily: 'Helvetica',
    alignSelf: 'center',
    color: colors.white
  }
})
