const User = require('../models/User');
const UserProfile = require('../models/UserProfile');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { createJWT } = require('../utils/auth');
const { response } = require('express');

const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

// Server side validation
exports.signup = (req, res, next) => {
  let { firstName, lastName, email, password, password_confirmation, phone } = req.body;

  let errors = [];
  if (!firstName) {
    errors.push({ firstName: 'required' });
  }
  if (!lastName) {
    errors.push({ lastName: 'required' });
  }
  if (!email) {
    errors.push({ email: 'required' });
  }
  if (!emailRegexp.test(email)) {
    errors.push({ email: 'invalid' });
  }
  if (!phone) {
    errors.push({ phone: 'required' });
  }
  if (!password) {
    errors.push({ password: 'required' });
  }
  if (!password_confirmation) {
    errors.push({
      password_confirmation: 'required',
    });
  }
  if (password != password_confirmation) {
    errors.push({ password: 'mismatch' });
  }
  if (errors.length > 0) {
    return res.status(422).json({ errors: errors });
  }

  User.findOne({ email: email })
    .then((user) => {
      if (user) {
        return res.status(422).json({ errors: [{ user: 'email already exists' }] });
      } else {
        const user = new User({
          firstName: firstName,
          lastName: lastName,
          phone: phone,
          email: email,
          password: password,
          admin: false,
        });

        bcrypt.genSalt(10, function (err, salt) {
          bcrypt.hash(password, salt, function (err, hash) {
            if (err) throw err;
            user.password = hash;
            user
              .save()
              .then((response) => {
                res.status(200).json({
                  success: true,
                  result: response,
                });
              })
              .catch((err) => {
                res.status(500).json({
                  errors: [{ error: err }],
                });
              });
          });
        });
        // Create a new collection for the user
        const userProfile = new UserProfile({
          firstName: firstName,
          lastName: lastName,
          phone: phone,
          email: email,
          bio: '',
          savedPets: [],
          adoptedPets: [],
          admin: false,
        });
        userProfile
          .save()
          .then((res) => console.log(res, 'Success'))
          .catch((err) => console.log(err, 'You fuckked up.'));
      }
    })
    .catch((err) => {
      res.status(500).json({
        errors: [{ error: 'Something went wrong' }],
      });
    });
};

exports.signin = (req, res) => {
  let { email, password } = req.body;

  let errors = [];
  if (!email) {
    errors.push({ email: 'required' });
  }
  if (!emailRegexp.test(email)) {
    errors.push({ email: 'invalid email' });
  }
  if (!password) {
    errors.push({ passowrd: 'required' });
  }
  if (errors.length > 0) {
    return res.status(422).json({ errors: errors });
  }

  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        return res.status(404).json({
          errors: [{ user: 'not found' }],
        });
      } else {
        bcrypt
          .compare(password, user.password)
          .then((isMatch) => {
            if (!isMatch) {
              return res.status(400).json({ errors: [{ password: 'incorrect' }] });
            }
            let access_token = createJWT(user.email, user._id, 3600);
            jwt.verify(access_token, process.env.TOKEN_SECRET, (err, decoded) => {
              if (err) {
                res.status(500).json({ errors: `There was an error: ${err}` });
              }
              if (decoded) {
                return res.status(200).json({
                  success: true,
                  token: access_token,
                  message: user,
                });
              }
            });
          })
          .catch((err) => {
            res.status(500).json({ errors: `There was an error: ${err}` });
          });
      }
    })
    .catch((err) => {
      res.status(500).json({ errors: `There was an error: ${err}` });
    });
};
