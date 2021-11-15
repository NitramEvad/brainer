import { StyleSheet } from 'react-native';
import { CARD, COLORS } from '../../Constants/constants';

export const styles = StyleSheet.create({
  
  container: {
    position: 'absolute',

    // TODO: FIX: SHADOW NOT WORKING
    // shadowColor: 'grey',
    // shadowOffset: {
    //   height: 10,
    //   width: 5,
    // },
    // elevation: 11,
    // shadowOpacity: 0.3,
    // shadowRadius: 20,
  },
  
  image: {
    borderRadius: CARD.BORDER_RADIUS,
    height: CARD.HEIGHT-200,
    width: CARD.WIDTH,
  },

  gradient: {
    borderRadius: CARD.BORDER_RADIUS,
    bottom: 0,
    height: 150,
    left: 0,
    position: 'absolute',
    right: 0,
  },

  // CORNER TAGS

  swipesTag: {
    position: 'absolute',
    top: 200,
  },

  easyTag: {
    left: 30,
    transform: [{ rotate: '-30deg' }],
  },
  
  hardTag: {
    right: 30,
    transform: [{rotate: '30deg'}],
  },

  redoTag: {
    left: '35%',
    top: -10,
    transform: [{rotate: '10deg'}],
  },
  
  moderateTag: {
    left: '20%',
    top: 200,
    transform: [{rotate: '-10deg'}],
  },

  boxText: {
    fontSize: 25,
    fontWeight: 'bold',
  },

  // FLASH CARD CONTENTS

  textContent: {
    position: 'absolute',
    top: 30,
    padding: 10,
  },  
  
  questionMain: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },

  textMain: {
    fontSize: 50,
  },

  textShadow: {
    textShadowColor: 'grey',
    textShadowOffset: { width: 2, height: 2},
    textShadowRadius: 10,
  },
  
  questionSecondary: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  textSecondary: {
    fontSize: 40,
  },

  // TODO: Make sticky to bottom of card
  statsBlock: {
    position: 'absolute',
    top: 500,
  },

  stats: {
    alignItems: 'space-between',
  },

  countsRow: {
    alignItems: 'flex-end',
    bottom: -30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    
  },

  pill: {
    borderRadius: 10,
    borderStyle: 'solid',
    borderWidth: 1,
    fontSize:14,
    margin: 4,
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
  },
})