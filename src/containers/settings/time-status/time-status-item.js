import React from 'react'
import styled from 'styled-components/native'
import { Icon, Button, Input, Item } from 'native-base'
import colors from '../../../themes/colors';

const Wrapper = styled.View`
  paddingTop: 8
  paddingBottom: 8
  flexDirection: row
  justifyContent: flex-start
  alignItems: center
  paddingLeft: 8
`

const Image = styled.Image.attrs({
  resizeMode: 'contain',
  source: require('images/settings/s-calendar.png')
})`
  width: 29
  height: 25
`

const Title = styled.Text`
  paddingLeft: 8
  fontSize: 14
  color: #232326
`

export default class TimeStatusItem extends React.PureComponent {
  render () {
    return (
      <Wrapper>
        <Image />
        <Title style={{ flex: 1 }}>{this.props.title}</Title>
        <Item regular style={{width: 60, height: 35, borderColor: colors.powderBlue}}>
          <Input value={`${this.props.value}`} keyboardType='number-pad' 
            style={{textAlign: 'center', paddingRight: 4}}
            onChangeText={value => this.props.onChangeText(value, this.props.code)}
          />
        </Item>
        <Title>Ngày</Title>
      </Wrapper>
    )
  }
}
