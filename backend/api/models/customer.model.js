const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const customerSchema = new Schema(
  {
    clientCode: {
      type: String,
      required: true,
      maxlength: 4
    },
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: false
    },
    mobile: {
      type: Number,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    gender: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);
const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
