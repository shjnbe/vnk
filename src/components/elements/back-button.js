import React from 'react'
import { withNavigation } from 'react-navigation'
import { Icon } from 'native-base'

export default withNavigation(props => (
  <Icon
    name='chevron-left'
    type='Feather'
    style={[props.style , { color: '#666b65' }]}
    onPress={() => props.navigation.goBack()}
  />
))
