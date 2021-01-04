const express = require('express');

const router = express.Router();
const { signup, signin } = require('../controllers/auth');
const { edit, user, users, savepet } = require('../controllers/user');
const { pets, addpet, getpet, getsaved, adoptpet } = require('../controllers/pets');

// Auth routes
router.post('/signup', signup);
router.post('/signin', signin);

// user routes
router.get('/user/:id', user);
router.post('/edit/:id', edit);
router.post('/savepet/:id', savepet);
router.post('/getsaved', getsaved);

// Pet routes
router.get('/pets', pets);
router.get('/getpet/:id', getpet);
router.post('/adopt/:id', adoptpet);

//Admin Routes
router.post('/addpet', addpet);
router.get('/users', users);

module.exports = router;
