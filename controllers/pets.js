const fileUpload = require('express-fileupload');
const cloudinary = require('cloudinary');
const Pet = require('../models/Pet');
const fs = require('fs');
const { response } = require('express');

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

// Add pet to collection & store image in Cloudinary
exports.addpet = (req, res) => {
  let fileToUpload = req.files.photoURL;
  fileToUpload.mv('./uploads/' + fileToUpload.name);

  cloudinary.v2.uploader.upload(
    './uploads/' + fileToUpload.name,
    { public_id: fileToUpload.name },
    (error, result) => {
      console.log(result, error);
    }
  );
  Pet.insertMany(req.body, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
};
