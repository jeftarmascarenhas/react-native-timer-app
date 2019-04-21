import { StyleSheet, Dimensions } from 'react-native'

import colors from './colors'

const screen = Dimensions.get('window')

const buttons = StyleSheet.create({
  primaryButton: {
    borderWidth: 10,
    borderColor: colors.primaryColor,
    width: screen.width / 2,
    height: screen.width / 2,
    borderRadius: screen.width / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  primaryButtonText: {
    fontSize: 45,
    color: colors.primaryColor,
  },
  secoundButton: {
    borderColor: colors.secoundColor,
  },
  secoundButtonText: {
    color: colors.secoundColor,
  },
})

export default buttons