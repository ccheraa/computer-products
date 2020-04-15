const express = require('express');
const router = express.Router();

const verifyToken = require('../middlewares/authentication.middleware');
const userController = require('../controllers/users.controller');

router.get('/username', [verifyToken, userController.getUser]);

router.post('/signup', userController.signup);
router.post('/signin', userController.signin);

module.exports = router;
