import React from 'react'
import styled from 'styled-components/native'
import colors from '../../../themes/colors'
import Touchable from '../../../components/base/Touchable'
import { Icon, View, Card, Thumbnail } from 'native-base'
import moment from 'moment'
import FollowView from '../../../components/elements/follow'
import { CachedImage } from 'react-native-cached-image'
import { has } from 'lodash'
const ArContent = styled.View` justifyContent: space-between flex: 1 `

const ArTitle = styled.Text`
fontFamily: Helvetica
fontSize: 14
fontWeight: 900
marginTop: 8
fontStyle: normal
letterSpacing: 0
color: #000000
flex: 1
`

const ArTimeView = styled.View`
  flexDirection: row
  marginLeft: 8
  marginRight: 8
  marginBottom: 8
`

const ArLocation = styled.Text`
  opacity: 0.95
  marginRight: 8
  maxWidth: 96
  fontSize: 12
  fontWeight: bold
  fontStyle: normal
  letterSpacing: 0
  color: ${colors.black}
`

const ArTime = styled.Text`
opacity: 0.8
marginRight: 8
marginLeft: 4
fontSize: 12
letterSpacing: 0
color: ${colors.black}
flex: 1
`

const TextUsd = styled.Text`
  fontFamily: Helvetica
  fontSize: 14
  fontStyle: normal
  letterSpacing: 0
  textAlign: right
  color: #ee5a55
  fontWeight: bold
  `

export default class ProRow extends React.Component {

  render () {
    const isFollow = has(this.props, 'parent_project_id')
    return (
      <Touchable onPress={() => this.props.onPress(this.props)}>
        <Card style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
          <CachedImage source={this.props.image
              ? { uri: this.props.image }
              : require('../../../images/logo.png')}
              style={{
                width: 90,
                height: 90,
                marginLeft: 2
              }}
            />
          <ArContent>
            <View style={{ flexDirection: 'row', margin: 8 }}>
              <ArTitle>{this.props.name}</ArTitle>
              <FollowView
                onFollowChange={() => this.props.onChangeFollow(!isFollow, this.props)}
                color={colors.black}
                style={{ marginRight: 8 }}
                isFollow={isFollow}
              />
            </View>
            <ArTimeView>
              <Icon
                name='map-pin'
                type='Feather'
                style={{
                  opacity: 0.95,
                  color: colors.black,
                  marginRight: 4,
                  fontSize: 12
                }}
              />
              <ArLocation numberOfLines={2}>{this.props.address}</ArLocation>
              <Icon
                name='calendar'
                type='Feather'
                style={{ opacity: 0.8, color: colors.black, fontSize: 12 }}
              />
              <ArTime numberOfLines={1}>
                {this.props.last_modified &&
                  moment(this.props.last_modified).format('DD/MM/YY')}
              </ArTime>
              <TextUsd numberOfLines={1}>{`$${this.props.cost}m (USD)`}</TextUsd>
            </ArTimeView>
          </ArContent>
        </Card>
      </Touchable>
    )
  }
}
