var express = require('express');
var router = express.Router();

const customerController = require('../controllers/customers.controller');

router.get('/', customerController.getCustomers);
router.get('/:id', customerController.getCustomer);

router.post('/add', customerController.addCustomer);
router.put('/:id', customerController.updateCustomer);
router.delete('/:id', customerController.deleteCustomer);

module.exports = router;
