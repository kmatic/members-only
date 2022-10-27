const Post = require('../models/post');
const bcrypt = require('bcryptjs');

const { body, validationResult } = require('express-validator');

exports.newpostGet = (req, res, next) => {
    res.render('new-post-form', { title: 'New Post' });
};