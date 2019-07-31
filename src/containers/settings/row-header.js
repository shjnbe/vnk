import React from 'react'
import { Card, Icon } from 'native-base'
import styled from 'styled-components/native'
import colors from '../../themes/colors'

const ImageView = styled.Image.attrs({
  source: require('images/settings/img-skill.png'),
  resizeMode: 'stretch'
})`
  height: 120
  width: null
  flex: 1
`
const TimeView = styled.View` flexDirection: row marginLeft: 16 marginBottom: 12`

const TimeRowView = styled.View`
  flexDirection: row
  justifyContent: center
  alignItems: center
  marginRight: 16
`
const Title = styled.Text`
  fontSize: 18
  fontWeight: bold
  fontStyle: normal
  letterSpacing: 0
  color: #000000
  marginTop: 12
  marginBottom: 12
  marginLeft: 16
`

const ButtonTitle = styled.Text`
  opacity: ${props => props.opacity || 1}
  fontSize: ${props => props.fontSize || 12}
  fontWeight: ${props => props.fontWeight || 'normal'}
  fontStyle: normal
  letterSpacing: 0
  color: ${props => props.color || colors.electricBlue}
`

export default class RowHeader extends React.Component {
  render () {
    return (
      <Card style={[this.props.style]}>
        <ImageView />
        <Title>10 kỹ năng bán hàng cần biết</Title>
        <TimeView>
          <TimeRowView>
            <Icon
              name='eye'
              style={{
                color: colors.electricBlue,
                marginRight: 4,
                fontSize: 16
              }}
            />
            <ButtonTitle fontSize={16} opacity={0.7} fontWeight='900'>
              Xem thêm
            </ButtonTitle>
          </TimeRowView>
          <TimeRowView>
            <Icon
              name='calendar'
              style={{
                color: colors.black,
                opacity: 0.7,
                marginRight: 4,
                fontSize: 16
              }}
            />
            <ButtonTitle opacity={0.7} fontSize={12} color={colors.black}>
              22/1/2019
            </ButtonTitle>
          </TimeRowView>
        </TimeView>
      </Card>
    )
  }
}
