const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 6,
    max: 255
  },
  email: {
    type: String,
    required: true,
    unique: true,
    min: 6,
    max: 255
  },
  phone: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    min: 6,
    max: 1024
  },
  age: {
    type: Number,
    required: true,
    min: 18,
    max: 65
  },
  gender: {
    type: String,
    enum: ["male", "female"]
  },
  hobby: {
    type: String,
    min: 3,
    max: 255
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("User", userSchema);
