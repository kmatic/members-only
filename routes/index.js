var express = require('express');
var router = express.Router();

const indexController = require('../controllers/indexController');

/* GET home page. */
router.get('/', indexController.index);

// log out
router.get('/log-out', indexController.logout)

// membership
router.get('/membership', indexController.membershipGet);

router.post('/membership', indexController.membershipPost);

module.exports = router;
