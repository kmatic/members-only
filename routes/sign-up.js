const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', userController.signupFormGet);

router.post('/', userController.signupFormPost);

module.exports = router;