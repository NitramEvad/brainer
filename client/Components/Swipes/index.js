import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import { RectButton } from 'react-native-gesture-handler'
import Card from '../Card'

export default function Swipes ({cards, currentIndex, handleLeftSwipe}) {
  
  const renderLeftActions = () => {
    return (
      <RectButton style={styles.container}>
        <Card card={cards[currentIndex + 1]}></Card>
      </RectButton>
    )
  }

  const renderRightActions = () => {
    return (
      <RectButton style={styles.container}>
        <Card card={cards[currentIndex + 1]}></Card>
      </RectButton>
    )
  }
  
  return (
    <Swipeable
      friction={1}
      leftThreshold={10}
      rightThreshold={10}
      renderLeftActions={renderLeftActions}
      renderRightActions={renderRightActions}
      onSwipeableLeftOpen={handleLeftSwipe}
    >
      <Card card={cards[currentIndex]}></Card>
    </Swipeable>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
}) 
