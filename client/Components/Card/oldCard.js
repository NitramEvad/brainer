import React, {useState, useEffect, } from 'react';
import { Button, View, Text, Image, StyleSheet } from 'react-native';
import CardFlip from 'react-native-card-flip';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en.json';
import data from '../../data';
import { stles } from './styles'

// TODO: multiple invocations is causing bugs
TimeAgo.addDefaultLocale(en);
const timeAgo = new TimeAgo('en-US')
function lastViewedStr (timeStamp) {
  return timeAgo.format(Date.now() - (Date.now() - timeStamp))
}

export default function Card ({ card, side }) {

  const [isFlipped, setIsFlipped] = useState(false);

  function handleFlip () {
    console.log('FLIP clicked')
    setIsFlipped(isFlipped ? false : true)
  }
  
  return (
    
    
    <View style={styles.card}>
  
      <Image source={require('../../assets/Zoe1.jpg')}
      {/* <Image source={require('../../assets/paper3.jpg')} style={styles.backgroundImage} /> */}
      {/* <Image source={data[cardIndex].uri)} style={styles.backgroundImage} /> */}

      {/* CORNER TABS */}
      
      {/* TODO: REINSTATE? */}
      {/* {easySwipe && (<View style={styles.easyBox}>
        <Text style={styles.boxTextEasy}>EASY</Text>
      </View>)} */}
      
      {/* {hardSwipe && (<View style={styles.hardBox}>
        <Text style={styles.boxTextHard}>HARD</Text>
      </View>)} */}

      <View style={styles.easyBox}>
        <Text style={[styles.boxTextEasy, styles.boxText]}>
          EASY
        </Text>
      </View>

      <View style={styles.hardBox}>
        <Text style={[styles.boxTextHard, styles.boxText]}>
          HARD
        </Text>
      </View>

      <View style={styles.againBox}>
        <Text style={[styles.boxTextAgain, styles.boxText]}>
          REPEAT
        </Text>
      </View>

      <View style={styles.moderateBox}>
        <Text style={[styles.boxTextModerate, styles.boxText]}>
          MODERATE
        </Text>
      </View>

      <View style={styles.textContent}>

        {/* TODO: TESTING FACE SWAP */}
        {/* {face && (<View><Text>FRONT</Text></View>)}
        {!face && (<View><Text>BACK</Text></View>)} */}

        <Button style={styles.buttonFlip} title='FLIP' onPress={() => handleFlip()} />
        
        <View style={styles.questionMain}>
          <Text style={[styles.textMain, styles.textShadow]}>
            {isFlipped ? card.front_field_main : card.answer_main}
          </Text>
        </View>

        <View style={styles.questionSecondary}>
          <Text style={styles.textSecondary}>
            Secondary text
          </Text>
        </View>

          {/* TODO: REMOVE*/}
        <View style={styles.countsRow}>
          <Text style={styles.pill}>Card ID: {card._id}</Text>
          <Text style={styles.pill}>Score: {card.score}</Text>
        </View>
        
        {/* TODO: shift to stop from being pushed off the bottom */}
        <View style={styles.textMinor}>
          <View style={styles.countsRow}>
            <Text style={styles.pill}>Times Viewed: {card.times_viewed}</Text>
            {/* TODO: change last viewed to "x x's ago" */}
            <Text style={styles.pill}>Last: Viewed: {lastViewedStr(card.last_viewed)}</Text>
          </View>
          <View style={styles.countsRow}>
            <Text style={styles.pill}>Easy: {card.count_easy}</Text>
            <Text style={styles.pill}>Moderate: {card.count_moderate}</Text>
            <Text style={styles.pill}>Hard: {card.count_hard}</Text>
            <Text style={styles.pill}>Again: {card.count_again}</Text>
          </View>
        </View>

      </View>

      
    </View>
  )
}

// const cornerStyle = {
//   position: 'absolute',
//   top: 5,
//   padding: 8,
//   borderWidth: 4,
//   borderRadius: 10,
//   backgroundColor: 'white',
//   zIndex: 0,
// }

// const styles = StyleSheet.create({
//   card: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     // TODO: remove this 900 - only in place to unbug web browser view
//     height: 900,
//     // TODO: add shadow
//   },

//   // BOX BORDERS
//   easyBox: {
//     ...cornerStyle,
//     top: '30%',
//     left: -50,
//     borderColor: '#6ee3b4',
//   },
//   hardBox: {
//     ...cornerStyle,
//     top: '30%',
//     right: -50,
//     borderColor: '#ec5288',
//   },
//   againBox: {
//     ...cornerStyle,
//     top: -20,
//     left: '40%',
//     borderColor: 'cyan',
//   },
//   moderateBox: {
//     ...cornerStyle,
//     top: '95%',
//     left: '40%',
//     borderColor: 'grey',
//   },

//   // BOXTEXT
//   boxText: {
//     fontSize: 25,
//     fontWeight: 'bold',
//   },

//   boxTextEasy: {
//     color: '#6ee3b4',

//   },
//   boxTextHard: {
//     color: '#ec5288',
//   },
//   boxTextModerate: {
//     color: 'grey',

//   },
//   boxTextAgain: {
//     color: 'cyan',
//   },

//   textContent: {
//     position: 'absolute',
//     top: 50,
//     padding: 10,
//   },  
  
//   backgroundImage: {
//     width: '100%',
//     height: '100%',
//     resizeMode: 'cover',
//     borderRadius: 20,
//   },
  
//   questionMain: {
//     alignItems: 'center',
//     flexDirection: 'row',
//     justifyContent: 'center',
//   },
//   textMain: {
//     fontSize: 50,
//   },
//   textShadow: {
//     textShadowColor: 'grey',
//     textShadowOffset: { width: 2, height: 2},
//     textShadowRadius: 10,
//   },
  
//   questionSecondary: {
//     alignItems: 'center',
//     flexDirection: 'row',
//     justifyContent: 'center',
//   },
//   textSecondary: {
//     fontSize: 40,
//   },

//   // TODO: Make sticky to bottom of card
//   textMinor: {
//     fontSize: 8,
//   },
//   countsRow: {
//     alignItems: 'flex-end',
//     bottom: -80,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
    
//   },
//   pill: {
//     borderRadius: 10,
//     borderStyle: 'solid',
//     borderWidth: 1,
//     fontSize:14,
//     margin: 4,
//     padding: 5,
//     paddingLeft: 10,
//     paddingRight: 10,
//   },
// })
