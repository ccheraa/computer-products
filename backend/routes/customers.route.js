var express = require('express');
var router = express.Router();

const customerController = require('../controllers/customers.controller');

// router.get('/', customerController.getCustomers);
// router.get('/:id', customerController.getCustomer);

let Client = require('../api/models/client.model');

// GET Client page...
router.route('/').get(async (req, res) => {
  const { clientCode, name, email, mobile } = req.query;
  const query = {};
  
  if (mobile) {
    query.mobile = mobile;
  }
  if (clientCode) {
    query.clientCode = RegExp(clientCode, 'i');
  }
  if (name) {
    query.name = RegExp(name, 'i');
  }
  if (email) {
    query.email = RegExp(email, 'i');
  }
  
  Client.find(query)
    .then(client => res.json(client))
    .catch(err => res.status(400).json('Error: ' + err));
});

// GET Client...
router.route('/:id').get(async (req, res) => {
  Client.findById(req.params.id)
    .then(client => res.json(client))
    .catch(err => res.status(400).json('Error: ' + err));
});

// ADD Client...
router.route('/add').post(async (req, res) => {
  // const { name, email, city, gender, isPermanent } = req.query;
  // const codeClient = req.body.codeClient;
  const clientCode = req.body.clientCode;
  const name = req.body.name;
  const email = req.body.email;
  const mobile = Number(req.body.mobile);
  const city = req.body.city.name;
  const gender = req.body.gender;

  const newClient = new Client({
    clientCode,
    name,
    email,
    mobile,
    city,
    gender,
  });

  newClient.save()
  .then(() => res.json('Client Added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

// DELETE Client...
router.route('/:id').delete((req, res) => {
  Client.findByIdAndDelete(req.params.id)
    .then(() => res.json('Client delete...'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// UPDATE Client...
router.route('/:id').put((req, res) => {
  Client.findById(req.params.id)
    .then(client => {
      client.name = req.body.name;
      client.email = req.body.email;
      client.mobile = Number(req.body.mobile);
      client.city = req.body.city;
      client.gender = req.body.gender;
      
      client.save()
        .then(() => res.json('Client Update...'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
