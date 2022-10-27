const express = require('express');
const router = express.Router();

const postController = require('../controllers/postController');

router.get('/', postController.newpostGet);

router.post('/', postController.newpostPost);

module.exports = router;