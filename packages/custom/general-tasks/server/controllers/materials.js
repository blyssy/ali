'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Material = mongoose.model('Material'),
    //Unit = mongoose.model('Unit'),
    _ = require('lodash');

//material = _.extend(material, req.body);
/**
 * Create material
 */
exports.create = function(req, res, next, id) {
    var material = new Material(req.body);
    //var errors = req.validationErrors();
    //console.log(errors);
    //if (errors) {
    //    return res.status(400).send(errors);
    //}

    if(id)
        console.log('the id value is: ' + id);

    material.save(function(err) {
        if (err) {
          return res.json(500, {
            error: 'Cannot save the material'
          });
        } else {
          material.populate({
            path: 'unit',
            select: 'unit'
          }, function(err, doc) {
            res.json(doc);
          });
        }
    });
};

/**
 * Find material by id
 */
exports.material = function(req, res, next, id) {
    Material.load(id, function(err, material) {
    if (err) return next(err);
    if (!material) return next(new Error('Failed to load material ' + id));

    console.log('material by id: ' + material);
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

    console.log('in the mat update function');

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
    Material.find().populate('unit', 'unit').exec(function(err, materials) {
        if (err) {
            return res.status(500).json({
            error: 'Cannot show the materials'
            });
        }
        res.json(materials);
    });
    //res.json(req.material);
};

/**
 * List of Materials
 */
exports.all = function(req, res) {
    Material.find().populate('unit', 'unit').exec(function(err, materials) {
        if (err) {
            return res.status(500).json({
            error: 'Cannot list the materials'
            });
        }
        res.json(materials);
    });
};









