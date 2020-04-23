const express = require('express');
const router = express.Router();

const administratorController = require('../controllers/administrators.controller');

router.post('/add', administratorController.addAdministrator);
router.post('/authorized', administratorController.userAuthorized);

module.exports = router;
