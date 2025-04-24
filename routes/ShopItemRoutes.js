const express = require('express');
const router = express.Router();

const ShopItemController = require('../controllers/ShopItemController');

router.post('/:shop_id',ShopItemController.CreateShopItems);

module.exports = router;