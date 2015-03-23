'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Material = mongoose.model('Material'),
    _ = require('lodash');

/**
 * Create material
 */
exports.create = function(req, res, next) {
    var material = new Material(req.body);

    var errors = req.validationErrors();
    console.log(errors);
    if (errors) {
        return res.status(400).send(errors);
    }

    console.log(material);
    material.save(function(err) {
        if (err) {
            return res.status(500).json({
                error: 'Cannot save the material of measure'
            });
        }
        res.json(material);
    });
};

/**
 * Find material by id
 */
exports.material = function(req, res, next, id) {
    Material
        .findOne({
            _id: id
        })
        .exec(function(err, material) {
            if (err) return next(err);
            if (!material) return next(new Error('Failed to load Material ' + id));
            req.material = material;
            next();
        });
};
/**
 * Update a material
 */
exports.update = function(req, res) {
    var material = req.material;
    material = _.extend(material, req.body);

    material.save(function(err) {
        res.json(material);
    });
};

/**
 * Delete a material
 */
exports.destroy = function(req, res) {
    var material = req.material;

    material.remove(function(err) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.json(material);
        }
    });
};

/**
 * Show a material
 */
exports.show = function(req, res) {
    res.json(req.material);
};

/**
 * List of Materials
 */
exports.all = function(req, res) {
    Material.find().exec(function(err, materials) {
        if (err) {
            return res.status(500).json({
            error: 'Cannot list the materials'
            });
        }
        res.json(materials);
    });
};
