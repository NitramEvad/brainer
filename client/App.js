import React, { useCallback, useEffect, useRef, useState,  } from 'react';
import { Animated, PanResponder, StyleSheet, Text, TouchableOpacity, View, } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Header from './Components/Header';
import Footer from './Components/Footer';
import data from './data.js';
import Card from './Components/Card';
import { CARD, SCORES_SORTABLE } from './Constants/constants';
// TODO: ATTEMPT TO IMPLEMENT VISUAL FLIP
import CardFlip from 'react-native-card-flip';

export default function App () {

  const [cards, setCards] = useState(data);
  const [cardIndex, setCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const swipe = useRef(new Animated.ValueXY()).current;
  const tiltSign = useRef(new Animated.Value(1)).current;

  //  TODO: REMOVE
  console.table(cards);
  console.table(data);

  // ACTION ON CARD STACK BEING EMPTIED -> RESTACK
  // TODO: SETCARDS AS TWO HIGHEST SCORING CARDS
  // TODO: IMPLEMENT NEXTCARD INSTEAD OF REACHING BOTTOM
  // TODO: CHANGE FROM CARDS.LENGTH TO ALL CARDS HAVE SCORE OF <X OR HAVE BEEN VIEWED X-TIMES TODAY
  useEffect(() => {
    if (!cards.length) {
      setCards(data)
    }
  }, [cards.length]);

  // CARD PANNING ANIMATION
  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (_, { dx, dy, y0 }) => {
      swipe.setValue({ x: dx, y: dy });
      tiltSign.setValue(y0 > CARD.HEIGHT / 2 ? 1 : -1 )
    },
    onPanResponderRelease: (_, { dx, dy }) => {
      
    const directionX = Math.sign(dx);
    const isActionActiveX = Math.abs(dx) > 100;
      
    const directionY = Math.sign(dy);
    const isActionActiveY = Math.abs(dy) > 100;

      if (isActionActiveX) {
        Animated.timing(swipe, {
          duration: 200,
          toValue: {
            x: directionX * 500,
            y: dy, 
          },
          friction: 5,
          useNativeDriver: false,
          // TODO: REWORK
        }).start(recordEasyHard)
      } else {
        Animated.spring(swipe, {
          toValue: {
            x: 0,
            y: 0,
          },
          friction: 5,
          useNativeDriver: false,
        }).start();
      } 
      
      if (isActionActiveY) {
        Animated.timing(swipe, {
          duration: 200,
          toValue: {
            x: 100, 
            y: directionY * 500, 
          },
          friction: 5,
          useNativeDriver: false,
          // TODO: REWORK
        }).start(recordModRedo)
      } else {
        Animated.spring(swipe, {
          toValue: {
            x: 0,
            y: 0,
          },
          friction: 5,
          useNativeDriver: false,
        }).start();
      } 
    },
  });
  
  // RMOVES CARD ON COMPLETE SWIPE

  
  const recordEasyHard = () => {
    if (swipe.x._value < -50 ) updateCardDetails('hard');
    if (swipe.x._value > 50 ) updateCardDetails('easy');
    swipe.setValue({ x: 0, y: 0 })
    setCards((prevState) => prevState.slice(1))
  }

  const recordModRedo = () => {
    if (swipe.y._value > 499) updateCardDetails('redo');
    if (swipe.y._value < -499) updateCardDetails('moderate');
    swipe.setValue({ x: 0, y: 0 })
    setCards((prevState) => prevState.slice(1))
  }

  // OLD REMOVE TOPCARD USING USECALLBACK() FUNCTION - MAY BE BETTER
  // const removeTopCardOld = useCallback(() => { 
  //   setCards((prevState) => 
  //   prevState.slice(1)
  //   )
  //   swipe.setValue({ x: 0, y: 0 })
  // },[swipe])
  
  const handleChoiceX = useCallback((direction) => {
    Animated.timing(swipe.x, {
      toValue: direction * 500,
      duration: 600,
    }).start(recordEasyHard)
  }, [recordEasyHard, swipe.x])
  
  const handleChoiceY = useCallback((direction) => {
    Animated.timing(swipe.y, {
      toValue: direction * 700,
      duration: 600,
    }).start(recordModRedo)
  }, [recordModRedo, swipe.y])
  

  const markCard = () => {
    console.log('SWIPED')
    removeTopCard()
  }

  // UPDATES CARD DETAILS ON SWIPE
  function updateCardDetails (swipe) {
    // TODO: change "cards" to "data"
    const index = data.map(e => e._id).indexOf(cards[0]._id)
    console.log('INDEX', index)
    console.log('SCORE: ', SCORES_SORTABLE[`${swipe}`])
    
    data[index].times_viewed += 1;
    data[index].last_viewed = Date.now();
    data[index].score = SCORES_SORTABLE[`${swipe}`];
    data[index][`count_${swipe}`] += 1;
  }
  

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.cardArea}>
        {
          cards.map((card, index) => {
            const isFirst = index === 0;
            const dragHanders = isFirst ? panResponder.panHandlers : {};
          return (
            <Card 
              key={card._id}
              card={card}
              index={index}
              isFirst={isFirst}
              swipe={swipe}
              tiltSign={tiltSign}
              {...dragHanders}
            >
            </Card>
          )
        }).reverse()}
      </View>
      <StatusBar style="none"/>
      <View style={styles.footer}>
        <Footer handleChoiceX={handleChoiceX} handleChoiceY={handleChoiceY}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },
  cardArea: {
    alignItems: 'center',
    backgroundColor: '#fff',
    flex: 1,
  },

  footer: {
    // TODO: RESOLVE FOOTER NOT STAYING AT BOTTOM AND REMOVE THIS
    top: '370%',
  }
});
