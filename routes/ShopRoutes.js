const express = require('express');
const router = express.Router();

const ShopController = require("../controllers/ShopController");

router.post('/create/:ShopOwner',ShopController.createShop);
router.put('/selectType/:shopId',ShopController.ChoosingShopType);
router.get('/items/:shop_id',ShopController.getShopItems);

module.exports = router;