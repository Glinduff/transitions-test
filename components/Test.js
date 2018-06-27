import React, { Component } from 'react'
import { Button, Text, StatusBar, StyleSheet, Platform} from 'react-native'
import { white, purple } from '../utils/colors';
import { SafeAreaView } from 'react-navigation'

export default class Test extends Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={[styles.paragraph, { color: '#fff' }]}>
          Light Screen
        </Text>
        <Button
          title="Next screen"
          onPress={() => this.props.navigation.navigate('Home')}
          color={Platform !== 'ios' ? "blue" : "#fff"}
        />
      </SafeAreaView>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: purple,
    padding: 15,
  },
})