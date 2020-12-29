const UserProfile = require('../models/UserProfile');
const { response } = require('express');

// Edit user profile API
exports.edit = (req, res) => {
  UserProfile.findByIdAndUpdate(
    req.params.id,
    {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phone: req.body.phone,
      bio: req.body.bio,
    },
    { upsert: true, new: true },
    (err, model) => {
      if (err) {
        res.status(500).json({ error: err });
      } else {
        res.status(200).json({ success: model });
      }
    }
  );
};

// Get user profile
exports.user = (req, res) => {
  UserProfile.find({ email: req.params.id }, (err, model) => {
    if (err) {
      res.status(500).json({ error: err });
    } else {
      res.status(200).json({ success: model });
    }
  });
};
