import React from 'react'
import { View, Icon } from 'native-base'
import colors from '../../themes/colors'

export default ({ backgroundColor }) => (
  <View
    style={{
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor,
      width: 40,
      height: 40,
      borderRadius: 20
    }}
  >
    <Icon
      type='Feather'
      name='bell'
      style={{ color: colors.white, fontSize: 20 }}
    />
  </View>
)
