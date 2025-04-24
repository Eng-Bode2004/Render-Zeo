const express = require('express');
const router = express.Router();
const ShopOwnerProfileController = require('../controllers/ShopOwnerProfileController');
const UserController = require("../controllers/UserController");

router.post('/create/:User',ShopOwnerProfileController.createShopOwnerProfile);

module.exports = router;