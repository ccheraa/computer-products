const jwt = require('jsonwebtoken');

let User = require('../api/models/user.model');

// GET user list page
exports.getUsers = async (req, res) => {
  const { username, email, permission } = req.query;
  const query = {};

  if (username) {
    query.username = RegExp(username, 'i');
  }
  if (permission) {
    query.permission = RegExp(permission, 'i');
  }

  User.find(query)
    .then((user) => res.json(user))
    .catch(() => res.status(501).json({
      message: 'Users not found.'
    }));
};

// GET user token
exports.getUserToken = (req, res) => {
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
        password: hash,
        permission: req.body.permission
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
          message: 'Error registering user',
          error: error
        });
      });
    }
  );
}

// UPDATE user
exports.updateUser = (req, res) => {
  User.findById(req.params.id).then(
    (user) => {
      user.permission = req.body.permission;

      let promise = user.save();
      promise.then(
        () => {
          return res.status(200).json({
            message: 'User authorized',
          })
        }
      );

      promise.catch(
        (error) => {
          return res.status(501).json({
            message: 'Error failed user',
            error: error
          });
        }
      );
    }
  ).catch(err => res.status(400).json('Error: ' + err));
};

// Connected users
exports.signin = async (req, res) => {
  let promise = User.findOne({
    email: req.body.email
  }).exec();

  promise.then((user) => {
    if (user) {
      if (user.permission === 'authorized') {
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
          message: 'User is not authorized'
        });
      }
    }
    else {
      return res.status(501).json({
        message: 'User email is not registered'
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

// DELETE user
exports.deleteUser = (req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(() => res.json('User delete.'))
    .catch(() => res.status(501).json({
      message: 'User not found !'
    }));
}
