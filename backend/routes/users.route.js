const express = require('express');
const router = express.Router();

const verifyToken = require('../middlewares/authentication.middleware');
const userController = require('../controllers/users.controller');

router.get('/', userController.getUsers);
router.get('/username', [verifyToken, userController.getUserToken]);

router.post('/signup', userController.signup);
router.post('/signin', userController.signin);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;
