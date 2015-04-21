'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Upgrade = mongoose.model('Upgrade'),
    _ = require('lodash');

/**
 * Create upgrade
 */
exports.create = function(req, res, next) {
    var upgrade = new Upgrade(req.body);

    var errors = req.validationErrors();
    console.log(errors);
    if (errors) {
        return res.status(400).send(errors);
    }

    upgrade.save(function(err) {
        if (err) {
            return res.status(500).json({
                error: 'Cannot save the current upgrade'
            });
        }
        res.json(upgrade);
    });
};

/**
 * Find upgrade by id
 */
exports.upgrade = function(req, res, next, id) {
    Upgrade
        .findOne({
            _id: id
        })
        .exec(function(err, upgrade) {
            if (err) return next(err);
            if (!upgrade) return next(new Error('Failed to load Upgrade ' + id));
            req.upgrade = upgrade;
            next();
        });
};
/**
 * Update a upgrade
 */
exports.update = function(req, res) {
    console.log('In the server side update() function');
    var upgrade = req.upgrade;
    upgrade = _.extend(upgrade, req.body);

    //console.log(req.body);

    upgrade.save(function(err) {
        res.json(upgrade);
    });
};

/**
 * Delete an upgrade
 */
exports.destroy = function(req, res) {
    //console.log('in the regular delete function...commented out the remove function for now.');
    var upgrade = req.upgrade;

    upgrade.remove(function(err) {
        if (err) {
            res.render('error deleting upgrade', {
                status: 500
            });
        } else {
            res.json(upgrade);
        }
    });
    
};

/**
 * Show a upgrade
 */
exports.show = function(req, res) {
    console.log('in show with req ' + req.body);
    res.json(req.upgrade);
};

/**
 * List of upgrades
 */
exports.all = function(req, res) {
    Upgrade.find().exec(function(err, upgrades) {
        if (err) {
            return res.status(500).json({
            error: 'Cannot list the upgrades'
            });
        }
        res.json(upgrades);
    });
};
