// USER PROFILE ROUTES

const UserProfile = require('../models/UserProfile');
const { response } = require('express');
const { model } = require('../models/UserProfile');
const { Mongoose } = require('mongoose');

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

// Get current user profile
exports.user = (req, res) => {
  UserProfile.find({ email: req.params.id }, (err, model) => {
    if (err) {
      res.status(500).json({ error: err });
    } else {
      res.status(200).json({ success: model });
    }
  });
};

// Get list of all users
exports.users = (req, res) => {
  UserProfile.find({}, (err, model) => {
    if (err) {
      res.status(500).json({ error: err });
    } else {
      res.status(200).json(model);
    }
  });
};

// Save pet conditionally
exports.savepet = (req, res) => {
  UserProfile.findOne(
    {
      _id: req.params.id,
    },
    (err, model) => {
      let check = model.savedPets.find((o) => o.id === req.body.id);
      if (check) {
        model.savedPets.pull(check);
      } else {
        model.savedPets.addToSet({ pet: req.body.pet, id: req.body.id });
      }
      model.save();
      res.send(model);
    }
  );
};

// Display saved pets
exports.getsaved = async (req, res) => {
  UserProfile.aggregate([
    { $match: { savedPets: req.body.savedPets[0].id } },
    {
      $lookup: {
        from: 'pets',
        localField: 'savedPets',
        foreignField: '_id',
        as: 'pets',
      },
    },
    // { $unwind: $pet },
    // { $unwind: $pet.savedPets },
    // { $match: { 'pet.savedPets': req.body.savedPets[0].id } },
  ]).exec((err, response) => res.send(response));
};
