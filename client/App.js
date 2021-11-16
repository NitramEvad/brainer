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

  const [deck, setDeck] = useState([...data].sort((a,b) => a.score - b.score));
  const [cards, setCards] = useState(deck.slice(0,2));

console.table(deck)
console.table(cards)

  useEffect(() => {
    // console.table('DATA');
    // console.table(data);
    // console.table('CARDS');
    // console.table(cards);

    // TODO: LEGACY OF OLD DESIGN WHERE DECK EMPTIED AND REBUILT - NO LONGER NECESSARY
    if (!cards.length) {
      // setCards(data.sort((a,b) => b.score - a.score));
    }
  }, [cards.length]);

  const swipe = useRef(new Animated.ValueXY()).current;
  const tiltSign = useRef(new Animated.Value(1)).current;

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
  
  
  // UPDATE CARD DETAILS ON SWIPE - THEN CALL RESETVALUES()
  function updateCardDetails (swipe) {
    const index = data.map(e => e._id).indexOf(cards[0]._id)
    data[index][`count_${swipe}`] += 1;
    data[index].last_swipe = swipe;
    data[index].times_viewed += 1;
    // TODO: use delay to +/- priority (cards not seen recently will be bumped up)
    data[index].days_delay = Math.floor((Date.now() - data[index].last_viewed)/1000);
    data[index].last_viewed = Date.now();
    // data[index].score = Number('' + SCORES[`${swipe}`] + Math.floor(Math.random() * 3 + 0));
    // data[index].score = SCORES[`${swipe}`];
    data[index].score = Number('' + SCORES[`${swipe}`] + Date.now());
    data[index].priority = Number('' + SCORES[`${swipe}`] + Math.floor(Math.random() * 10 + 10));
    flickCard();
  }

  const flickCard = () => {
    swipe.setValue({ x: 0, y: 0 });
    setNewDeck()
  }

  const setNewDeck = () => {
    // setCards((prevState) => prevState.slice(1))
    console.table(deck)
    let twoCards = cards.slice(1);
    console.table(twoCards)

    // TODO: INSERT NEW LOGIC FOR SELECTING NEXT CARD FROM LIST
    // TODO: -----
    // let newCard = data[Math.floor(Math.random() * 8)];

    setDeck(deck.sort((a, b) => a.score - b.score))
    console.log(deck)
    let nextCard;
    if (twoCards[0]._id === deck[0]._id) {
      console.table(deck[1])
      nextCard = deck[1]
    } else {
      console.table(deck[0])
      nextCard = deck[0]
    }
    
    // TODO: -----
    twoCards.push(nextCard);
    console.table(twoCards)
    setCards(twoCards)
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
                  key={index}
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
    backgroundColor: 'hsl(0, 0%, 100%)',
    flex: 1,
  },

  footer: {
    // TODO: RESOLVE FOOTER NOT STAYING AT BOTTOM AND REMOVE THIS
    top: '370%',
  }
});
