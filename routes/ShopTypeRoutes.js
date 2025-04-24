const ShopTypeController = require("../controllers/ShopTypeController");

const express = require("express");
const router = express.Router();


router.post("/create",ShopTypeController.createShopType);
router.get("/",ShopTypeController.getAllShopTypes);

module.exports = router;
