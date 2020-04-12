const express = require('express');
const router = express.Router();

let Category = require('../api/models/category.model');

// Get Category...
router.route('/').get((req, res) => {
  Category
    .find()
    .then(category => res.json(category))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
