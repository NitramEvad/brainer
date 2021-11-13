import { StatusBar} from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Constants from 'expo-constants';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Swipes from './Components/Swipes';
import Card from './Components/Card';
import data from './data.js';


export default function App () {
  const colorTheme = {
    brainderRed: '#ec5288',
    brainderGreen: '#6ee3b4',
    brainderGrey: 'grey',
    brainderBlue: 'blue',
  }

  const [cards, setCards] = useState(data);
  const [cardIndex, setCardIndex] = useState(0);
  const [face, setFace] = useState('front');
  console.log(cards);

  // TODO: implement when connecting to database for data retreival
  async function fetchDeck () {
    console.log('fetchDeck function ran')
  }
  useEffect(() => {
    fetchDeck()
  },[])

  function handleLeftSwipe () {
    cards[cardIndex].times_viewed = 5;
    updateCardDetails();
    nextCard();
  }
  
  function handleRightSwipe () {
    cards[cardIndex].times_viewed = 20;
    updateCardDetails();
    nextCard();
  }
  
  function updateCardDetails () {
    cards[cardIndex].times_viewed += 1;
    cards[cardIndex].last_viewed = Date.now();
  }
  // ENSURES A CARD WILL ALWAYS BE VISIBLE UNDER THE CURRENT ONE
  function nextCard () {
    let nextCard = cards.length - 2 === cardIndex ? 0 : cardIndex + 1;
    console.table(cards)
    setCardIndex(nextCard);
  }
  
  function easyHandler () {
    console.log('EASY');
  }
  
  function moderateHandler () {
    console.log('MODERATE');
  }

  function hardHandler () {
    console.log('HARD');
  }

  function againHandler () {
    console.log('MODERATE');
  }

  function tapHandler () {
    console.log('TAP');

  }

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.cards}>

        {
          // TODO: swap MAP for index generator
          cards.map(
            (card, index) =>
              cardIndex === index &&
              <Swipes
                key={card._id}
                cardIndex={cardIndex}
                cards={cards}
                handleLeftSwipe={handleLeftSwipe}
                handleRightSwipe={handleRightSwipe}>
              </Swipes>

          )}
        

      </View>
      <Footer
        // easyHandler={easyHandler}
        // moderateHandler={moderateHandler}
        // hardHandler={hardHandler}
        // againHandler={againHandler}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: Constants.statusBarHeight,
  },
  cards: {
    // alignItems: 'center',
    // justifyContent: 'center',
    flex: 1,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  }
});
