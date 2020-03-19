var express = require('express');
var router = express.Router();

let Invoice = require('../api/models/invoice.model');

// GET Invoice page...
router.route('/').get((req, res) => {
  const { duration, username, description } = req.query;
  const query = {};
  if (duration) {
    query.duration = duration;
  }
  if (username) {
    query.username = RegExp(username, 'i');
  }
  if (description) {
    query.description = RegExp(description, 'i');
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
  const username = req.body.username;
  const description = req.body.description;
  const duration = Number(req.body.duration);
  const date = Date.parse(req.body.date);

  const newInvoice = new Invoice({
    username,
    description,
    duration,
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
      invoice.username = req.body.username;
      invoice.description = req.body.description;
      invoice.duration = Number(req.body.duration);
      invoice.date = Date.parse(req.body.date);
      
      invoice.save()
        .then(() => res.json('Invoice Update...'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
