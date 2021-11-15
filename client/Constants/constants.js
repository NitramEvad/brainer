// TODO: CHECK DIFF BETWEEN EXPO AND REACT-NATIVE VERSIONS
// const { Dimensions } = require('expo-constants');
const { Dimensions } = require('react-native');
const { width, height } = Dimensions.get('screen');


export const CARD = {
  BORDER_RADIUS: 20,
  // TODO: REINSTATE FOR FINAL PRODUCT
  // HEIGHT: height * 0.78,
  // WIDTH: width * 0.9,
  // TODO: DELETE FOR FINAL PRODUCT
  HEIGHT: 900,
  WIDTH: 500,
  
};

export const COLORS = {
  hard: 'hsl(339, 80%, 62%)',
  easy: '	hsl(156, 68%, 66%)',
  moderate: 'hsl(0, 0%, 50%)',
  redo: 'hsl(180, 100%, 50%)',
};

export const SCORES = {
  default: 20,
  easy: 50,
  moderate: 30,
  hard: 20,
  redo: 10,
};

export const SCORES_SORTABLE = {
  default: Number(`${SCORES.default}${Date.now()}`),
  easy: Number(`${SCORES.easy}${Date.now()}`),
  moderate: Number(`${SCORES.moderate}${Date.now()}`),
  hard: Number(`${SCORES.hard}${Date.now()}`),
  redo: Number(`${SCORES.redo}${Date.now()}`),
}