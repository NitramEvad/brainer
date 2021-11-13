const Deck = require('../models/decks-model');

const getDecks = async (req, res) => {
  try {
    const decks = await Deck.find();
    res.send(decks);
  } catch (error) {
    console.log('getDecks error: ', error);
    res.status(500);
  }
};

const postDeck = async (req, res) => {
  try {
    const {
      deck_name,
      deck_owner,
      deck_cards,
      card_scores

    } = req.body;
    const deck = await Deck.create({
      deck_name,
      deck_owner,
      deck_cards,
      card_scores
    });
    res.status(201);
    res.send(deck);
  } catch (error) {
    console.log('postDecks error: ', error);
    res.status(500);
  }
};

const getCards = async (req, res) => {
  try {
    const cards = await Card.find();
    res.send(cards);
  } catch (error) {
    console.log('getCard error: ', error);
    res.status(500);
  }
};

const postCard = async (req, res) => {
  try {
    const {
      front_field_main,
      front_field_option_1,
      front_field_option_2,
      front_field_option_3,
      answer_main,
      answer_option_1,
      score,
      times_viewed,
      last_viewed,
      owner,
      deck_name,
      count_easy,
      count_moderate,
      count_hard,
      count_again,
    } = req.body;
    const card = await Card.create({
      front_field_main,
      front_field_option_1,
      front_field_option_2,
      front_field_option_3,
      answer_main,
      answer_option_1,
      score,
      times_viewed,
      last_viewed,
      owner,
      deck_name,
      count_easy,
      count_moderate,
      count_hard,
      count_again,
    });
    res.status(201);
    res.send(deck);
  } catch (error) {
    console.log('postDecks error: ', error);
    res.status(500);
  }
};

module.exports = {
  getDecks,
  postDeck,
  getCards,
  postCard,
}