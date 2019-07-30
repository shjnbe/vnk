import React from 'react'
import styled from 'styled-components/native'

import { View } from 'native-base'
// import ModalDialog from 'components/elements/modal-dialog';


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

const TouchableOut = styled.TouchableWithoutFeedback.attrs({
  activeOpacity: 0.8
})``

export default ({ isFollow, color, style, onFollowChange }) => (
  <TouchableOut onPress={onFollowChange}>
    <View style={[{ justifyContent: 'center', alignItems: 'center' }, style]}>
      <ImageFollow source={isFollow ? require('images/company/follow.png') : require('images/company/unfollow.png')} />
      <TextFollow color={color}>{isFollow ? 'Bỏ TD' : 'Theo dõi'}</TextFollow>
    </View>
  </TouchableOut>
)
