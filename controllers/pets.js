const fileUpload = require('express-fileupload');
const cloudinary = require('cloudinary');
const Pet = require('../models/Pet');
const fs = require('fs');
const { response } = require('express');
const UserProfile = require('../models/UserProfile');

// Get list of pets
exports.pets = (req, res) => {
  Pet.find({}, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
};

// Find one pet
exports.getpet = (req, res) => {
  Pet.findOne(
    {
      _id: req.params.id,
    },
    (err, model) => {
      if (err) {
        res.status(500).json({ error: err });
      } else {
        res.status(200).json({ success: model });
      }
    }
  );
};

// Get user saved pets
exports.getsaved = (req, res) => {
  Pet.find()
    .where('_id')
    .in(req.body.savedPets)
    .exec((err, model) => {
      if (err) {
        res.status(500).json({ error: err });
      } else {
        res.status(200).json({ success: model });
      }
    });
};

// Add pet to collection & store image in Cloudinary
exports.addpet = (req, res) => {
  let fileToUpload = req.files.photoURL;
  // fileToUpload.mv('./uploads/' + fileToUpload.name);

  cloudinary.v2.uploader.upload(
    fileToUpload,
    // './uploads/' + fileToUpload.name,
    { public_id: fileToUpload.name },
    (error, result) => {
      console.log(result, error);
      req.body.photo = result.url;

      // store in MongoDB
      Pet.insertMany(req.body, (err, result) => {
        if (err) {
          res.send(err);
        } else {
          res.send(result);
        }
      });
    }
  );
};

// admin edit pet
exports.editpet = (req, res) => {
  Pet.findByIdAndUpdate(req.params.id, {});
};

// Adopt pet functionality!!
exports.adoptpet = async (req, res) => {
  try {
    const checkIfOwned = await UserProfile.findOne({ email: req.body.email });
    let result = checkIfOwned.adoptedPets.find((o) => o.id === req.params.id);
    if (result) {
      return res.status(409).json({ message: 'YOU ALREADY OWN THIS MOFOOOO' });
    } else {
      const updatePet = await Pet.findByIdAndUpdate(req.params.id, {
        status: `Adopted! by ${req.body.firstName} ${
          req.body.lastName
        } on ${new Date().toLocaleDateString()}`,
      });
      const updateUser = await UserProfile.findOneAndUpdate(
        { email: req.body.email },
        {
          $push: { adoptedPets: { pet: req.body.pet, id: req.params.id } },
        },
        { new: true, upsert: true }
      );
      return res.status(200).json({ updatePet, updateUser });
    }
  } catch (e) {
    return res.status(400).json(e);
  }
};
