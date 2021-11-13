import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default function Footer() {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button}>
        <FontAwesome name="times" size={25} color="red"></FontAwesome>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <FontAwesome name="plus" size={25} color="yellow"></FontAwesome>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <FontAwesome name="question" size={25} color="blue"></FontAwesome>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <FontAwesome name="times" size={25} color="green"></FontAwesome>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 100,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  button: {
    width: 50,
    height: 50,
    backgroundColor: 'white',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.29,
    shadowRadius: 14,
    elevation: 7,
  }
})
