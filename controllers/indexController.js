const Post = require('../models/post');

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