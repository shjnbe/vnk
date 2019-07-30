import React from 'react'
import styled from 'styled-components/native'
import { Thumbnail } from 'native-base'

const Wrapper = styled.View`
flexDirection: row
justifyContent: flex-start
alignItems: center
marginTop: 16
marginBottom: 16
marginLeft: 16`

// const Thumbnail = styled.Image.attrs({
//   resizeMode: 'contain'
// })`
//   width: 74
//   height: 74
//   borderRadius: 37
//   backgroundColor: #ccc
// `

const Name = styled.Text`
fontSize: 13
fontWeight: bold
letterSpacing: 3.51
color: #333333
marginBottom: 4
`
const SubName = styled.Text`
marginBottom: 4
fontSize: 12
letterSpacing: 3.24
color: #333333
`

const Right = styled.View`
  paddingLeft: 28
  paddingRight: 0
`

export default props => {
  return (
    <Wrapper>
      <Thumbnail
        large
        circular
        source={
          props.avatar ? { uri: props.avatar } : require('images/globe/noavatar.png')
        }
      />
      <Right>
        <Name>{props.full_name}</Name>
        <SubName>{props.address}</SubName>
        <SubName>{props.position}</SubName>
      </Right>
    </Wrapper>
  )
}
