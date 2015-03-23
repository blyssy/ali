'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Unit = mongoose.model('Unit'),
    _ = require('lodash');

/**
 * Create user
 */
exports.create = function(req, res, next) {
    var unit = new Unit(req.body);

    var errors = req.validationErrors();
    console.log(errors);
    if (errors) {
        return res.status(400).send(errors);
    }

    // Hard coded for now. Will address this with the user permissions system in v0.3.5
    //user.roles = ['authenticated'];
    //user.roles = req.body.roles;
    unit.save(function(err) {
        if (err) {
            return res.status(500).json({
                error: 'Cannot save the unit of measure'
            });
        }
        res.json(unit);
    });
};

/**
 * Find unit by id
 */
exports.unit = function(req, res, next, id) {
    Unit
        .findOne({
            _id: id
        })
        .exec(function(err, unit) {
            if (err) return next(err);
            if (!unit) return next(new Error('Failed to load Unit ' + id));
            req.unit = unit;
            next();
        });
};
/**
 * Update a unit
 */
exports.update = function(req, res) {
    var unit = req.unit;
    unit = _.extend(unit, req.body);

    unit.save(function(err) {
        res.json(unit);
    });
};

/**
 * Delete an unit
 */
exports.destroy = function(req, res) {
    var unit = req.unit;

    unit.remove(function(err) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.json(unit);
        }
    });
};

/**
 * Show a unit
 */
exports.show = function(req, res) {
    res.json(req.unit);
};

/**
 * List of Units
 */
exports.all = function(req, res) {
    Unit.find().exec(function(err, units) {
        if (err) {
            return res.status(500).json({
            error: 'Cannot list the units'
            });
        }
        res.json(units);
    });
};
