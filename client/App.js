import React, { useCallback, useEffect, useRef, useState,  } from 'react';
import { Animated, PanResponder, StyleSheet, View, } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Header from './Components/Header';
import Footer from './Components/Footer';
import data from './data/data-generic.js';
import Card from './Components/Card';
import { CARD, CARD_PICKER, SCORES, } from './Constants/constants';

// TODO: ATTEMPT TO IMPLEMENT VISUAL FLIP
import CardFlip from 'react-native-card-flip';

export default function App () {

  const [deck, setDeck] = useState([...data].sort((a,b) => a.priority - b.priority));
  const [cards, setCards] = useState(deck.slice(0,2));

console.table(deck)
console.table(cards)

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
    data[index].days_delay = Math.floor((Date.now() - data[index].last_viewed) / CARD_PICKER.ms_days);
    data[index].last_viewed = Date.now();
    data[index].score = SCORES[`${swipe}`];
    data[index].priority = Number('' + SCORES[`${swipe}`] + Date.now());

    if (data[index].days_delay > CARD_PICKER.max_days) {
      data[index].days_delay = 0;
      data[index].score = Number(data[index].score + 10);
      data[index].priority = Number('' + data[index].score + Date.now());
    }
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

    setDeck(deck.sort((a, b) => a.priority - b.priority))
    console.log(deck)
    let nextCard;

    // TODO: introduce random
    let randomIndex = (Math.floor(Math.random() * deck.length))
    console.log(randomIndex)
    console.log(Math.ceil(CARD_PICKER.random*deck.length))
    if (randomIndex < Math.ceil(CARD_PICKER.random*deck.length)) {
      nextCard = deck[randomIndex] 
    } else {
      if (twoCards[0]._id === deck[0]._id) {
        console.table(deck[1])
        nextCard = deck[1]
      } else {
        console.table(deck[0])
        nextCard = deck[0]
      }
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
