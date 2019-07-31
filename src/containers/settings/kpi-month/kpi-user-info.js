import React from 'react'
import styled from 'styled-components/native'
import colors from '../../../themes/colors'
import moment from 'moment'
import { Thumbnail } from 'native-base'

const Wrapper = styled.View`
flexDirection: row
justifyContent: flex-start
alignItems: center
marginTop: 16
marginBottom: 8
marginLeft: 16`

// const Thumbnail = styled.Image.attrs({
//   resizeMode: 'contain'
// })`
//   width: 92
//   height: 92
//   borderRadius: 41
// `

const Right = styled.View``

const Item = styled.View`
  flexDirection: row
  marginTop: 0
`
const ItemLabel = styled.Text`
fontSize: 14
fontWeight: ${props => props.fontWeight || 900}
marginLeft: 16
color: ${props => props.color || colors.greyishBrown}
`
const ItemView = props => (
  <Item>
    <ItemLabel>{props.label}</ItemLabel>
    <ItemLabel color={props.color} fontWeight={props.fontWeight}>
      {props.value}
    </ItemLabel>
  </Item>
)

export default props => {
  return (
    <Wrapper>
      <Thumbnail
        large
        circular
        source={
          props.avatar
            ? { uri: props.avatar }
            : require('../../../images/globe/noavatar.png')
        }
      />
      <Right>
        <ItemView
          label='Mã NV:'
          value={props.id}
          color='#0445f8'
          fontWeight='bold'
        />
        <ItemView
          label='Họ tên:'
          value={props.full_name}
          color='#0445f8'
          fontWeight='bold'
        />
        <ItemView
          label='Chức vụ:'
          value={props.position}
          color='#0445f8'
          fontWeight='bold'
        />
        <ItemView
          label='Tháng lương:'
          value={moment().format('MM/YYYY')}
          color='#fe2828'
          fontWeight='bold'
        />
      </Right>
    </Wrapper>
  )
}
