
import React from 'react'
import styled from 'styled-components/native'
import { Icon } from 'native-base';
import colors from 'themes/colors';

const Touchable = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8
})` 
  flexDirection: row
  justifyContent: center
  alignItems: center
  borderColor: ${colors.darkSkyBlue}
  borderWidth: 1
  height: 36
  flex: 1
  borderRadius: 3
`

const Text = styled.Text`
  flex: 1
  textAlign: center
`


export default props => (
  <Touchable style={props.style} onPress={props.onPress}>
    <Text>{props.title}</Text>
    <Icon name='chevron-down' type='Feather' style={{ fontSize: 17, paddingLeft: 8, paddingRight: 8 }} />
  </Touchable>
)