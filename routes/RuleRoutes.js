const express = require('express');
const router = express.Router();
const RuleController = require('../controllers/RulesController');

router.post("/create", RuleController.createRule);
router.get("/", RuleController.getAllRules);

module.exports = router;