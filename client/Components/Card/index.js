import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'

export default function Card({card}) {

console.log('CARD ', card)
console.log('URI ', card.uri)
  return (
    <View style={styles.card}>
      {/* TODO: Not working for some reason */}
      {/* <Image source={card.uri} style={styles.backgroundImage} /> */}
      <Image source={require('../../assets/paper3.jpg')} style={styles.backgroundImage} />
      <View style={styles.textContent}>
        <View style={styles.questionMain}>
          <Text style={[styles.textMain, styles.textShadow]}>{card.front_field_main} </Text>
        </View>
        <View style={styles.questionSecondary}>
          <Text style={styles.textMain}>Secondary text</Text>
        </View>
        <View style={styles.viewed}>
          <Text style={styles.pill}>Times Viewed: {card.times_viewed}</Text>
          <Text style={styles.pill}>Last: Viewed: {card.last_viewed}</Text>
        </View>
        <View style={styles.testData}>
          <Text style={styles.pill}>Card ID: {card._id}</Text>
          <Text style={styles.pill}>Score: {card.score}</Text>
        </View>
        <View style={styles.counts}>
          <Text style={styles.pill}>Easy: {card.count_easy}</Text>
          <Text style={styles.pill}>Moderate: {card.count_moderate}</Text>
          <Text style={styles.pill}>Hard: {card.count_hard}</Text>
          <Text style={styles.pill}>Again:{card.count_again}</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {

    alignItems: 'center',
    justifyContent: 'center',
    // TODO: Shadow not currently working
    // shadowColor: 'grey',
    // shadowOpacity: 0.5,
    // shadowRadius: 20,
    // elevation: 10,
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 20,
    // opacity: 0.3,
  },
  textContent: {
    position: 'absolute',
    padding: 15,
  },
  textMain: {
    fontSize: 50,
  },
  textSecondary: {
    fontSize: 10,
  },
  textMinor: {
    fontSize: 8,
  },
  questionMain: {
    flexDirection: 'row',
    fontWeight: 'bold',
    color: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
  questionSecondary: {
    flexDirection: 'row',
  },
  counts: {
    bottom: -80,
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    flexDirection: 'row',

  },
  viewed: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  testData: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    
  },
  textShadow: {
    textShadowColor: 'grey',
    textShadowOffset: { width: 2, height: 2},
    textShadowRadius: 10,
  },
  pill: {
    fontSize:18,
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 10,
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    margin: 4
  },
})
