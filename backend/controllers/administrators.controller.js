let Administrator = require('../api/models/administrator.model');

// ADD Administrator 
const bcrypt = require('bcryptjs');
exports.addAdministrator = async (req, res) => {
  bcrypt.hash(req.body.password, 10).then(
    (hash) => {
      const newAdmin = new Administrator({
        user_create: req.body.user_create,
        password: hash,
      });

      let promise = newAdmin.save();
      promise.then(
        (admin) => {
          return res.status(200).json('Administrator Added');
        }
      );

      promise.catch(
        (error) => {
          return res.status(501).json({
            message: 'Error registering administrator',
            error: error
          });
        }
      );
    }
  );
}

// Connected users
exports.userAuthorized = async (req, res) => {
  let promise = Administrator.findOne({
    user_create: req.body.user_create
  }).exec();

  promise.then(
    (admin) => {
      if (admin) {
        if (admin.isValid(req.body.password)) {
          return res.status(200).json(admin);
        } else {
          return res.status(501).json({
            message: 'Invalid credentials'
          });
        }
      } else {
        return res.status(501).json({
          message: 'User is not registered'
        });
      }
    }
  );

  promise.catch(
    (error) => {
      return res.status(501).json({
        message: 'Some internal error'
      });
    }
  );
}
