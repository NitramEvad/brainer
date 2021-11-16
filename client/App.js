import React, { useCallback, useEffect, useRef, useState,  } from 'react';
import { Animated, PanResponder, StyleSheet, View, } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Header from './Components/Header';
import Footer from './Components/Footer';
import data from './data.js';
import Card from './Components/Card';
import { CARD, SCORES, } from './Constants/constants';
// TODO: ATTEMPT TO IMPLEMENT VISUAL FLIP
import CardFlip from 'react-native-card-flip';

export default function App () {

  const [cards, setCards] = useState(data);
  const [cardIndex, setCardIndex] = useState(0);

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
      setCards(data);
    }
  }, [cards.length]);

  // SWIPE ACTION-EVERY TIME CARDS IS SLICED
  useEffect(() => {
    console.log('SWIPED!')
  }, [cards.length]);

  // TODO: ATTEMPT AT APPLYING ALGO TO POPUATION OF CARD DECK
  // TODO: MAYBE A RE-SORT OF CARDS BY SCORE ON EACH SWIPE?
  // const resetValues = () => {
  //   swipe.setValue({ x: 0, y: 0 });
  //   let nextCard = data.reduce(function (min, obj) {
  //     return obj.score < min.score ? obj : min;
  //   })
  //   setCards((prevState) => {
  //     prevState.slice(1)
  //     prevState.push(nextCard)
  //     }
  //   )
  // }

  // CARD PANNING ANIMATION
  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (_, { dx, dy, y0 }) => {
      swipe.setValue({ x: dx, y: dy });
      tiltSign.setValue(y0 > CARD.HEIGHT / 2 ? 1 : -1)
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
          useNativeDriver: false,
          friction: 5,
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
          useNativeDriver: false,
          friction: 5,
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
  
  const recordEasyHard = () => {
    if (swipe.x._value < -50) updateCardDetails('hard');
    if (swipe.x._value > 50) updateCardDetails('easy');
  }

  const recordModRedo = () => {
    if (swipe.y._value > 499) updateCardDetails('redo');
    if (swipe.y._value < -499) updateCardDetails('moderate');
  }
  
  const handleChoiceX = useCallback((direction) => {
    Animated.timing(swipe.x, {
      toValue: direction * 500,
      duration: 600,
      useNativeDriver: false,
    }).start(recordEasyHard)
  }, [recordEasyHard, swipe.x])
  
  const handleChoiceY = useCallback((direction) => {
    Animated.timing(swipe.y, {
      toValue: direction * 700,
      duration: 600,
      useNativeDriver: false,
    }).start(recordModRedo)
  }, [recordModRedo, swipe.y])
  
  
  // UPDATES CARD DETAILS ON SWIPE
  function updateCardDetails (swipe) {
    const index = data.map(e => e._id).indexOf(cards[0]._id)
    data[index].times_viewed += 1;
    data[index].last_viewed = Date.now();
    data[index].score = Number('' + SCORES[`${swipe}`] + Date.now());
    data[index][`count_${swipe}`] += 1;
    resetValues();
  }
  
  // RESET CARDS
  const resetValues = () => {
    swipe.setValue({ x: 0, y: 0 });
    setCards((prevState) => prevState.slice(1)
    )
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
        <StatusBar style="none" />
        <View style={styles.footer}>
          <Footer handleChoiceX={handleChoiceX} handleChoiceY={handleChoiceY} />
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
