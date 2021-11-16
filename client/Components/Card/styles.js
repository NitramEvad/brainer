import { StyleSheet } from 'react-native';
import { CARD, COLORS } from '../../Constants/constants';

export const styles = StyleSheet.create({
  
  container: {
    position: 'absolute',

    // TODO: FIX: SHADOW NOT WORKING
    // shadowColor: 'grey',
    // shadowOffset: {
    //   height: 5,
    //   width: 5,
    // },
    // elevation: 11,
    // shadowOpacity: 0.3,
    // shadowRadius: 20,
  },
  
  image: {
    borderRadius: CARD.BORDER_RADIUS,
    height: CARD.HEIGHT*.7,
    width: CARD.WIDTH*.7,
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
    top: 370,
    transform: [{rotate: '-10deg'}],
  },

  boxText: {
    fontSize: 25,
    fontWeight: 'bold',
  },

  // FLASH CARD CONTENTS
  // TODO: FIX TEXT SKEWING TO THE LEFT
  textContent: {
    position: 'absolute',
    alignItems: 'center',
    top: 15,
    padding: 10,
    height: 578,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },  
  
  question: {
    position: 'absolute',
    transform: [{rotate: '-30deg'}],
    fontSize: 18,
    left: -170,
    top: -10,
  },

  answer: {
    position: 'absolute',
    transform: [{rotate: '30deg'}],
    fontSize: 18,
    left: 100,
    top: -10,
    },

  questionMain: {
    marginTop: 30,
  },
  
  textMain: {
    textAlign: 'center',
    fontFamily: 'aad',
    fontSize: 35,
  },

  textShadow: {
    textShadowColor: 'grey',
    textShadowOffset: { width: 2, height: 2},
    textShadowRadius: 10,
  },

  // TODO: Make sticky to bottom of card
  statsBlock: {
    flexDirection:'column',
    // position: 'absolute',
    // TODO: CHANGE TO 480 ONCE COUNTSROW IS DELETED
    // top: 230,
    bottom: 10,
  },
  
  stats: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },

  countsRow: {
    alignItems: 'center',
    bottom: -30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    
  },

  pill: {
    borderRadius: 10,
    borderStyle: 'solid',
    borderWidth: 1,
    fontSize:14,
    margin: 2,
    marginTop: 1,
    padding: 1,
    paddingLeft: 10,
    paddingRight: 10,
  },
})