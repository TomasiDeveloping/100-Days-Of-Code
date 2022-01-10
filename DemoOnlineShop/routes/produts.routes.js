const express = require('express');

const produtsController = require('../controllers/products.controller');

const router = express.Router();

router.get('/products', produtsController.getAllProducts);

router.get('/products/:id', produtsController.getProductDetails);

module.exports = router;