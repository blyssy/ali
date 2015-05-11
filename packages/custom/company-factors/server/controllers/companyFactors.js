'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Factor = mongoose.model('CompanyFactor'),
    _ = require('lodash');

/**
 * Create factor
 */
exports.create = function(req, res, next) {
    var factor = new Factor(req.body);

    var errors = req.validationErrors();
    console.log(errors);
    if (errors) {
        return res.status(400).send(errors);
    }

    factor.save(function(err) {
        if (err) {
            return res.status(500).json({
                error: 'Cannot save the company factor'
            });
        }
        res.json(factor);
    });
};

/**
 * Find factor by id
 */
exports.factor = function(req, res, next, id) {
    Factor
        .findOne({
            _id: id
        })
        .exec(function(err, factor) {
            if (err) return next(err);
            if (!factor) return next(new Error('Failed to load Factor ' + id));
            req.factor = factor;
            next();
        });
};
/**
 * Update a factor
 */
exports.update = function(req, res) {
    //console.log('In the server side update() function');
    var factor = req.factor;
    factor = _.extend(factor, req.body);

    factor.save(function(err) {
        res.json(factor);
    });
};

/**
 * Delete an factor
 */
exports.destroy = function(req, res) {
    //console.log('in the regular delete function...commented out the remove function for now.');
    var factor = req.factor;
    //console.log('this is a delete on the factor itself.');
    factor.remove(function(err) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.json(factor);
        }
    });
};

/**
 * Show a goal
 */
exports.show = function(req, res) {
    res.json(req.factor);
};

/**
 * List of Factors
 */
exports.all = function(req, res) {
    Factor.find().exec(function(err, gfactors) {
        if (err) {
            return res.status(500).json({
            error: 'Cannot list the factors'
            });
        }
        res.json(gfactors);
    });
};
