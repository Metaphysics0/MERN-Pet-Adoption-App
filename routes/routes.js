const express = require('express');

const router = express.Router();
const { addpet, editpet, users } = require('../controllers/admin');
const { signup, signin } = require('../controllers/auth');
const { edit, user, savepet } = require('../controllers/user');
const { pets, getpet, getsaved, adoptpet, getadopted } = require('../controllers/pets');

// Auth routes
router.post('/signup', signup);
router.post('/signin', signin);

// user routes
router.get('/user/:id', user);
router.post('/edit/:id', edit);
router.post('/savepet/:id', savepet);
router.post('/getsaved', getsaved);
router.post('/getadopted', getadopted);

// Pet routes
router.get('/pets', pets);
router.get('/getpet/:id', getpet);
router.post('/adopt/:id', adoptpet);

//Admin Routes
router.post('/addpet', addpet);
router.get('/users', users);
router.get('/editpet/:id', editpet);

module.exports = router;
