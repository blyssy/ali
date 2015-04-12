'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Subtask = mongoose.model('Subtask'),
    _ = require('lodash');

/**
 * Create user
 */
exports.create = function(req, res, next) {
    var subtask = new Subtask(req.body);

    var errors = req.validationErrors();
    console.log(errors);
    if (errors) {
        return res.status(400).send(errors);
    }

    subtask.save(function(err) {
        if (err) {
            return res.status(500).json({
                error: 'Cannot save the subtask'
            });
        }
        res.json(subtask);
    });
};

/**
 * Find subtask by id
 */
exports.subtask = function(req, res, next, id) {
    Subtask
        .findOne({
            _id: id
        })
        .exec(function(err, subtask) {
            if (err) return next(err);
            if (!subtask) return next(new Error('Failed to load Subtask ' + id));
            req.subtask = subtask;
            next();
        });
};
/**
 * Update a subtask
 */
exports.update = function(req, res) {
    var subtask = req.subtask;
    subtask = _.extend(subtask, req.body);

    subtask.save(function(err) {
        res.json(subtask);
    });
};

/**
 * Delete a subtask
 */
exports.destroy = function(req, res) {
    var subtask = req.subtask;

    //console.log('in the subtask destroy method...nothing removed.' + subtask);

    if(req.query.type === 'material'){
        if(req.query.index){
            //console.log('index does exits for the material type');
            subtask.materials.splice(req.query.index, 1);
            //console.log(task);
            subtask.save(function(err) {
                if (err) {
                    res.render('could not remove material item from subtask list', {
                        status: 500
                    });
                } else {
                    res.json(subtask);
                }
            });
        }
    } else if(req.query.type === 'equipment'){
        if(req.query.index){
            //console.log('index does exits for the equipment type');
            subtask.equipment.splice(req.query.index, 1);
            subtask.save(function(err) {
                if (err) {
                    res.render('could not remove equipment item from subtask list', {
                        status: 500
                    });
                } else {
                    res.json(subtask);
                }
            });
        }
    } else {
        //console.log('this is a delete on the task itself.');
        subtask.remove(function(err) {
            if (err) {
                res.render('error', {
                    status: 500
                });
            } else {
                res.json(subtask);
            }
        });
    }
};

/**
 * Show a subtask
 */
exports.show = function(req, res) {
    res.json(req.subtask);
};

/**
 * List of subtasks
 */
exports.all = function(req, res) {
    Subtask.find().exec(function(err, subtasks) {
        if (err) {
            return res.status(500).json({
            error: 'Cannot list the subtasks'
            });
        }
        res.json(subtasks);
    });
};
