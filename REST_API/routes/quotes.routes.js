const express = require('express');

const quotesController = require('../controller/quotes.controller');

const router = express.Router();

router.get('/', quotesController.getRandomQuote);

module.exports = router;