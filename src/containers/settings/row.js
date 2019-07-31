import React from 'react'
import { Card, Icon } from 'native-base'
import styled from 'styled-components/native'
import colors from '../../themes/colors'

const ImageView = styled.Image.attrs({
  source: require('images/settings/sales-success.png')
})`
  height: 88
  width: 105
`
const TimeView = styled.View` flexDirection: row marginLeft: 16`
const TimeRowView = styled.View`
  flexDirection: row
  justifyContent: center
  alignItems: center
  marginRight: 16
  marginBottom: 12
`

const ViewLeft = styled.View`
  justifycontent: space-between;
`

const Title = styled.Text`
  fontSize: 14
  fontWeight: bold
  fontStyle: normal
  letterSpacing: 0
  color: ${colors.black}
  marginTop: 12
  marginBottom: 12
  marginLeft: 12
  marginRight: 12
`

const ButtonTitle = styled.Text`
  opacity: ${props => props.opacity || 1}
  fontSize: ${props => props.fontSize || 12}
  fontWeight: ${props => props.fontWeight || 'normal'}
  fontStyle: normal
  letterSpacing: 0
  color: ${props => props.color || colors.electricBlue}
`

const Touchable = styled.TouchableOpacity``

export default class RowItem extends React.Component {
  render () {
    return (
      <Touchable onPress={this.props.onPress}>
        <Card style={[{ flexDirection: 'row' }, this.props.style]}>
          <ImageView />
          <ViewLeft>
            <Title>10 kỹ năng bán hàng cần biết</Title>
            <TimeView>
              <TimeRowView>
                <Icon
                  name='eye'
                  style={{
                    color: colors.electricBlue,
                    marginRight: 4,
                    opacity: 0.7,
                    fontSize: 12
                  }}
                />
                <ButtonTitle opacity={0.7} fontWeight='900'>
                  Xem
                </ButtonTitle>
              </TimeRowView>
              <TimeRowView>
                <Icon
                  name='calendar'
                  style={{
                    color: colors.black,
                    opacity: 0.7,
                    marginRight: 4,
                    fontSize: 12
                  }}
                />
                <ButtonTitle opacity={0.7} color={colors.black}>
                  22/1/2019
                </ButtonTitle>
              </TimeRowView>
            </TimeView>
          </ViewLeft>
        </Card>
      </Touchable>
    )
  }
}
