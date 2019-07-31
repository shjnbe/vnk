import React from 'react'

import { Icon, Text } from 'native-base'
import { StyleSheet } from 'react-native'
// import { withNavigation } from 'react-navigation'
import styled from 'styled-components/native'
import colors from '../../../themes/colors'

const SettingGeneral = styled.View`
  height: 40
  backgroundColor: ${colors.offWhite}
  flexDirection: row
  alignItems: center
  justifyContent: flex-start
  paddingLeft: 16
`

const Image = styled.Image.attrs({
  resizeMode: 'contain'
})`
  width: 28
  height: 28
`

export default props => (
  <SettingGeneral style={styles.shadowHeader}>
    {props.name && <Icon name={props.name} />}
    {props.source && <Image source={props.source} />}
    <Text style={[styles.textGeneral, { flex: 1 }]}>{props.title}</Text>
    {props.right && props.right}
  </SettingGeneral>
)

const styles = StyleSheet.create({
  shadowHeader: {
    shadowColor: 'rgba(0, 0, 0, 0.11)',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 1,
    shadowOpacity: 1
  },
  headerCenter: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  textGeneral: {
    marginLeft: 16,
    fontSize: 14,
    fontWeight: '900',
    fontStyle: 'normal',
    letterSpacing: 0,
    color: colors.greyishBrown
  }
})
