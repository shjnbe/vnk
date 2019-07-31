import React from 'react'
import styled from 'styled-components/native'
import colors from '../../../themes/colors'
import Touchable from 'components/base/Touchable'
// import { Icon } from 'native-base'
import { get, upperCase } from 'lodash'

const TabSelector = styled.View`
  height: 3
  marginTop: 2
  width: ${props => props.width || 24}
  backgroundColor: ${props => props.backgroundColor || '#ffffff'}
`

const IconView = styled.Image.attrs({
  resizeMode: 'contain' //
})`
  alignSelf: center
  width: 32
  height: 32
`

const TitleTab = styled.Text`
  fontFamily: Helvetica
  fontSize: 12
  fontWeight: normal
  fontStyle: normal
  lineHeight: 11
  paddingTop: 4
  letterSpacing: 0
  textAlign: center
  color: #444444
`

export default class TabItem extends React.Component {
  render () {
    const { icon, title, isTab, navigateKey } = get(this.props, 'item', {})
    return (
      <Touchable
        style={{ width: this.props.width || 24, alignItems: 'center' }}
        onPress={() =>
          isTab
            ? this.props.onTabSelected(this.props.index)
            : this.props.handleNavigate(navigateKey)
        }
      >
        <IconView
          source={icon}
        />
        <TitleTab numberOfLines={1}>{title}</TitleTab>
        <TabSelector
          width={this.props.width}
          backgroundColor={this.props.focus && '#618aff'}
        />
      </Touchable>
    )
  }
}
