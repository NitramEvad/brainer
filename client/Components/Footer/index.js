import React from 'react'
import { Text, StyleSheet, TouchableOpacity, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default function Footer(easyHandler, moderateHandler, hardHandler, againHandler) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={hardHandler}>
        <FontAwesome name="times" size={25} color="#ec5288" ></FontAwesome>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={againHandler}>
        <FontAwesome name="undo" size={25} color="cyan"></FontAwesome>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={moderateHandler}>
        <FontAwesome name="star" size={25} color="grey"></FontAwesome>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={easyHandler}>
        <FontAwesome name="heart" size={25} color="#6ee3b4" ></FontAwesome>
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
