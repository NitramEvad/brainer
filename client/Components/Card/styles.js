import { StyleSheet } from 'react-native';
import { CARD, COLOR_THEME } from '../../Constants/constants';

const cornerStyle = {
  position: 'absolute',
  top: 5,
  padding: 8,
  borderWidth: 4,
  borderRadius: 10,
  backgroundColor: 'white',
  zIndex: 0,
}

export const styles = StyleSheet.create({
  
  
  container: {
    position: 'absolute',
  },
  
  image: {
    width: CARD.WIDTH,
    height: CARD.HEIGHT-200,
    borderRadius: CARD.BORDER_RADIUS,
  },

  gradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 250,
    borderRadius: CARD.BORDER_RADIUS,
  },

  // BOX BORDERS

  swipesBox: {
    position: 'absolute',
    top: 200,
  },

  easyBox: {
    left: 30,
    transform: [{ rotate: '-30deg' }],
    // backgroundColor: COLOR_THEME.brainderGreen,
  },
  
  hardBox: {
    right: 30,
    transform: [{rotate: '30deg'}],
  },

  // easyBox: {
  //   ...cornerStyle,
  //   top: '30%',
  //   left: -50,
  //   borderColor: '#6ee3b4',
  // },
  // hardBox: {
  //   ...cornerStyle,
  //   top: '30%',
  //   right: -50,
  //   borderColor: '#ec5288',
  // },
  againBox: {
    ...cornerStyle,
    top: -20,
    left: '40%',
    borderColor: 'cyan',
  },
  moderateBox: {
    ...cornerStyle,
    top: '95%',
    left: '40%',
    borderColor: 'grey',
  },

  // BOXTEXT
  boxText: {
    fontSize: 25,
    fontWeight: 'bold',
  },

  boxTextEasy: {
    color: '#6ee3b4',

  },
  boxTextHard: {
    color: '#ec5288',
  },
  boxTextModerate: {
    color: 'grey',

  },
  boxTextAgain: {
    color: 'cyan',
  },

  textContent: {
    position: 'absolute',
    top: 50,
    padding: 10,
  },  
  
  backgroundImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 20,
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
  textMinor: {
    fontSize: 8,
  },
  countsRow: {
    alignItems: 'flex-end',
    bottom: -80,
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