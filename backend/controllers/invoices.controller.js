let Invoice = require('../api/models/invoice.model');

// GET Invoice page
exports.getInvoices = async (req, res) => {
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
    .catch(() => res.status(501).json({
      msg: 'Invoice not found.'
    }));
}

// GET Invoice
exports.getInvoice = async (req, res) => {
  Invoice.findById(req.params.id)
    .then(invoice => res.json(invoice))
    .catch((error) => {
      return res.status(501).json({
        msg: 'Invoice not found.',
        error: error
      });
    });
}

// ADD Invoice
exports.addInvoice = async (req, res) => {
  const invoiceCode = req.body.invoiceCode;
  const clientCode = req.body.clientCode;
  const productCode = req.body.productCode;
  const designation = req.body.designation;
  // const amount = Number(req.body.amount);
  const quantity = Number(req.body.quantity);
  const unitPrice = Number(req.body.unitPrice);
  const total = parseInt(req.body.quantity) * parseInt(req.body.unitPrice);
  const date = Date.parse(req.body.date);

  const newInvoice = new Invoice({
    invoiceCode,
    clientCode,
    productCode,
    designation,
    quantity,
    unitPrice,
    total,
    date,
  });

  let promise = newInvoice.save();
  promise.then(
    () => {
      return res.status(200).json({
        message: 'Invoice Added!',
      })
    }
  );

  promise.catch(
    (error) => {
      return res.status(501).json({
        message: 'Error failed add invoice',
        error: error
      });
    }
  );
}

// UPDATE Invoice
exports.updateInvoice = (req, res) => {
  Invoice.findById(req.params.id).then(
    (invoice) => {
      invoice.invoiceCode = req.body.invoiceCode;
      invoice.clientCode = req.body.clientCode;
      invoice.productCode = req.body.productCode;
      invoice.designation = req.body.designation;
      // invoice.amount = Number(req.body.amount);
      invoice.quantity = Number(req.body.quantity);
      invoice.unitPrice = Number(req.body.unitPrice);
      invoice.total = parseInt(req.body.quantity) * parseInt(req.body.unitPrice);
      invoice.date = Date.parse(req.body.date);

      let promise = invoice.save();
      promise.then(
        () => {
          return res.status(200).json({
            message: 'Invoice update',
          })
        }
      );

      promise.catch(
        (error) => {
          return res.status(501).json({
            message: 'Error failed update invoice',
            error: error
          });
        }
      );
    }
  ).catch(err => res.status(501).json('Error: ' + err))
}

// DELETE Invoice
exports.deleteInvoice = (req, res) => {
  Invoice.findByIdAndDelete(req.params.id)
    .then(() => res.json('Invoice delete.'))
    .catch(() => res.status(501).json({
      msg: 'Invoice not found'
    }));
}
