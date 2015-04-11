'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Equipment = mongoose.model('Equipment'),
    _ = require('lodash');

/**
 * Create equipment
 */
exports.create = function(req, res, next) {
    var equipment = new Equipment(req.body);

    var errors = req.validationErrors();
    console.log(errors);
    if (errors) {
        return res.status(400).send(errors);
    }

    console.log(equipment);
    equipment.save(function(err) {
        if (err) {
            return res.status(500).json({
                error: 'Cannot save the equipment of measure'
            });
        }
        res.json(equipment);
    });
};

/**
 * Find equipment by id
 */
exports.equipment = function(req, res, next, id) {
    Equipment
        .findOne({
            _id: id
        })
        .exec(function(err, equipment) {
            if (err) return next(err);
            if (!equipment) return next(new Error('Failed to load Equipment ' + id));
            req.equipment = equipment;
            next();
        });
};
/**
 * Update a equipment
 */
exports.update = function(req, res) {
    var equipment = req.equipment;
    equipment = _.extend(equipment, req.body);

    equipment.save(function(err) {
        if (err) {
            return res.status(500).json({
                error: 'Cannot save the equipment in server update'
            });
        }
        res.json(equipment);
    });
};

/**
 * Delete a equipment
 */
exports.destroy = function(req, res) {
    var equipment = req.equipment;

    equipment.remove(function(err) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.json(equipment);
        }
    });
};

/**
 * Show a equipment
 */
exports.show = function(req, res) {
    res.json(req.equipment);
};

/**
 * List of Equipments
 */
exports.all = function(req, res) {
    Equipment.find().exec(function(err, equipments) {
        if (err) {
            return res.status(500).json({
            error: 'Cannot list the equipments'
            });
        }
        res.json(equipments);
    });
};
