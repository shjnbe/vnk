import React from 'react'
import styled from 'styled-components/native'
import { CachedImage } from 'react-native-cached-image'
import colors from 'themes/colors'

import { Icon, View, Card, Row, Col, Title, Text } from 'native-base'
// import ModalDialog from 'components/elements/modal-dialog';

// const ArImage = styled.Image.attrs({
//   source: require('images/company/maxresdefault.png'),
//   resizeMode: 'stretch'
// })`
//   width: 90
//   height: 90
//   marginLeft: 2
// `

const Touchable = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8
})``

const TouchableOut = styled.TouchableWithoutFeedback.attrs({
  activeOpacity: 0.8
})``

const ImageFollow = styled.Image`
width: 37
height: 37
`

const TextFollow = styled.Text`
  fontFamily: Helvetica
  fontSize: 14
  letterSpacing: 0
  textAlign: center
  paddingTop: 4
  color: ${props => props.color || '#455a64'}
`

const FollowView = ({ isFollow, color, style, onFollowChange }) => (
  <TouchableOut onPress={onFollowChange}>
    <View style={[{ justifyContent: 'center', alignItems: 'center' }, style]}>
      <ImageFollow source={isFollow ? require('images/company/follow.png') : require('images/company/unfollow.png')} />
      <TextFollow color={color}>{isFollow ? 'Bỏ TD' : 'Theo dõi'}</TextFollow>
    </View>
  </TouchableOut>
)

const ArContent = styled.View`
  flex: 1
  justifyContent: space-between
  paddingLeft: 8
  paddingTop: 8
  paddingRight: 8
  paddingBottom: 8
`

const ArTitle = styled.Text`
fontSize: 14
color: #2a2d23
flex: 1
`

const IconText = ({icon, title, style}) => (
  <View style={[{ flexDirection: 'row'}, style || {} ]}>
    <Icon name={icon} type='Feather' style={{ fontSize: 15, marginRight: 2 }} />
    <Text numberOfLines={2} style={{ opacity: 0.5, fontSize: 12, color: "#000000", paddingRight: 4 }}>{title}</Text>
  </View>
)

export default class CompanyRow extends React.PureComponent {

  render () {
    return (
      <Touchable onPress={() => this.props.onPress(this.props.company)}>
        <Card style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
          <CachedImage source={this.props.image
            ? { uri: this.props.image }
            : require('images/logo.png')}
            style={{
              width: 90,
              height: 90,
              marginLeft: 2
            }}
          />
          <ArContent>
            <Row>
              <ArTitle>{this.props.name}</ArTitle>
              <FollowView onFollowChange={() => this.props.onFollow(this.props.company)} isFollow={this.props.isFollow}/>
            </Row>
            <Row style={{ alignItems: 'flex-end' }}>
              <IconText style={{ flex: 1 }} icon='map-pin' title={this.props.office_address} />
              <IconText style={{ marginLeft: 4 }} icon='calendar' title={this.props.date} />
            </Row>
          </ArContent>
        </Card>
      </Touchable>
    )
  }
}
