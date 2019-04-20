/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, StatusBar } from "react-native";

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
  timerText: {
    color: '#fff',
    fontSize: 90,
  }
});

const formatNumber = (number) => `0${number}`.slice(-2)

const getRemaining = (time) => {
  const minutes = Math.floor(time / 60)
  const seconds = time - minutes * 60
  return { minutes: formatNumber(minutes), seconds: formatNumber(seconds) }
}

export default class App extends Component {
  state = {
    remainingSecounds: 5,
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
    this.interval = setInterval(() => {
      this.setState(state => ({
        remainingSecounds: state.remainingSecounds - 1
      }))
    }, 1000)
  }

  stop = () => {
    clearInterval(this.interval)
    this.interval = null
    this.setState({ remainingSecounds: 5 })
  }

  render() {
    const { remainingSecounds } = this.state
    const { minutes, seconds } = getRemaining(remainingSecounds)
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Text style={styles.timerText}>{`${minutes}:${seconds}`}</Text>
        <TouchableOpacity style={styles.button} onPress={this.start}>
          <Text style={styles.buttonText}>Start</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
