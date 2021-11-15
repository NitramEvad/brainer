import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useEffect, useRef, useState,  } from 'react';
import { Animated, PanResponder, StyleSheet, Text, TouchableOpacity, View, } from 'react-native';
import Header from './Components/Header';
import Footer from './Components/Footer';
import data from './data.js';
import Card from './Components/Card';
import { CARD } from './Constants/constants';
import CardFlip from 'react-native-card-flip';

export default function App () {

  const [cards, setCards] = useState(data);
  const [cardIndex, setCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const swipe = useRef(new Animated.ValueXY()).current;
  const tiltSign = useRef(new Animated.Value(1)).current

  //  TODO: REMOVE
  console.table(cards);

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
          useNativeDriver: true,
          friction: 5,
        }).start(removeTopCard)
      } else {
        Animated.spring(swipe, {
          toValue: {
            x: 0,
            y: 0,
          },
          friction: 5,
        }).start();
      } 
      
      if (isActionActiveY) {
        Animated.timing(swipe, {
          duration: 200,
          toValue: {
            x: directionY * 500,
            y: dy, 
          },
          friction: 5,
        }).start(removeTopCard)
      } else {
        Animated.spring(swipe, {
          toValue: {
            x: 0,
            y: 0,
          },
          useNativeDriver: true,
          friction: 5,
        }).start();
      } 
    },
  });

  // RMOVES CARD ON COMPLETE SWIPE
  const removeTopCard = useCallback(() => { 
    // TODO: UPDAE CARD DETAILS AND INDEX
    setCards((prevState) => {
      console.log('PREV: ', prevState)
      prevState.slice(1)
    })
    
    swipe.setValue({ x: 0, y: 0 })
  },[swipe])
  
  const handleChoiceX = useCallback((direction) => {
    Animated.timing(swipe.x, {
      toValue: direction * 500,
      duration: 600,
    }).start(removeTopCard)
  }, [removeTopCard, swipe.x])

  const handleChoiceY = useCallback((direction) => {
    Animated.timing(swipe.y, {
      toValue: direction * 700,
      duration: 600,
    }).start(removeTopCard)
  }, [removeTopCard, swipe.y])

  // UPDATES CARD DETAILS ON SWIPE
  function updateCardDetails (swipe) {
    // TODO: change "cards" to "data"
    cards[cardIndex].times_viewed += 1;
    cards[cardIndex].last_viewed = Date.now();
    cards[cardIndex].score = SCORES_SORTABLE[`${swipe}`];
    cards[cardIndex][`count_${swipe}`] += 1;
  }

  function handleLeftSwipe () {
    console.log('LEFT - easy');
    updateCardDetails('easy');
  }
  
  function handleRightSwipe () {
    console.log('RIGHT - hard');
    updateCardDetails('hard');
  }

  function handleuPSwipe () {
    console.log('UP - moderate');
    updateCardDetails('moderate');
  }
  
  function handledOWNSwipe () {
    console.log('DOWN - redo');
    updateCardDetails('redo');
  }

  function handleFlip () {
    console.log('FLIP clicked')
    setIsFlipped(isFlipped ? false : true)
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
