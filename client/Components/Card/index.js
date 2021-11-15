import { styles } from './styles'
import React, {useCallback, useState, useEffect, } from 'react';
import { Animated, Button, View, Text, Image, StyleSheet } from 'react-native';
import CardFlip from 'react-native-card-flip';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en.json';
import data from '../../data';
import { LinearGradient } from 'expo-linear-gradient';
import Swipes from '../Swipes'

// TODO: multiple invocations is causing bugs
TimeAgo.addDefaultLocale(en);
const timeAgo = new TimeAgo('en-US')
function lastViewedStr (timeStamp) {
  return timeAgo.format(Date.now() - (Date.now() - timeStamp))
}

export default function Card ({ card, index, isFirst, swipe, tiltSign, ...rest} ) {



  const rotate = Animated.multiply(swipe.x, tiltSign).interpolate({
    inputRange: [-100, 0, 100],
    outputRange: ['10deg', '0deg', '-8deg'],
  });

  const easyOpacity = swipe.x.interpolate({
    inputRange: [30, 100],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  })

  const hardOpacity = swipe.x.interpolate({
    inputRange: [-100, -30],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  })

  const animatedCardStyle = {
    transform: [...swipe.getTranslateTransform(), { rotate }],
  };

  const showSwipes = useCallback(() => {
    return (
        <>
          <Animated.View style={[styles.swipesBox, styles.easyBox, { opacity: easyOpacity }]}>
              <Swipes type="easy"/>
          </Animated.View>
          <Animated.View style={[styles.swipesBox, styles.hardBox, { opacity: hardOpacity }]}>
            <Swipes type="hard"/>
          </Animated.View>
        </>
    );
  }, [easyOpacity, hardOpacity]);
  
  const [isFlipped, setIsFlipped] = useState(false);

  function handleFlip () {
    console.log('FLIP clicked')
    setIsFlipped(isFlipped ? false : true)
  }


  return (
    <Animated.View style={[styles.container, isFirst && animatedCardStyle]} {...rest}>
      {/* <Button title='FLIP' onPress={() => handleFlip()} /> */}

      <Image source={require('../../assets/paper3.jpg')} style={styles.image} />
      <LinearGradient colors={['transparent', 'grey']} style={styles.gradient}/>

      <View style={styles.textContent}>
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

        {
        isFirst && showSwipes()
        }
    </Animated.View>

  )
}

