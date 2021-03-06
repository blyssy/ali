'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    _ = require('lodash');

/**
 * Create user
 */
exports.create = function(req, res, next) {
    var user = new User(req.body);

    //console.log(req.body);

    user.provider = 'local';

    // because we set our user.provider to local our models/user.js validation will always be true
    req.assert('email', 'You must enter a valid email address').isEmail();
    req.assert('password', 'Password must be between 8-20 characters long').len(8, 20);
    req.assert('username', 'Employee ID must be 9 digits').len(9);
    //req.assert('confirmPassword', 'Passwords do not match').equals(req.body.password);

    var errors = req.validationErrors();
    console.log(errors);
    if (errors) {
        return res.status(400).send(errors);
    }

    // Hard coded for now. Will address this with the user permissions system in v0.3.5
    //user.roles = ['authenticated'];
    user.roles = req.body.roles;
    user.trade = req.body.trade;
    user.save(function(err) {
        if (err) {
            console.log(err);
            switch (err.code) {
                case 11000:
                case 11001:
                    res.status(400).send('Employee ID already taken');
                    break;
                default:
                    res.status(400).send('Please fill all the required fields');
            }

            return res.status(400);
        }
        res.jsonp(user);
    });
};

/**
 * Find user by id
 */
exports.user = function(req, res, next, id) {
    console.log('in the find user by id function');
    User
        .findOne({
            _id: id
        })
        .exec(function(err, user) {
            if (err) return next(err);
            if (!user) return next(new Error('Failed to load User ' + id));
            req.profile = user;
            next();
        });
};
/**
 * Update a user
 */
exports.update = function(req, res) {
    var user = req.profile;
    user = _.extend(user, req.body);

    console.log(user);

    user.save(function(err) {
        res.jsonp(user);
    });
};

/**
 * Show a user
 */
exports.show = function(req, res) {
    console.log('in show with req ' + req.body);
    res.json(req.user);
};

/**
 * Delete an user
 */
exports.destroy = function(req, res) {
    var user = req.profile;

    user.remove(function(err) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(user);
        }
    });
};

/**
 * List of Users
 */
exports.all = function(req, res) {
    User.find().sort('-created').populate('user', 'name username').exec(function(err, users) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(users);
        }
    });
};
