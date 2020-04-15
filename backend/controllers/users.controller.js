const jwt = require('jsonwebtoken');

let User = require('../api/models/user.model');

// Get user
exports.getUser = (req, res) => {
  return res.status(200).json(decodedToken.username);
}

// ADD users listing
const bcrypt = require('bcryptjs');
exports.signup = async (req, res) => {
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
}

// Connected users
exports.signin = async (req, res) => {
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
}
