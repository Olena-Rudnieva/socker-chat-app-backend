const express = require('express');
const router = express.Router();
const { addUser, getUserById, logout } = require('../controllers/users');

router.post('/add', addUser);

router.get('/:id', getUserById);

router.post('/logout', logout);

module.exports = router;
