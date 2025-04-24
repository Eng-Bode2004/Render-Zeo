const UserController = require("../controllers/UserController");

const express = require('express');
const router = express.Router();

router.post("/register", UserController.registerUser);
router.put("/:userId/rule", UserController.assignUser);
router.post('/login', UserController.loginUser);
router.get('/profile/:userId', UserController.getUserProfile);


module.exports = router;