import { StyleSheet } from 'react-native'
import colors from '../../../themes/colors'

export default StyleSheet.create({
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
  },
  textSettingList: {
    fontFamily: 'Helvetica',
    fontSize: 18,
    fontWeight: '900',
    letterSpacing: 0,
    color: '#0445f8',
    paddingLeft: 16,
    paddingTop: 12,
    paddingBottom: 12
  }
})
