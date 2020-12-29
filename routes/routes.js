const express = require('express');

const router = express.Router();
const { signup, signin } = require('../controllers/auth');
const { edit, user } = require('../controllers/user');
const { pets, addpet } = require('../controllers/pets');

// Auth routes
router.post('/signup', signup);
router.post('/signin', signin);

// user profile
router.get('/user/:id', user);
router.post('/edit/:id', edit);

// Pet routes
router.get('/pets', pets);
router.post('/addpet', addpet);

module.exports = router;
