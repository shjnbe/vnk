import React from 'react'
import { View, Label, Icon } from 'native-base'

export default ({ title }) => (
  <View
    style={{
      fontFamily: 'Helvetica',
      flexDirection: 'row',
      alignItems: 'center',
      marginLeft: 16,
      marginRight: 4,
      marginTop: 16,
      marginBottom: 6
    }}
  >
    <Label
      style={{
        flex: 1,
        fontSize: 14,
        fontWeight: 'bold',
        fontStyle: 'normal',
        color: '#333333'
      }}
    >
      {title}
    </Label>
    <Icon name='chevron-right' type='Feather' style={{ fontSize: 20 }} />
  </View>
)
