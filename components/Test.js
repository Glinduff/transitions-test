import React, { Component } from 'react'
import { Text, StatusBar, StyleSheet, Platform, TouchableOpacity} from 'react-native'
import { white, gray } from '../utils/colors';
import { SafeAreaView } from 'react-navigation'
import { Ionicons } from '@expo/vector-icons'

export default class Test extends Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar
          hidden={Platform.OS === 'android' && true}
        />
        <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
          <Ionicons name='ios-close' size={50}></Ionicons>
        </TouchableOpacity>
        <Text style={{ fontSize: 30 }}>
          Modal
        </Text>
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