// TODO: CHECK DIFF BETWEEN EXPO AND REACT-NATIVE VERSIONS
// const { Dimensions } = require('expo-constants');
const { Dimensions } = require('react-native');
const { width, height } = Dimensions.get('screen');


export const CARD = {
  // TODO: REINSTATE FOR FINAL PRODUCT
  // WIDTH: width * 0.9,
  // HEIGHT: height * 0.78,
  // TODO: DELETE FOR FINAL PRODUCT
  WIDTH: 500,
  HEIGHT: 900,
  BORDER_RADIUS: 20,
};

export const COLORS = {
  hard: '#ec5288',
  easy: '#6ee3b4',
  moderate: 'grey',
  redo: 'cyan',
};

export const SCORES = {
  default: 20,
  easy: 50,
  moderate: 30,
  hard: 20,
  again: 10,
};

export const SCORES_SORTABLE = {
  default: Number(`${SCORES.default}${Date.now()}`),
  easy: Number(`${SCORES.easy}${Date.now()}`),
  moderate: Number(`${SCORES.moderate}${Date.now()}`),
  hard: Number(`${SCORES.hard}${Date.now()}`),
  again: Number(`${SCORES.again}${Date.now()}`),
}