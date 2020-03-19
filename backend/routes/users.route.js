const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

let User = require('../api/models/user.model');

var decodedToken = '';

function verifyToken(req, res, next) {
  let token = req.query.token;

  jwt.verify(token,'secret', function(err, tokendata) {
    if (err) {
      return res.status(400).json({
        message: 'Unauthorized request'
      });
    }
    if (tokendata) {
      decodedToken = tokendata;
      next();
    }
  });
}

function verifyTokenTest(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).send('Unauthorized request');
  }

  let token = req.headers.authorization.split(' ')[1];
  if (token === 'null') {
    return res.status(401).send('Unauthorized request');  
  }

  let payload = jwt.verify(token, 'secretKey');
  if (!payload) {
    return res.status(401).send('Unauthorized request')    
  }
  req.userId = payload.subject
  next()
}

// ADD users listing ...
const bcrypt = require('bcryptjs');

router.route('/signup').post(async (req, res) => {
  bcrypt.hash(req.body.password, 10).then(
    (hash) => {
      const newUser = new User({
        email: req.body.email,
        username: req.body.username,
        password: hash
      });

      let promise = newUser.save();

      promise.then((user) => {
        if (user.isValid(req.body.password)) {
          // Generate token ...
          let token = jwt.sign({username: user.username}, 'secret', {expiresIn: '2h'});
          return res.status(200).json(token);
        }
        else {
          return res.status(501).json({
            message: 'Invalid credentials'
          });
        }
      });

      promise.catch((error) => {
        return res.status(501).json({
          message: 'Error registering user ...',
          error: error
        });
      });
    }
  );
});

// Connected users ...
router.route('/signin').post(async (req, res) => {
  let promise = User.findOne({
    email: req.body.email
  }).exec();

  promise.then((user) => {
    if (user) {
      if (user.isValid(req.body.password)) {
        // Generate token ...
        let token = jwt.sign({username: user.username}, 'secret', {expiresIn: '2h'});
        return res.status(200).json(token);
      }
      else {
        return res.status(501).json({
          message: 'Invalid credentials'
        });
      }
    }
    else {
      return res.status(501).json({
        message: 'User email is not registered...'
      });
    }
  });

  promise.catch(
    (error) => {
      return res.status(501).json({
        message: 'Some internal error'
      });
    }
  );
});

// Get user
router.route('/username').get(verifyToken, (req, res) => {
  return res.status(200).json(decodedToken.username);
});

// router.get('/username', verifyToken, function(req, res) {
//   return res.status(200).json(decodedToken.username);
// })

module.exports = router;
