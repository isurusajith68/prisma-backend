const express = require('express');
const router = express.Router();

const { signUp } = require('../controller/userController');

router.route('/signup').post(signUp);

module.exports = router;