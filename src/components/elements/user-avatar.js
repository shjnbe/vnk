import React from 'react'
import { Image } from 'react-native'
import styled from 'styled-components/native'
import { isEmpty, forEach } from 'lodash'
// import { CachedImage } from 'react-native-cached-image'

const ContainerView = styled.View`
  height: ${props => props.size || 60}
  width: ${props => props.size || 60}
  borderRadius:  ${props => props.size * 0.5 || 30}
  backgroundColor: ${props => props.color || '#ccc'}
  alignItems: center
  justifyContent: center
`

const Title = styled.Text`
  fontSize: ${props => props.fontSize || 18}
  color: white
`

export default class UserAvatar extends React.Component {
  getFistText (s) {
    if (!isEmpty(s)) {
      const arr = s.split(' ')
      if (arr.length > 1) {
        let name = ''
        forEach(arr, item => {
          name += `${item.charAt(0) || ''}`.toUpperCase()
        })

        return name
      }
    }

    return s
  }

  render () {
    const { uri, name, size, color, fontSize, opacity } = this.props
    const val = size || 60
    const nameConvert = this.getFistText(name)
    let bgOpacity = 1

    if (opacity) {
      bgOpacity = opacity
    }

    return (
      <ContainerView size={val} color={color}>
        {uri ? (
          <Image
            style={{
              width: val,
              height: val,
              borderRadius: val * 0.5,
              opacity: bgOpacity
            }}
            resizeMode='contain'
            source={{ uri }}
          />
        ) : (
          <Title fontSize={fontSize}>{nameConvert || '?'}</Title>
        )}
      </ContainerView>
    )
  }
}
