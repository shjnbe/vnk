import React from 'react'
import styled from 'styled-components/native'
import colors from '../../../themes/colors'
import Touchable from '../../../components/base/Touchable'
import { Icon, Card } from 'native-base'
import moment from 'moment'
import FollowView from '../../../components/elements/follow'
import { CachedImage } from 'react-native-cached-image'
import { has } from 'lodash'
 
const ArTitle = styled.Text`
fontFamily: Helvetica
fontSize: 18
marginTop: 8
marginBottom: 8
marginLeft: 16
marginRight: 16
fontWeight: 900
fontStyle: normal
letterSpacing: 0
color: #000000
`

const ArTimeView = styled.View`
  marginBottom: 16
  marginLeft: 16
  marginRight: 16
  flexDirection: row
`

const ArLocation = styled.Text`
  opacity: 0.95
  marginRight: 8
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
flex: 1
color: ${colors.black}
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

export default class ProHeader extends React.Component {

  render () {
    const isFollow = has(this.props, 'parent_project_id')
    return (
      <Touchable onPress={() => this.props.onPress(this.props)}>
        <Card>
          <CachedImage
            resizeMode='stretch'
            style={{
              width: null,
              height: 143
            }}
            source={
              this.props.image
                ? { uri: this.props.image }
                : require('../../../images/logo.png')
            }
          />
          <ArTitle>{this.props.name}</ArTitle>
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
            <ArLocation>{this.props.address}</ArLocation>
            <Icon
              name='calendar'
              type='Feather'
              style={{ opacity: 0.8, color: colors.black, fontSize: 12 }}
            />
            <ArTime>
              {this.props.last_modified &&
                moment(this.props.last_modified).format('DD/MM/YYYY')}
            </ArTime>
            <TextUsd>{this.props.cost}</TextUsd>
          </ArTimeView>
          <FollowView
            onFollowChange={() => this.props.onChangeFollow(!isFollow, this.props)}
            color={colors.white}
            style={{ position: 'absolute', top: 16, left: 8 }}
            isFollow={isFollow}
          />
        </Card>
      </Touchable>
    )
  }
}
