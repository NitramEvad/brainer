import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import useColorScheme from 'react-native/Libraries/Utilities/useColorScheme'

export default function Card({card, easySwipe, hardSwipe}) {

console.log('CARD ', card)
console.log('URI ', card.uri)
  return (
    <View style={styles.card}>
      {/* TODO: Cycle paper type */}
      <Image source={require('../../assets/paper3.jpg')} style={styles.backgroundImage} />

      {easySwipe && (<View style={styles.easyBox}>
        <Text style={styles.boxText}>EASY</Text>
      </View>)}
      
      <View style={styles.easyBox}>
        <Text style={styles.easyBoxText}>EASY</Text>
      </View>

      {hardSwipe && (<View style={styles.hardBox}>
        <Text style={styles.hardBoxText}>HARD</Text>
      </View>)}

      <View style={styles.textContent}>

        {/* TODO: testing tap */}
        {/* {face && (<View><Text>FRONT</Text></View>)}
        {!face && (<View><Text>BACK</Text></View>)} */}
        
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
          {/* TODO: shift to stop from being pushed off the bottom */}
          <Text style={styles.pill}>Easy: {card.count_easy}</Text>
          <Text style={styles.pill}>Moderate: {card.count_moderate}</Text>
          <Text style={styles.pill}>Hard: {card.count_hard}</Text>
          <Text style={styles.pill}>Again:{card.count_again}</Text>
        </View>
      </View>
    </View>
  )
}

const cornerStyle = {
  position: 'absolute',
  top: 5,
  padding: 8,
  borderWidth: 4,
  borderRadius: 10,
  // backgroundColor: 'white',
}

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    justifyContent: 'center',
    // TODO: add shadow
  },

  easyBox: {
    ...cornerStyle,
    left: 5,
    borderColor: '#6ee3b4',
  },
  hardBox: {
    ...cornerStyle,
    right: 40,
    borderColor: '#ec5288',
  },

  easyBoxText: {
    fontSize: 25,
    color: '#6ee3b4',
    fontWeight: 'bold',
  },
  hardBoxText: {
    fontSize: 25,
    color: '#ec5288',
    fontWeight: 'bold',
  },

  backgroundImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 20,
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
