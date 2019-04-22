import { StyleSheet } from 'react-native'

import { colors } from './theme'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.bgDefault,
  },
  timerText: {
    color: colors.white,
    fontSize: 90,
  },
})

export default styles
