import React from 'react'
import styled from 'styled-components/native'
import colors from '../../../themes/colors'

import { Card, CardItem, Thumbnail, Icon } from 'native-base'

const ContainerView = styled.View`
  flexDirection: row
  marginLeft: 16
  marginRight: 16
  marginTop: 16
`

const Text = styled.Text`
  fontSize: 14
  fontWeight: bold
  opacity: 0.8
  color: ${colors.black}
`

const styleAddIcon = {
  position: 'absolute',
  bottom: -20,
  justifyContent: 'flex-start',
  alignItems: 'center',
  right: 0,
  color: colors.darkSkyBlue,
  fontSize: 35,
  zIndex: 9999
}

const ItemView = ({ title, icon, hasAdd, onPressAdd }) => (
  <Card style={{ flex: 1, margin: 8 }}>
    <CardItem
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 16,
        backgroundColor: colors.white
      }}
    >
      <Thumbnail circular large source={icon} />
      {hasAdd && (
        <Icon onPress={onPressAdd} name='add-circle' style={styleAddIcon} />
      )}
    </CardItem>
    <CardItem
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
        marginTop: 16
      }}
    >
      <Text>{title}</Text>
    </CardItem>
  </Card>
)

export default class HeaderView extends React.PureComponent {
  handleAdd = e => {}

  render () {
    return (
      <ContainerView>
        <ItemView
          title='Vinhomes Hot'
          icon={require('images/home/p-1.png')}
          hasAdd
          onPressAdd={this.handleAdd}
        />
        <ItemView title='Dự án 2 Hot' icon={require('images/home/p-2.png')} />
        <ItemView title='Dự án 3 Hot' icon={require('images/home/p-3.png')} />
      </ContainerView>
    )
  }
}
