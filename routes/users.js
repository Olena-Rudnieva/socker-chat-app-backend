const express = require('express');
const router = express.Router();
const { addUser, getUserById } = require('../controllers/users');

router.post('/add', addUser);

router.get('/:id', getUserById);

module.exports = router;
