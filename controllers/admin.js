const fileUpload = require('express-fileupload');
const fs = require('fs');
const cloudinary = require('cloudinary');
const Pet = require('../models/Pet');
const UserProfile = require('../models/UserProfile');

// Get list of all users
exports.users = async (req, res) => {
  try {
    const profiles = await UserProfile.find({});
    res.status(200).json(profiles);
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

// Add pet to DB & store image in Cloudinary
exports.addpet = (req, res) => {
  let fileToUpload = req.files.photoURL;

  fileToUpload.mv('./uploads/' + fileToUpload.name);

  cloudinary.v2.uploader.upload(fileToUpload, './uploads/' + fileToUpload.name, (error, result) => {
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
  });
};

// admin edit pet
exports.editpet = (req, res) => {
  Pet.findByIdAndUpdate(req.params.id, {});
};
