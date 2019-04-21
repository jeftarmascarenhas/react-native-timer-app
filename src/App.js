/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, StatusBar, Picker, Platform, Vibration } from "react-native";
import Sound from 'react-native-sound'

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
      this.stopSignal()
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

  stopSignal = () => {
    const DURATION = 1000
    Vibration.vibrate(DURATION)
    this.playSound()
  }

  playSound = () => {
    Sound.setCategory('Playback')
    const whoosh = new Sound(require('./assets/audio/advertising.mp3'), (error) => {
      if (error) {
        console.log('Failed sound: ', error)
      }
      console.log(`Duraction Secounds: ${whoosh.getDuration()} number of channels: ${whoosh.getNumberOfChannels()}`)
      whoosh.play((success) => {
        if(success) {
          console.log('Successfully finished playing')
        } else {
          console.log('Playback failed decoding error')
        }
      })
    })
    whoosh.setVolume(0.5)
    whoosh.setPan(1)
    whoosh.setNumberOfLoops(-1)
  }

  renderPickers = () => {
    const { selectedMinutes, selectedSeconds } = this.state
    return (
      <View style={styles.pickerContainer}>
        <Picker
        style={styles.picker}
        selectedValue={selectedMinutes}
        onValueChange={itemValue => {
          this.setState({ selectedMinutes: itemValue })
        }}
        mode="dropdown"
        itemStyle={styles.pickerItem}
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
        selectedValue={selectedSeconds}
        onValueChange={itemValue => {
          this.setState({ selectedSeconds: itemValue })
        }}
        mode="dropdown"
        itemStyle={styles.pickerItem}
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
