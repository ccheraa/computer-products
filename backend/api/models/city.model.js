const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const citySchema = new Schema(
  {
    code: {
      type: Number,
      required: false,
    },
    name: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true,
  }
);

const City = mongoose.model('City', citySchema);

module.exports = City;
