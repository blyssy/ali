'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Notify = mongoose.model('Notify'),
    _ = require('lodash');

/**
 * Create notify
 */
exports.create = function(req, res, next) {
    var notify = new Notify(req.body);

    //notify.unid = notify._id;

    var errors = req.validationErrors();
    console.log(errors);
    if (errors) {
        return res.status(400).send(errors);
    }

    notify.save(function(err) {
        if (err) {
            return res.status(500).json({
                error: 'Cannot save the current notify'
            });
        }
        res.json(notify);
    });
};

/**
 * Find notify by id
 */
exports.notify = function(req, res, next, id) {
    Notify
        .findOne({
            _id: id
        })
        .exec(function(err, notify) {
            if (err) return next(err);
            if (!notify) return next(new Error('Failed to load Notify ' + id));
            req.notify = notify;
            next();
        });
};
/**
 * Update a notify
 */
exports.update = function(req, res) {
    console.log('In the server side update() function');
    var notify = req.notify;
    notify = _.extend(notify, req.body);

    //console.log(req.body);

    notify.save(function(err) {
        res.json(notify);
    });
};

/**
 * Delete an notify
 */
exports.destroy = function(req, res) {
    //console.log('in the regular delete function...commented out the remove function for now.');
    var notify = req.notify;

    notify.remove(function(err) {
        if (err) {
            res.render('error deleting notify', {
                status: 500
            });
        } else {
            res.json(notify);
        }
    });
    
};

/**
 * Show a notify
 */
exports.show = function(req, res) {
    console.log('in show with req ' + req.body);
    res.json(req.notify);
};

/**
 * List of notifys
 */
exports.all = function(req, res) {
    //console.log('In the notify all function with req ' + req.body);
    //console.log(req.query.receiver);
    //gets all notifications based on the passed in receiver
    Notify.find({ receiver: req.query.receiver }).exec(function(err, notifys) {
        if (err) {
            return res.status(500).json({
            error: 'Cannot list the notifys'
            });
        }
        res.json(notifys);
    });
};
