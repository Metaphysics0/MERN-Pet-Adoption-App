const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let profileSchema = new Schema(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    bio: {
      type: String,
    },
    phone: {
      type: String,
    },
    email: {
      type: String,
    },
  },
  {
    timestamps: true,
    collection: 'userProfiles',
  }
);

module.exports = mongoose.model('UserProfile', profileSchema);
