const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let petSchema = new Schema(
  {
    photo: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    breed: {
      type: String,
      required: true,
    },
    weight: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    height: {
      type: String,
    },
    hypoallegenic: {
      type: Boolean,
      required: true,
    },
    dietaryRestrictions: {
      type: String,
      default: '',
    },
    dateListed: {
      type: String,
      default: new Date().toLocaleDateString(),
    },
    bio: {
      type: String,
      required: true,
    },
  },
  {
    collection: 'pets',
  }
);

module.exports = mongoose.model('Pet', petSchema);
