import React from 'react'
import { Dimensions } from 'react-native'
import styled from 'styled-components/native'
import { Card, CardItem, Icon } from 'native-base'
import { get } from 'lodash'
import colors from '../../themes/colors'
import CircleButton from './circle-button'
const LocationView = styled.View`
  flexDirection: row
  justifyContent: flex-start alignItems: center
  width: ${props => props.size || 100}
`
const Title = styled.Text`
textAlign: center
color: #505052
fontSize: 10
alignSelf: center
marginTop: 6
`

const DateText = styled.Text`opacity: 0.36 fontSize: 14 color: ${colors.black}`
const ComText = styled.Text`color: #0644f0 fontWeight: 700 letterSpacing: 2.25`

const Location = styled.Text`textAlign: left fontSize: 11 marginLeft: 6`
const DateCView = styled.View` flexDirection: row marginRight: 4 marginTop: 6`
const DateCView1 = styled.View` flexDirection: column  marginLeft: 6`

const Image = styled.Image.attrs({
  resizeMode: 'stretch'
})` width: ${props => props.size} height: ${props => props.size}`

class CardBase extends React.Component {
  render () {
    return (
      <Card style={[{ flex: 1, minHeight: this.props.height || 154 }]}>
        {this.props.children}
      </Card>
    )
  }
}

class CardAddComponent extends React.Component {
  render () {
    return (
      <CardBase style={{ flex: 1 }}>
        <CardItem
          cardBody
          style={{
            backgroundColor: this.props.backgroundColor || 'rgb(255, 253, 233)',
            flexDirection: 'column',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Icon
            name='plus-circle'
            type='Feather'
            style={{ color: colors.darkSkyBlue, alignSelf: 'center' }}
          />
          <Title>{this.props.title}</Title>
        </CardItem>
      </CardBase>
    )
  }
}

class CardComponent extends React.Component {
  state = {
    size: Dimensions.get('window').width / 3 - 8
  }

  onLayout = e => {
    this.setState({
      size: get(
        e,
        'nativeEvent.layout.width',
        Dimensions.get('window').width / 3 - 8
      )
    })
  }

  render () {
    return (
      <CardBase height={(this.state.size * 3) / 2}>
        <CardItem>
          <DateCView1>
            <DateCView>
              <Icon
                name='calendar'
                style={{
                  fontSize: 14,
                  width: 14,
                  margin: 0,
                  color: colors.azure
                }}
              />
              <DateText>22/1/2018</DateText>
            </DateCView>
            <ComText>Hai Duong</ComText>
          </DateCView1>
          <Icon
            name='plus-circle'
            type='Feather'
            style={{ color: colors.darkSkyBlue, fontSize: 20 }}
          />
        </CardItem>
        <CardItem>
          <LocationView size={this.state.size}>
            <Icon
              name='map-pin'
              type='Feather'
              style={{ fontSize: 10, width: 10, margin: 2 }}
            />
            <Location>Hoan Kiem</Location>
          </LocationView>
        </CardItem>
        <CardItem
          onLayout={this.onLayout}
          cardBody
          style={{
            position: 'absolute',
            bottom: 0,
            backgroundColor: this.props.backgroundColor || '#fff',
            flexDirection: 'column',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Image size={this.state.size} source={this.props.source} />
          <CircleButton
            isShadow={true}
            size={80}
            title={this.props.title}
            color={this.props.color || colors.white}
            bgColor={this.props.buttonColor}
            style={{ position: 'absolute', bottom: 16, zIndex: 888 }}
          />
        </CardItem>
      </CardBase>
    )
  }
}

export { CardBase, CardAddComponent, CardComponent }
