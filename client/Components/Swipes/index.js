import React, { useEffect, useState } from 'react';
import { Animated, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { PanGestureHandler, RectButton } from 'react-native-gesture-handler';
// import Swipeable from 'react-native-gesture-handler/Swipeable';
// import Card from '../Card';
import { COLORS } from '../../Constants/constants';


export default function Swipes ({ type }) {
  const color = COLORS[type]

  return (
    <View style={[styles.container, { borderColor: color }]}>
      <Text style={[styles.text, {color: color}]}>{type}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 6,
    paddingHorizontal: 15,
    borderRadius: 15,
    backgroundColor: 'rgba(0,0,0,0.2)'
  },
  text: {
    fontSize: 40,
    fontWeight: 'bold',
    letterSpacing: 4,
    textTransform: 'uppercase',
  },

}) 
