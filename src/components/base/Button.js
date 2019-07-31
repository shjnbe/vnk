import React from 'react'
import styled from 'styled-components/native'
import { Button } from 'native-base'

import colors from '../../themes/colors'

const Title = styled.Text`
  color: ${props => props.color || colors.rouge};
`

export default class ButtonView extends React.PureComponent {
  render () {
    return (
      <Button
        onPress={this.props.onPress}
        transparent
        light
        style={[
          { marginTop: 16, marginBottom: 12, alignSelf: 'center' },
          this.props.style
        ]}
      >
        <Title style={[{ color: colors.greyishBrown }, this.props.styleText]}>
          {this.props.title}
        </Title>
      </Button>
    )
  }
}
