import React, { useEffect, useState } from 'react'
import { Animated, StyleSheet, Text, TouchableWithoutFeedback, View, } from 'react-native'
import { PanGestureHandler, RectButton } from 'react-native-gesture-handler'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import Card from '../Card'

export default function Swipes ({ cards, cardIndex, handleLeftSwipe, handleRightSwipe }) {
  
  const [cardSide, setCardSide] = useState(true);
  const [easySwipe, setEasySwipe] = useState(false);
  const [hardSwipe, setHardSwipe] = useState(false);
  
  const renderLeftActions = () => {
    return (
      <RectButton style={styles.container}>
        <Card card={cards[cardIndex + 1]}></Card>
      </RectButton>
    )
  }

  const renderRightActions = () => {
    return (
      <RectButton style={styles.container}>
        <Card card={cards[cardIndex + 1]}></Card>
      </RectButton>
    )
  }

  const flipCard = () => {
    console.log('FLIP pressed')
  }
  
  return (
    <Swipeable
      friction={1}
      leftThreshold={10}
      rightThreshold={10}
      renderLeftActions={renderLeftActions}
      renderRightActions={renderRightActions}
      onSwipeableLeftOpen={() => {
        setEasySwipe(false)
        handleLeftSwipe()
      }}
      onSwipeableRightOpen={() => {
        setHardSwipe(false)
        handleRightSwipe()
      }}
      onSwipeableLeftWillOpen={() => setEasySwipe(true)}
      onSwipeableRightWillOpen={() => setHardSwipe(true)}
    >
      <Card
        card={cards[cardIndex]}
        easySwipe={easySwipe}
        hardSwipe={hardSwipe}
      >
      </Card>
    </Swipeable>

    // <PanGestureHandler>
    //           <Card
    //     card={cards[cardIndex]}
    //     easySwipe={easySwipe}
    //     hardSwipe={hardSwipe}
    //   >
    //   </Card>
    // </PanGestureHandler>
    
    
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
}) 
