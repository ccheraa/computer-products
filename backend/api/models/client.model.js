const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const clientSchema = new Schema(
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
const Client = mongoose.model('Client', clientSchema);

module.exports = Client;
