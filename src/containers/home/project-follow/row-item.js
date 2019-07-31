import React from 'react'
import { Dimensions } from 'react-native'
import styled from 'styled-components/native'
import { Card, CardItem, Icon } from 'native-base'
import { get } from 'lodash'
import colors from '../../../themes/colors'
import CircleButton from 'components/elements/circle-button'
import moment from 'moment'
import { CachedImage } from 'react-native-cached-image'
import dataTask from '../../projects/data-task'
import Touchable from 'components/base/Touchable';

const LocationView = styled.View`
  flexDirection: row
  justifyContent: flex-start alignItems: center
  width: ${props => props.size || 100}
`

const DateText = styled.Text`opacity: 0.36 fontSize: 14 color: ${colors.black}`
const ComText = styled.Text`color: #0644f0 fontWeight: 700 letterSpacing: 2.25`

const Location = styled.Text`textAlign: left fontSize: 11 marginLeft: 6 flex: 1`
const DateCView = styled.View` flexDirection: row marginRight: 4 marginTop: 6`
const DateCView1 = styled.View` flexDirection: column  marginLeft: 6`

class CardBase extends React.Component {
  render () {
    return (
      <Card style={[{ marginLeft: 6, width: this.props.size, flex: 1, height: (this.props.size * 3) / 2 || 154}]}>
        {this.props.children}
      </Card>
    )
  }
}

export default class RowItemView extends React.Component {
  constructor(props) {
    super(props)
    this.statusTask = get(dataTask, `[${props.status_code}]`, {})
  }

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      this.statusTask = get(dataTask, `[${nextProps.status_code}]`, {})
    }
  }

  render () {
    return (
      <Touchable onPress={this.props.onPress}>
        <CardBase size={this.props.size}>
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
                <DateText>{moment(this.props.last_modified).format("DD/MM/YYYY")}</DateText>
              </DateCView>
              <ComText numberOfLines={1} ellipsizeMode={'tail'}>{this.props.name}</ComText>
            </DateCView1>
          </CardItem>
          <CardItem>
            <LocationView size={this.props.size}>
              <Icon
                name='map-pin'
                type='Feather'
                style={{ fontSize: 10, width: 10, margin: 2 }}
              />
              <Location numberOfLines={1} ellipsizeMode={'tail'}>{this.props.address}</Location>
            </LocationView>
          </CardItem>
          <CardItem
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
            <CachedImage
              resizeMode='stretch'
              style={{
                width: this.props.size,
                height: this.props.size
              }}
              source={
                this.props.image ? { uri: this.props.image } : require('images/logo.png')
              }
            />
            <CircleButton
              isShadow={true}
              size={80}
              title={this.props.status}
              color={this.statusTask.colorText}
              bgColor={this.statusTask.color}
              style={{ position: 'absolute', bottom: 16, zIndex: 888 }}
            />
          </CardItem>
        </CardBase>
      </Touchable>
    )
  }
}
