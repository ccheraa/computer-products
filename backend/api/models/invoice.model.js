const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const invoiceSchema = new Schema(
  {
    username: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    duration: {
      type: Number,
      required: true
    },
    date: {
      type: Date,
      default: Date.now,
      required: true
    }
  },
  {
    timestamps: true,
  }
);

const Invoice = mongoose.model('Invoice', invoiceSchema);

module.exports = Invoice;
