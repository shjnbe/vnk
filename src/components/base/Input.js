import React from 'react'
import styled from 'styled-components/native'

const TextInput = styled.TextInput`
fontSize: 16
fontWeight: normal
fontStyle: normal
letterSpacing: 1
color: #acacac
`

export default class Input extends React.PureComponent {
  render () {
    return <TextInput {...this.props} />
  }
}
