import React from 'react';
import { StyleSheet, TouchableOpacity, View, } from 'react-native';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { COLORS } from '../../Constants/constants';

// BUTTON HANDLERS
// TODO: OPERATE AS ALTERNATIVES TO SWIPE ACTIONS
function crossPress () {
  console.log('CROSS PRESS - still to be implemented');
  handleChoice(-1)
}

function redoPress () {
  console.log('REDO PRESS - still to be implemented');
}

function starPress () {
  console.log('CROSS PRESS - still to be implemented');
}

function heartPress () {
  console.log('HEART PRESS - still to be implemented');
  handleChoice(1)
}

  
// TODO: ADD PROPS eg. (easyHandler, moderateHandler, hardHandler, againHandler)
export default function Footer ( {handleChoice}) {
  
  return (
    <View style={styles.container}>

      <TouchableOpacity style={styles.button} >
        <FontAwesome name="times" size={25} color={COLORS.hard} onPress={() => crossPress()}></FontAwesome>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.button} >
        <FontAwesome5 name="redo" size={25} color={COLORS.redo} onPress={() => redoPress()}></FontAwesome5>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} >
        <FontAwesome name="star" size={25} color={COLORS.moderate} onPress={() => starPress()}></FontAwesome>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.button} >
        <FontAwesome name="heart" size={25} color={COLORS.easy} onPress={() => heartPress()}></FontAwesome>
      </TouchableOpacity>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    // position: 'absolute',
    alignItems: 'center',
    bottom: 15,
    flexDirection: 'row',
    height: 70,
    justifyContent: 'space-around',
    zIndex: -1,
  },

  button: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 25,
    height: 50,
    justifyContent: 'center',
    width: 50,

    shadowColor: 'grey',
    shadowOffset: {
      height: 5,
      width: 5,
    },
    elevation: 7,
    shadowOpacity: 0.4,
    shadowRadius: 14,
  }
})

