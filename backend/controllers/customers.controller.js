let Customer = require('../api/models/client.model');

// GET Customer page
exports.getCustomers = async (req, res) => {
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

  Customer.find(query)
    .then((customer) => res.json(customer))
    .catch(() => res.status(501).json({
      msg: 'Customer not found'
    }));
}

// GET Customer
exports.getCustomer = async (req, res) => {
  Customer.findById(req.params.id)
    .then((customer) => res.json(customer))
    .catch((error) => {
      return res.status(501).json({
        msg: 'Customer not found',
        error: error
      });
    });
}

// ADD Customer
exports.addCustomer = (req, res) => {
  const clientCode = req.body.clientCode;
  const name = req.body.name;
  const email = req.body.email;
  const mobile = Number(req.body.mobile);
  const city = req.body.city.name;
  const gender = req.body.gender;

  const newCustomer = new Customer({
    clientCode,
    name,
    email,
    mobile,
    city,
    gender,
  });

  let promise = newCustomer.save();
  promise.then(
    () => {
      return res.status(200).json({
        message: 'Customer Added!',
      })
    }
  );

  promise.catch(
    (error) => {
      return res.status(501).json({
        message: 'Error failed add customer',
        error: error
      });
    }
  );
}

// UPDATE Customer
exports.updateCustomer = (req, res) => {
  Customer.findById(req.params.id).then(
    (customer) => {
      customer.name = req.body.name;
      customer.email = req.body.email;
      customer.mobile = Number(req.body.mobile);
      customer.city = req.body.city;
      customer.gender = req.body.gender;

      let promise = customer.save();
      promise.then(
        () => {
          return res.status(200).json({
            message: 'Customer update',
          })
        }
      );

      promise.catch(
        (error) => {
          return res.status(501).json({
            message: 'Error failed update customer',
            error: error
          });
        }
      );
    }
  ).catch(err => res.status(400).json('Error: ' + err));
}

// DELETE Customer
exports.deleteCustomer = (req, res) => {
  Customer.findByIdAndDelete(req.params.id)
    .then(() => res.json('Customer delete'))
    .catch(() => res.status(501).json({
      msg: 'Customer not found'
    }));
}
