var express = require('express');
var router = express.Router();

const invoiceController = require('../controllers/invoices.controller');

router.get('/', invoiceController.getInvoices);
router.get('/:id', invoiceController.getInvoice);

router.post('/add', invoiceController.addInvoice);
router.put('/:id', invoiceController.updateInvoice);
router.delete('/:id', invoiceController.deleteInvoice);

let Invoice = require('../api/models/invoice.model');

module.exports = router;
