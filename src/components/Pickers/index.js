import React from 'react'
import { Text, View, Picker } from 'react-native'
import PropTypes from 'prop-types'

import styles from './styles'

const Pickers = ({
  selectedMinutes,
  selectedSeconds,
  changeMinutes,
  changeSeconds,
  minutes,
  seconds,
}) => (
  <View style={styles.pickerContainer}>
    <Picker
      style={styles.picker}
      selectedValue={selectedMinutes}
      onValueChange={changeMinutes}
      mode="dropdown"
      itemStyle={styles.pickerItem}
    >
      {
      minutes.map(value => (
        <Picker.Item key={value} label={value} value={value} />
      ))
    }
    </Picker>
    <Text style={styles.pickerItem}>Minutos</Text>
    <Picker
      style={styles.picker}
      selectedValue={selectedSeconds}
      onValueChange={changeSeconds}
      mode="dropdown"
      itemStyle={styles.pickerItem}
    >
      {
      seconds.map(value => (
        <Picker.Item key={value} label={value} value={value} />
      ))
    }
    </Picker>
    <Text style={styles.pickerItem}>Segundos</Text>
  </View>
)

Pickers.propTypes = {
  selectedMinutes: PropTypes.string.isRequired,
  selectedSeconds: PropTypes.string.isRequired,
  changeMinutes: PropTypes.func.isRequired,
  changeSeconds: PropTypes.func.isRequired,
  minutes: PropTypes.arrayOf([PropTypes.string]).isRequired,
  seconds: PropTypes.arrayOf([PropTypes.string]).isRequired,
}

export default Pickers
