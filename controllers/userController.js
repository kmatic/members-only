const User = require('../models/user');
const bcrypt = require('bcryptjs');
const passport = require('passport');

const { body, validationResult } = require('express-validator');

exports.signupFormGet = (req, res, next) => {
    res.render('sign-up-form', { title: 'Sign-up', error: false});
}

exports.signupFormPost = [
    body('username')
        .trim()
        .isLength({ min: 1})
        .escape()
        .withMessage('Username must be specified'),
    body('password')
        .trim()
        .isLength({ min: 1})
        .escape()
        .withMessage('Password must be specified.'),
    body('passwordConfirm').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Passwords do not match');
        }
        return true;
    }),
    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            const user = new User({
                username: req.body.username,
                password: req.body.password,
            });
            res.render('sign-up-form', {
                title: 'Sign-up',
                user: user,
                passwordConfirm: req.body.passwordConfirm,
                error: 'Passwords do not match' // only this error will be triggered
            });
            return;
        } else {
            User.findOne({ username: req.body.username }).exec((err, foundUser) => {
                if (err) {
                    return next(err);
                }
                if (foundUser) {
                    res.render('sign-up-form', {
                        title: 'Sign-up',
                        error: 'User already exists'
                    });
                } else {
                    bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
                        if (err) {
                            return next(err);
                        }
                        const user = new User({
                            username: req.body.username,
                            password: hashedPassword
                        }).save((err) => {
                            if (err) {
                                return next(err);
                            }
                            res.redirect('/log-in');
                        });
                    });
                }
            });
        }
    }
];

exports.loginFormGet = (req, res, next) => {
    res.render('log-in-form' , { title: 'Login' });
};

exports.loginFormPost = passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/log-in'
});