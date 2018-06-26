import React, { Component } from 'react'
import { Button, Text, StatusBar, StyleSheet, SafeAreaView, Platform} from 'react-native'
import { white } from '../utils/colors';

export default class Test extends Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor={white}
        />
        <Text style={[styles.paragraph, { color: '#fff' }]}>
          Light Screen
        </Text>
        <Button
          title="Next screen"
          onPress={() => this.props.navigation.navigate('Screen2')}
          color={Platform !== 'ios' ? "blue" : "#fff"}
        />
      </SafeAreaView>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    padding: 15,
  },
})