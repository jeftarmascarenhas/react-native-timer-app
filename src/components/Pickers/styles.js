import { StyleSheet, Platform } from 'react-native'

const styles = StyleSheet.create({
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  picker: {
    marginVertical: 10,
    width: 80,
    ...Platform.select({
      android: {
        color: '#fff',
        backgroundColor: '#07121B',
        marginLeft: 10,
      },
    })
  },
  pickerItem: {
    color: 'white',
    fontSize: 16,
  }
})

export default styles