import React from 'react'
import styled from 'styled-components/native'
import { Input } from 'native-base'
import { Platform } from 'react-native'

const styleShadowInput = {
  shadowColor: 'rgba(33, 150, 243, 0.56)',
  shadowOffset: {
    width: 0,
    height: 0
  },
  shadowRadius: 2,
  shadowOpacity: 1
}

const Wrapper = styled.View`flexDirection: row justifyContent: flex-start alignItems: center marginTop: 16`

const Image = styled.Image.attrs({
  resizeMode: 'contain'
})`
  width: 33
  height: 33
`

const Title = styled.Text`
paddingLeft: 8
flex: 1
paddingRight: 8
fontSize: 14
color: #232326
`
const SubTitle = styled.Text` paddingLeft: 8 color: #417505`

export default props => {
  return (
    <Wrapper>
      <Image source={props.source} />
      <Title>{props.title}</Title>
      <Input
        value={props.value}
        style={{
          ...styleShadowInput,
          color: 'red',
          height: Platform.OS === 'android' ? 44 : 30,
          borderWidth: 1,
          borderColor: '#2196f3',
          textAlign: 'center'
        }}
        onChangeText={value => props.onChangeText(value, props.code)}
      />
      <SubTitle>{props.subTitle}</SubTitle>
    </Wrapper>
  )
}
