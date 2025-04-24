const express = require('express');
const router = express.Router();

const BankAccountController = require('../controllers/BankAccountController');

router.post('/create/:account_holder', BankAccountController.createBankAccount);

module.exports = router;