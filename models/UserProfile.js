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
    admin: {
      type: Boolean,
      default: false,
    },
    savedPets: [],
    adoptedPets: [],
  },
  {
    timestamps: true,
    collection: 'userProfiles',
  }
);

module.exports = mongoose.model('UserProfile', profileSchema);
