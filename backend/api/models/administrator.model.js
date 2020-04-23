const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;
const administratorSchema = new Schema(
  {
    user_create: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

administratorSchema.methods.isValid = function(hashedpassword) {
  return bcrypt.compareSync(hashedpassword, this.password);
}

const Administrator = mongoose.model('Administrator', administratorSchema);

module.exports = Administrator;
