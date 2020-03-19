const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const clientSchema = new Schema(
  {
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
      required: false
    },
    gender: {
      type: String,
      required: false
    },
    hireDate: {
      type: Date,
      default: Date.now,
      required: true
    },
    isPermanent: {
      type: String,
      required: false
    }
  },
  {
    timestamps: true
  }
);
const Client = mongoose.model('Client', clientSchema);

module.exports = Client;
