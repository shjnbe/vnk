import React from 'react'
import colors from '../../themes/colors'

import { View, Item, Input, Label } from 'native-base'

const InputLogin = ({
  label,
  placeholder,
  secureTextEntry,
  onChangeText,
  style,
  defaultValue
}) => (
  <View style={{ marginTop: 16 }}>
    <Label
      style={[
        {
          fontStyle: 'normal',
          letterSpacing: 0,
          fontFamily: 'Helvetica',
          marginLeft: 16,
          fontSize: 17,
          fontWeight: 'bold',
          color: colors.white,
          paddingBottom: 8
        },
        style
      ]}
    >
      {label}
    </Label>
    <Item paddingLeft={20} rounded style={{ backgroundColor: colors.white }}>
      <Input
        autoCapitalize='none'
        defaultValue={defaultValue}
        onChangeText={onChangeText}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        style={{ paddingLeft: 16 }}
      />
    </Item>
  </View>
)

export default InputLogin
