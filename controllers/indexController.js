const Post = require('../models/post');
const { body, validationResult } = require('express-validator');
const User = require('../models/user');

exports.index = (req, res, next) => {
    Post.find().sort({ timestamp: -1 }).populate('user').exec((err, posts) => {
        if (err) {
            return next(err);
        }
        res.render('index', { title: 'Members Only', posts: posts });
    })
}

exports.logout = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    })
};

exports.membershipGet = (req, res, next) => {
    res.render('membership', { title: 'Join the Club'});
};

exports.membershipPost = [
    body('passcode', 'Passcode must be specified').trim().isLength({ min: 1 }).escape(),
    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.render('membership', { title: 'Join the Club', errors: errors.array() })
        } else if (req.body.passcode !== process.env.MEMBERSHIP) {
            return res.render('membership', { title: 'Join the Club', passcodeError: 'Wrong passcode' });
        }

        const user = new User(res.locals.currentUser);
        user.membership = true;

        User.findByIdAndUpdate(res.locals.currentUser._id, user, {}, (err) => {
            if (err) {
                return next(err);
            }
            return res.redirect('/');
        })
    }
];