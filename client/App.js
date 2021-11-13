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
  
  const [cards, setCards] = useState(data);
  const [cardIndex, setCardIndex] = useState(0);
  const [face, setFace] = useState('front');
  console.log(cards);

  // TODO: implement when connecting to database for data retreival
  async function fetchDeck () {
    console.log('fetchDeck function ran')
  }

  // TODO: activate when connecting to database
  useEffect(() => {
    fetchDeck()
  },[])

  function handleLeftSwipe () {
    console.log('LEFT SWIPE')
  }

  function swipeComplete () {
    console.log('SWIPE COMPLETE')
    // TODO: 
  }

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.cards}>

        {/* {data.length > 1 && (
          <Card card={cards[cardIndex+0]}/>
        )} */}

        {data.length > 1 && <Swipes currentIndex={cardIndex} cards={cards}></Swipes>
          }

      </View>
      <Footer />
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
