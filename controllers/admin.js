// const cloudinary = require('cloudinary');
// const Pet = require('../models/Pet');
// const { response } = require('express');
// const UserProfile = require('../models/UserProfile');

// // Add pet to collection & store image in Cloudinary
// exports.addpet = (req, res) => {
//   let fileToUpload = req.files.photoURL;
//   // fileToUpload.mv('./uploads/' + fileToUpload.name);

//   cloudinary.v2.uploader.upload(
//     fileToUpload,
//     // './uploads/' + fileToUpload.name,
//     { public_id: fileToUpload.name },
//     (error, result) => {
//       console.log(result, error);
//       req.body.photo = result.url;

//       // store in MongoDB
//       Pet.insertMany(req.body, (err, result) => {
//         if (err) {
//           res.send(err);
//         } else {
//           res.send(result);
//         }
//       });
//     }
//   );
// };

// // admin edit pet
// exports.editpet = (req, res) => {
//   Pet.findByIdAndUpdate(req.params.id, {});
// };

// // Add pet to user, and change status of pet
// exports.adoptpet = async (req, res) => {
//   try {
//     const updatePet = await Pet.findByIdAndUpdate(req.params.id, {
//       status: `Adopted! by ${req.body.firstName} ${
//         req.body.lastName
//       } on ${new Date().toLocaleDateString()}`,
//     });
//     const updateUser = await UserProfile.findOneAndUpdate(
//       { email: req.body.email },
//       {
//         $push: { adoptedPets: { pet: req.body.pet, id: req.params.id } },
//       },
//       { new: true, upsert: true }
//     );
//     return res.status(200).json({ updatePet, updateUser });
//   } catch (e) {
//     return res.status(400).json(e);
//   }
// };
