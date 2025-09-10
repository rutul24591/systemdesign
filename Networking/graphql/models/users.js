const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minLength: 5,
    maxLength: 50
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minLength: 5,
    maxLength: 255
  },
  password: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 1024
  },
  isAdmin: { type: Boolean, default: false }
}, { timestamps: true });

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, isAdmin: this.isAdmin },
    "jwtPrivateKey" ///this must be stored in env and must be more complex
  );
  return token;
};

const User = mongoose.model('User', userSchema);

module.exports = User;