import React from 'react';
import { StyleSheet, TouchableOpacity, View, } from 'react-native';
import { FontAwesome, FontAwesome5, } from '@expo/vector-icons';
import { COLORS } from '../../Constants/constants';


function brainPress () {
  // TODO: DECK MANAGER SCREEN TO BE IMPLEMENTED
  // TODO: TEMPORARILY ASSIGN TO FLIP ACTION
  console.log('Deck manager screen - still to be implemented')
}
function profilePress () {
  // TODO: PROFILE SCREEN TO BE IMPLEMENTED
  console.log('Profile screen - still to be implemented')
}

export default function Header () {

  return (
    <View style={styles.container}>
      
      <TouchableOpacity style={styles.button}>
        <FontAwesome5 name="brain" size={25} color={COLORS.hard} onPress={() => brainPress()}></FontAwesome5>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <FontAwesome name="user" size={25} color={COLORS.hard} onPress={() => profilePress()}></FontAwesome>
      </TouchableOpacity>
      
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-end',
    backgroundColor: 'white',
    flexDirection: 'row',
    height: 90,
    justifyContent: 'space-around',
    marginBottom: 15,
    padding: 15,
    top: 0,
    zIndex: -1,

    shadowColor: '#000',
    shadowOffset: {
      height: 10,
      width: 0,
    },
    elevation: 10,
    shadowOpacity: 0.30,
    shadowRadius: 10,
  },

  button: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
    height: 40,
    justifyContent: 'center',
    width: 40,
  }
})

