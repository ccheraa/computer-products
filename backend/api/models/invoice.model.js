const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const invoiceSchema = new Schema(
  {
    invoiceCode: {
      type: String,
      required: false
    },
    clientCode: {
      type: String,
      required: false
    },
    productCode: {
      type: String,
      required: false
    },
    designation: {
      type: String,
      required: false
    },
    quantity: {
      type: Number,
      required: false
    },
    unitPrice: {
      type: Number,
      required: false
    },
    date: {
      type: Date,
      default: Date.now,
      required: false
    },
    total: {
      type: Number
    }
  },
  {
    timestamps: true,
  }
);

const Invoice = mongoose.model('Invoice', invoiceSchema);

module.exports = Invoice;
