const express = require('express');
const router = express.Router();
const deck = require('./controllers/decks-controller.js');

router.get('/deck', deck.getDecks);
router.post('/deck', deck.postDeck);
router.get('/card', deck.getCards);
router.post('/card', deck.postCard);

module.exports = router