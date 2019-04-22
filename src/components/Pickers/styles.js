import { StyleSheet, Platform } from 'react-native'

import { colors } from '../../theme'

const styles = StyleSheet.create({
  picker: {
    marginVertical: 10,
    width: 80,
    ...Platform.select({
      android: {
        color: colors.white,
        backgroundColor: colors.bgDefault,
        marginLeft: 10,
      },
    }),
  },
  pickerContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  pickerItem: {
    color: colors.white,
    fontSize: 16,
  },
})

export default styles
