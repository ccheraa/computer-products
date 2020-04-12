var express = require('express');
var router = express.Router();

const invoiceController = require('../controllers/invoices.controller');

let Invoice = require('../api/models/invoice.model');

// GET Invoice page...
router.route('/').get((req, res) => {
  const { invoiceCode, clientCode, productCode, designation } = req.query;
  const query = {};

  if (invoiceCode) {
    query.invoiceCode = RegExp(invoiceCode, 'i');
  }
  if (clientCode) {
    query.clientCode = RegExp(clientCode, 'i');
  }
  if (productCode) {
    query.productCode = RegExp(productCode, 'i');
  }
  if (designation) {
    query.designation = RegExp(designation, 'i');
  }

  Invoice.find(query)
    .then(invoice => res.json(invoice))
    .catch(err => res.status(400).json('Error: ' + err));
});

// GET Invoice...
router.route('/:id').get((req, res) => {
  Invoice.findById(req.params.id)
    .then(invoice => res.json(invoice))
    .catch(err => res.status(400).json('Error: ' + err));
});

// ADD Invoice...
router.route('/add').post((req, res) => {
  const invoiceCode = req.body.invoiceCode;
  const clientCode = req.body.clientCode;
  const productCode = req.body.productCode;
  const designation = req.body.designation;
  const amount = Number(req.body.amount);
  const unitPrice = Number(req.body.unitPrice);
  const total = parseInt(req.body.amount) * parseInt(req.body.unitPrice);
  const date = Date.parse(req.body.date);

  const newInvoice = new Invoice({
    invoiceCode,
    clientCode,
    productCode,
    designation,
    amount,
    unitPrice,
    total,
    date,
  });

  newInvoice.save()
    .then(() => res.json('Invoice Added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// DELETE Invoice...
router.route('/:id').delete((req, res) => {
  Invoice.findByIdAndDelete(req.params.id)
    .then(() => res.json('Invoice delete...'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// UPDATE Invoice...
router.route('/:id').put((req, res) => {
  Invoice.findById(req.params.id)
    .then(invoice => {
      invoice.invoiceCode = req.body.invoiceCode;
      invoice.clientCode = req.body.clientCode;
      invoice.productCode = req.body.productCode;
      invoice.designation = req.body.designation;
      invoice.amount = Number(req.body.amount);
      invoice.unitPrice = Number(req.body.unitPrice);
      invoice.total = parseInt(req.body.amount) * parseInt(req.body.unitPrice);
      invoice.date = Date.parse(req.body.date);
      
      invoice.save()
        .then(() => res.json('Invoice Update...'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
