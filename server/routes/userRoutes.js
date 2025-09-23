const express = require('express');
const { createUser, loginUser } = require('../controllers/userController');

const router = express.Router();

router.post('/', createUser);  // create new user
router.post('/login', loginUser); // login user

module.exports = router;
