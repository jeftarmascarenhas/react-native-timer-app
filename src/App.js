/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, StatusBar, Picker, Platform } from "react-native";

const screen = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#07121B"
  },
  button: {
    borderWidth: 10,
    borderColor: "#B9AAFF",
    width: screen.width / 2,
    height: screen.width / 2,
    borderRadius: screen.width / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 45,
    color: '#89AAFF',
  },
  buttonStop: {
    borderColor: '#FF851B'
  },
  buttonStopText: {
    color: "#FF851B"
  },
  timerText: {
    color: '#fff',
    fontSize: 90,
  },
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  picker: {
    width: 50,
    ...Platform.select({
      android: {
        color: '#fff',
        backgroundColor: '#07121B',
        marginLeft: 10,
      }
    })
  },
  pickerItem: {
    color: '#fff',
    fontSize: 18,
  }
});

const formatNumber = (number) => `0${number}`.slice(-2)

const getRemaining = (time) => {
  const minutes = Math.floor(time / 60)
  const seconds = time - minutes * 60
  return { minutes: formatNumber(minutes), seconds: formatNumber(seconds) }
}

const createArray = (length) => {
  const arr = []
  let i = 0
  while(i < length) {
    arr.push(i.toString())
    i += 1
  }
  return arr
}

const AVAILABLE_MINUTES = createArray(10)
const AVAILABLE_SECONDS = createArray(60)

export default class App extends Component {
  state = {
    remainingSecounds: 5,
    isRunnig: false,
    selectedMinutes: '0',
    selectedSeconds: '5'
  }

  interval = null

  componentDidUpdate(prevProps, prevState) {
    const { remainingSecounds } = this.state
    const { remainingSecounds: remainingSecoundsPrev } = prevState
    if (remainingSecounds === 0  && remainingSecoundsPrev !== 0 ) {
      this.stop()
    }
  }
  

  componentWillMount() {
    if(this.interval) {
      clearInterval(this.interval)
    }
  }

  start = () => {
    this.setState(state => ({
      remainingSecounds:
        parseInt(state.selectedMinutes, 10) * 60 +
        parseInt(state.selectedSeconds, 10),
      isRunnig: true,
    }))
    this.interval = setInterval(() => {
      this.setState(state => ({
        remainingSecounds: state.remainingSecounds - 1,
      }))
    }, 1000)
  }

  stop = () => {
    clearInterval(this.interval)
    this.interval = null
    this.setState({ remainingSecounds: 5, isRunnig: false })
  }

  renderPickers = () => {
    const { selectedMinutes, selectedSeconds } = this.state
    return (
      <View style={styles.pickerContainer}>
        <Picker
        style={styles.picker}
        itemStyle={styles.pickerItem}
        selectedValue={selectedMinutes}
        onValueChange={itemValue => {
          this.setState({ selectedMinutes: itemValue })
        }}
        mode="dropdown"
      >
        {
          AVAILABLE_MINUTES.map(value => (
            <Picker.Item key={value} label={value} value={value} />
          ))
        }
      </Picker>
      <Text style={styles.pickerItem}>Minutos</Text>
      <Picker
        style={styles.picker}
        itemStyle={styles.pickerItem}
        selectedValue={selectedSeconds}
        onValueChange={itemValue => {
          this.setState({ selectedSeconds: itemValue })
        }}
        mode="dropdown"
      >
        {
          AVAILABLE_SECONDS.map(value => (
            <Picker.Item key={value} label={value} value={value} />
          ))
        }
      </Picker>
      <Text style={styles.pickerItem}>Segundos</Text>
      </View>
    )
  }

  render() {
    const { remainingSecounds, isRunnig } = this.state
    const { minutes, seconds } = getRemaining(remainingSecounds)
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        {
          isRunnig ? (
            <Text style={styles.timerText}>{`${minutes}:${seconds}`}</Text>
          ) : this.renderPickers()
        }
        {!isRunnig ?(<TouchableOpacity style={styles.button} onPress={this.start}>
          <Text style={styles.buttonText}>Start</Text>
        </TouchableOpacity>)
        :
        (<TouchableOpacity style={[styles.button, styles.buttonStop]} onPress={this.stop}>
          <Text style={[styles.buttonText, styles.buttonStopText]}>Stop</Text>
        </TouchableOpacity>)
      }
      </View>
    );
  }
}
