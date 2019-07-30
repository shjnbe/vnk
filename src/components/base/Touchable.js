import React from 'react'
import styled from 'styled-components/native'

const TouchableOpacity = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8
})``

export default class Touchable extends React.PureComponent {
  render () {
    return <TouchableOpacity activeOpacity={0.8} {...this.props} />
  }
}
