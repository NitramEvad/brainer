import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useRef, useState,  } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View, } from 'react-native';
import Constants from 'expo-constants';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Swipes from './Components/Swipes';
import data from './data.js';
import Card from './Components/Card';
import CardFlip from 'react-native-card-flip';

//  TODO: implement
// import Card from './Components/Card';



  const colorTheme = {
    brainderRed: '#ec5288',
    brainderGreen: '#6ee3b4',
    brainderGrey: 'grey',
    brainderBlue: 'cyan',
  }

  const scores = {
    default: 20,
    easy: 50,
    moderate: 30,
    hard: 20,
    again: 10,
  }

  const scoresFull = {
    default: Number(`${scores.default}${Date.now()}`),
    easy: Number(`${scores.easy}${Date.now()}`),
    moderate: Number(`${scores.moderate}${Date.now()}`),
    hard: Number(`${scores.hard}${Date.now()}`),
    again: Number(`${scores.again}${Date.now()}`),
  }
  
  const [cards, setCards] = useState(data);
  const [cardIndex, setCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  
  console.table(cards);

  
  // TODO: implement when connecting to database for data retreival
  async function fetchDeck () {
    console.log('fetchDeck function ran')
  }
  useEffect(() => {
    fetchDeck()
  },[])
  
  // ENSURES A CARD WILL ALWAYS BE VISIBLE UNDER THE CURRENT ONE
  function updateCardDetails (swipe) {
    cards[cardIndex].times_viewed += 1;
    cards[cardIndex].last_viewed = Date.now();
    cards[cardIndex].score = scoresFull[`${swipe}`];
    cards[cardIndex][`count_${swipe}`] += 1;
    nextCard();
  }

  //  TODO: fix: skipping last card and moving to zero, but crashing if length-2 not used
  function nextCard () {
    let nextCard = cardIndex === cards.length - 2 ? 0 : cardIndex + 1;
    console.table('1. CARDS: ', cards)
    console.table('2. nextCard: ', nextCard)
    console.table('3. cardIndex: ',cardIndex)
    setCardIndex(nextCard);
  }

  function handleLeftSwipe () {
    console.log('LEFT - easy');
    updateCardDetails('easy');
  }
  
  function handleRightSwipe () {
    console.log('RIGHT - hard');
    updateCardDetails('hard');
  }

  function handleFlip () {
    console.log('FLIP clicked')
    setIsFlipped(isFlipped ? false : true)
  }

  return (
    <View style={styles.container}>

      <Header
        // handleLeftSwipe={handleLeftSwipe}
        // handleRightSwipe={handleRightSwipe}
      >
      </Header>

      <View style={styles.cards}>

        {/* TODO: NEW STYLE */}
        {
          cards.map(( card ) => {
            return (
              <Card 
                key={card._id}
                // answer_main={card.answer_main}
                // count_easy={card.count_easy}
                // count_moderate={card.count_moderate}
                // count_hard={card.count_hard}
                // count_again={card.count_again}
                // deck={card.deck}
                // score={card.score}
                // times_viewed={card.times_viewed}
                // last_viewed={card.last_viewed}
                // owner={card.owner}
                // uri={card.uri}
              >
              </Card>
            )
          })
        }

        {/* TODO: TEST DECK - SINGLE CARD */}
            {/* <Card
              card={cards[cardIndex]}
              side={'front'}
              >
            </Card>     */}
        
        {/* TODO: Cardflip test */}
        {/* <CardFlip ref={(card) => isFlipped}>

          <TouchableOpacity onPress={() => handleFlip()}>
            <Text>Hello</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => handleFlip()}>
            <Text>Nope</Text>
          </TouchableOpacity>

        </CardFlip> */}



        {/* TODO: ACTUAL DECK - CARD ITERATOR */}
        {/* {
          cards.map(
            (card, index) => 
              // console.log('CARD ', card)
              // console.log('INDEX/CARDINDEX ', index, ' / ', cardIndex )
              cardIndex === index &&
                <Swipes
                  key={card._id}
                  cardIndex={cardIndex}
                  cards={cards}
                  // face={face}
                  handleLeftSwipe={handleLeftSwipe}
                  handleRightSwipe={handleRightSwipe}>
                </Swipes>
          )
        } */}
        

      </View>
      <Footer
        // TODO: maybe reinstate
        // easyHandler={easyHandler}
        // moderateHandler={moderateHandler}
        // hardHandler={hardHandler}
        // againHandler={againHandler}
      />
      <StatusBar style="auto" />

    </View>
  );
}
