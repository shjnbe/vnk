import React from 'react'
import styled from 'styled-components/native'
import { Icon } from 'native-base'
import { isEqual } from 'lodash'

const Wrapper = styled.View`
height: 56
paddingLeft: 16
paddingRight: 8
flexDirection: row justifyContent: flex-start alignItems: center
borderBottomColor: #e1e8ee
borderBottomWidth: 1
`

const Title = styled.Text`
fontSize: 14
color: ${props => props.color || '#232326'}
paddingLeft: 12
flex: 1
`

const Thumbnail = styled.Image.attrs({ resizeMode: 'contain' })`
width: 30
height: 30
`

const Touchable = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8
})``

export default class ItemSetting extends React.Component {
  componentWillUpdate (nextProps) {
    return isEqual(nextProps, this.props)
  }

  render () {
    return (
      <Touchable onPress={this.props.onPress}>
        <Wrapper>
          <Thumbnail source={this.props.source} />
          <Title color={this.props.color}>{this.props.title}</Title>
          <Icon
            name='chevron-right'
            type='Feather'
            style={{ color: '#666b65' }}
          />
        </Wrapper>
      </Touchable>
    )
  }
}
