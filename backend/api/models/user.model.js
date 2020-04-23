const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;
const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true
    },
    username: {
      type: String,
      required: true
    },
    password: {
      type: String,
      require: true
    },
    permission: {
      type: String,
      require: false
    }
  },
  {
    timestamps: true,
  }
);

userSchema.methods.isValid = function(hashedpassword) {
  return bcrypt.compareSync(hashedpassword, this.password);
}

const User = mongoose.model('User', userSchema);

module.exports = User;
