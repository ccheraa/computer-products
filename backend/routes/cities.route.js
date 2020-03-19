const express = require('express');
const router = express.Router();

let City = require('../api/models/city.model');

// Get City...
router.route('/').get((req, res) => {
  City
    .find()
    .then(city => res.json(city))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
