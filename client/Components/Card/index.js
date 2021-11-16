import { styles } from './styles';
import React, {useCallback, useState, useEffect, } from 'react';
import { Animated, View, Text, Image, TouchableOpacity } from 'react-native';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en.json';
import { LinearGradient } from 'expo-linear-gradient';
import Swipes from '../Swipes';
import { TapGestureHandler, State } from 'react-native-gesture-handler';
import AppLoading from 'expo-app-loading';
import { useFonts, } from '@expo-google-fonts/inter';
import data from '../../data.js';

// TODO: IMPLEMENT CARD FLIP ANIMATION 
// TODO: STRUGGLING TO MAKE THIS WORK WITH FUNCTIONAL APPROACH
// import CardFlip from 'react-native-card-flip';
// TODO: G-F-V WON'T WORK AS GESTURES CONFLICT WITH SWIPES
// import GestureFlipView from 'react-native-gesture-flip-card';
// TODO: R-N-F-C PACKAGE SEEMS TO BE BROKEN
// import FlipCard from 'react-native-flip-card';

// TODO: MULTIPLE INVOCATIONS OF TIMEAGO IS CAUSING ERRORS
TimeAgo.addDefaultLocale(en);

const timeAgo = new TimeAgo('en-US');
function lastViewedStr (timeStamp) {
  return timeAgo.format(Date.now() - (Date.now() - timeStamp))
};


export default function Card ({ card, index, isFirst, swipe, tiltSign, ...rest }) {
  
  let [fontsLoaded] = useFonts({
    'adr': require('../../assets/fonts/ArchitectsDaughter-Regular.ttf'),
    'asr': require('../../assets/fonts/AllertaStencil-Regular.ttf'),
  });

  // CARD FLIP ACTION
  const [isFlipped, setIsFlipped] = useState(false);
    
  function handleFlip (event) {
    if (event.nativeEvent.state === State.ACTIVE) {
      setIsFlipped(isFlipped ? false : true)
    }
  }

  // ROTATION FACTOR WHEN DRAGGING CARDS
  const rotate = Animated.multiply(swipe.x, tiltSign).interpolate({
    inputRange: [-150, 0, 150],
    outputRange: ['10deg', '0deg', '-10deg'],
  });

  // FADE-IN/FADE-OUT OF CORNER TAGS AS ITEM IS DRAGGED
  const easyOpacity = swipe.x.interpolate({
    extrapolate: 'clamp',
    inputRange: [100, 300],
    outputRange: [0, 1],
  })

  const hardOpacity = swipe.x.interpolate({
    extrapolate: 'clamp',
    inputRange: [-300, -100],
    outputRange: [1, 0],
  })

  const moderateOpacity = swipe.y.interpolate({
    extrapolate: 'clamp',
    inputRange: [-300, -200],
    outputRange: [1, 0],
  })

  const redoOpacity = swipe.y.interpolate({
    extrapolate: 'clamp',
    inputRange: [200, 300],
    outputRange: [0, 1],
  })

  const animatedCardStyle = {
    transform: [...swipe.getTranslateTransform(), { rotate }],
  };

  // CORNER LABELS "EASY", "HARD", "REDO", "AGAIN"
  const showSwipes = useCallback(() => {
    return (
      <>
        <Animated.View
          style={[styles.swipesTag, styles.easyTag, { opacity: easyOpacity }]}>
          <Swipes type="easy" />
        </Animated.View>
        <Animated.View
          style={[styles.swipesTag, styles.hardTag, { opacity: hardOpacity }]}>
          <Swipes type="hard" />
        </Animated.View>

        <Animated.View
          style={[styles.swipesTag, styles.redoTag, { opacity: redoOpacity }]}>
          <Swipes type="redo" />
        </Animated.View>
        <Animated.View
          style={[styles.swipesTag, styles.moderateTag, { opacity: moderateOpacity }]}>
          <Swipes type="moderate" />
        </Animated.View>
      </>
    );
  }, [easyOpacity, hardOpacity, moderateOpacity, redoOpacity]);
  
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <TapGestureHandler onHandlerStateChange={handleFlip} >

        <Animated.View style={[styles.container, isFirst && animatedCardStyle]} {...rest} >

          <Image source={require('../../assets/paper3.jpg')} style={styles.image} />
          <LinearGradient colors={['transparent', 'grey']} style={styles.gradient} />

          <View style={styles.textContent} >
              <View>
                {isFlipped && <Text style={styles.answer}>
                  Answer
                </Text>}

                {!isFlipped && <Text style={styles.question}>
                  Question
                </Text>}
              </View>

              <View style={styles.questionMain}>
                {isFlipped && <Text style={[styles.textMain, styles.textShadow]}>
                  {card.answer_main}
                </Text>}

                {!isFlipped && <Text style={[styles.textMain, styles.textShadow]}>
                  {card.front_field_main}
                </Text>}
              </View>

              <View style={styles.stats}>
                <View style={styles.countsRow}>
                  <Text style={styles.pill}>Deck size:{'\n'}{data.length}</Text>
                  <Text style={styles.pill}>Viewed:{'\n'}{lastViewedStr(card.last_viewed)}</Text>
                </View>

                <View style={styles.countsRow}>
                  <Text style={styles.pill}>Last Swipe:{'\n'}{card.last_swipe}</Text>
                  <Text style={styles.pill}>Times Viewed:{'\n'}{card.times_viewed}</Text>
                </View>

                <View style={styles.countsRow}>
                  <Text style={styles.pill}>Easy:{'\n'}{card.count_easy}</Text>
                  <Text style={styles.pill}>Moderate:{'\n'}{card.count_moderate}</Text>
                  <Text style={styles.pill}>Hard:{'\n'}{card.count_hard}</Text>
                  <Text style={styles.pill}>Redo:{'\n'}{card.count_redo}</Text>
                </View>
              </View>
            </View>

          {
            isFirst && showSwipes()
          }
        
        </Animated.View>
      </TapGestureHandler>
    )
  }
}

