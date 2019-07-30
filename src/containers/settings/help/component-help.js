import React from 'react'
import styled from 'styled-components/native'

const Text = styled.Text`
fontSize: 15
fontFamily: Helvetica
paddingTop: 4
paddingBottom: 4
textAlign: justify
`

export const P = Text.extend`
  paddingLeft: 0
  textAlign: justify
`
export const P1 = Text.extend`
  paddingLeft: 12
  textAlign: justify
`

export const P1B = Text.extend`
  paddingLeft: 12
  textAlign: justify
  fontWeight: 600
`

export const ArH = Text.extend`
  textAlign: justify
  fontWeight: 600
`

export const ArImage = styled.Image.attrs({resizeMode: 'contain'})`
  width: null
  height: ${props => props.height || 200}
  marginTop: 4
  marginBottom: 4
`

const RowView = styled.View`
  flexDirection: row
  justifyContent: flex-start
  flex: 5
  height: ${props => props.height || 50}
  borderBottomWidth: 1
  borderBottomColor: #ccc
`
const ColCheck = styled.Text.attrs({numberOfLines: 2})`
  flex: 1 fontWeight: 600 textAlign: center
`
const ColTitle = styled.Text.attrs({numberOfLines: 2})`
fontSize: 13
flex: 2
fontFamily: Helvetica
textAlign: left
fontWeight: ${props => props.bold ? '600' : 'normal' }
`

const Cell = styled.View`
  flexDirection: row height: ${props => props.height || 50}
  flex: ${props => props.flex || 1}
  justifyContent: flex-start
  alignItems: center
  borderRightWidth: 1
  borderRightColor: #ccc
`

export const TableRow = ({bold, title, basic, standard}) => (
  <RowView>
    <Cell style={{
      paddingLeft: 2,
      paddingRight: 2,
      borderLeftWidth: 1,
      borderLeftColor: '#ccc'
    }} flex={2}><ColTitle bold={bold}>{title}</ColTitle></Cell>
    <Cell><ColCheck>{basic || `  `}</ColCheck></Cell>
    <Cell><ColCheck>{standard || `  `}</ColCheck></Cell>
    <Cell><ColCheck>{` v `}</ColCheck></Cell>
  </RowView>
)

export const RowHeader = ({bold, title, basic, standard}) => (
  <RowView style={{
      borderTopWidth: 1,
      borderBottomWidth: 1,
      borderColor: '#ddd',
      backgroundColor: '#fafafa'
    }} height={50}>
    <Cell style={{
      paddingLeft: 2,
      paddingRight: 2,
      borderLeftWidth: 1,
      borderLeftColor: '#ccc'
    }}  flex={2} height={50}><ColTitle bold adjustsFontSizeToFit numberOfLines={2}>{'Chức năng'}</ColTitle></Cell>
    <Cell height={50}><ColCheck adjustsFontSizeToFit numberOfLines={2}>Gói Basic</ColCheck></Cell>
    <Cell height={50}><ColCheck adjustsFontSizeToFit numberOfLines={2}>Gói Standard</ColCheck></Cell>
    <Cell height={50}><ColCheck adjustsFontSizeToFit numberOfLines={2}>Gói Enterprice</ColCheck></Cell>
  </RowView>
)