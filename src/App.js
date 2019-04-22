import React, { Component } from 'react'
import {
  Text, View, TouchableOpacity, StatusBar, Vibration,
} from 'react-native'
import Sound from 'react-native-sound'

import styles from './styles'
import {
  getRemaining,
  createArray,
} from './helpers'
import { buttons } from './theme'
import { Pickers } from './components'

const AVAILABLE_MINUTES = createArray(10)
const AVAILABLE_SECONDS = createArray(60)

export default class App extends Component {
  state = {
    remainingSecounds: 5,
    isRunnig: false,
    selectedMinutes: '0',
    selectedSeconds: '5',
  }

  interval = null

  componentWillMount() {
    if (this.interval) {
      clearInterval(this.interval)
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { remainingSecounds } = this.state
    const { remainingSecounds: remainingSecoundsPrev } = prevState
    if (remainingSecounds === 0 && remainingSecoundsPrev !== 0) {
      this.stopSignal()
      this.stop()
    }
  }

  start = () => {
    this.setState(state => ({
      remainingSecounds:
        parseInt(state.selectedMinutes, 10) * 60
        + parseInt(state.selectedSeconds, 10),
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
        if (success) {
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

  handleChangeMinutes = (itemValue) => {
    this.setState({ selectedMinutes: itemValue })
  }

  handleChangeSeconds = (itemValue) => {
    this.setState({ selectedSeconds: itemValue })
  }


  render() {
    const {
      remainingSecounds, isRunnig, selectedMinutes, selectedSeconds,
    } = this.state
    const { minutes, seconds } = getRemaining(remainingSecounds)
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        {
          isRunnig ? (
            <Text style={styles.timerText}>{`${minutes}:${seconds}`}</Text>
          )
            : (
              <Pickers
                selectedMinutes={selectedMinutes}
                selectedSeconds={selectedSeconds}
                changeMinutes={this.handleChangeMinutes}
                changeSeconds={this.handleChangeSeconds}
                minutes={AVAILABLE_MINUTES}
                seconds={AVAILABLE_SECONDS}
              />
            )
        }
        {!isRunnig ? (
          <TouchableOpacity style={buttons.primaryButton} onPress={this.start}>
            <Text style={buttons.primaryButtonText}>Start</Text>
          </TouchableOpacity>
        )
          : (
            <TouchableOpacity style={[buttons.primaryButton, buttons.secoundButton]} onPress={this.stop}>
              <Text style={[buttons.secoundButton, styles.secoundButtonText]}>Stop</Text>
            </TouchableOpacity>
          )
      }
      </View>
    )
  }
}
