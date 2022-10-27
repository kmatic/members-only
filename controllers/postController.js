const Post = require('../models/post');

const { body, validationResult } = require('express-validator');

exports.newpostGet = (req, res, next) => {
    if (!res.locals.currentUser) {
        return res.redirect('/log-in');
    }
    res.render('new-post-form', { title: 'New Post' });
};

exports.newpostPost = [
    body('title', 'Title must not be empty') // this will never be empty
        .trim()
        .isLength({ min: 1 })
        .escape(),
    body('text', 'Message must not be empty') // this will never be empty
        .trim()
        .isLength({ min: 1 })
        .escape(),
    (req, res, next) => {
        const errors = validationResult(req);
        console.log(res, req);
        if (!errors.isEmpty()) {
            return res.render('new-post-form', { title: 'New Post' });
        }
        const post = new Post({
            title: req.body.title,
            text: req.body.text,
            user: req.user._id,
            timestamp: Date.now()
        }).save((err) => {
            if (err) {
                return next(err);
            }
            res.redirect('/');
        })
    }
];