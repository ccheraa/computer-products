const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const productSchema = new Schema(
  {
    productCode: {
      type: String,
      required: true
    },
    definition: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true
    },
    quantity: {
      type: Number,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    file: {
      type: String,
    }
  },
  {
    timestamps: true
  }
);
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
