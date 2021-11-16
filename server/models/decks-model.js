const mongoose = require('mongoose');
const Schema = mongoose.Schema;

import { SCORES } from '../../Client/Constants/constants';

const CardSchema = new Schema({

  front_field_main: { type: String, required: true, default: '?'},
  front_field_option_1: { type: String, default: '?'},
  front_field_option_2: { type: String, default: '?'},
  front_field_option_3: { type: String, default: '?'},
  answer_main: { type: String, default: '?'},
  answer_option_1: { type: String, default: '?'},
  score: { type: Number, default: Number('' + SCORES.default + Date.now())},
  times_viewed: { type: Number, default: 0},
  last_viewed: { type: Date, default: ''},
  owner: { type: String, default: 'Dave'},
  deck: { type: Array, default: ['Default']},
  count_easy: { type: Number, default: 0},
  count_moderate: { type: Number, default: 0},
  count_hard: { type: Number, default: 0},
  count_again: { type: Number, default: 0},
});


module.exports = mongoose.model('Card', CardSchema);