import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

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
    backgroundColor: 'hsla(0,0%,0%,0.2)'
    borderRadius: 15,
    borderWidth: 6,
    paddingHorizontal: 15,
  },
  text: {
    fontSize: 40,
    fontWeight: 'bold',
    letterSpacing: 4,
    textTransform: 'uppercase',
  },

}) 
