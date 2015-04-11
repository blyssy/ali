'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Task = mongoose.model('GeneralTask'),
    _ = require('lodash');

/**
 * Create user
 */
exports.create = function(req, res, next) {
    var task = new Task(req.body);

    //user.provider = 'local';

    // because we set our user.provider to local our models/user.js validation will always be true
    //req.assert('email', 'You must enter a valid email address').isEmail();
    //req.assert('password', 'Password must be between 8-20 characters long').len(8, 20);
    //req.assert('username', 'Username cannot be more than 20 characters').len(1, 20);
    //req.assert('confirmPassword', 'Passwords do not match').equals(req.body.password);

    var errors = req.validationErrors();
    console.log(errors);
    if (errors) {
        return res.status(400).send(errors);
    }

    // Hard coded for now. Will address this with the user permissions system in v0.3.5
    //user.roles = ['authenticated'];
    //user.roles = req.body.roles;
    task.save(function(err) {
        if (err) {
            return res.status(500).json({
                error: 'Cannot save the article'
            });
        }
        res.json(task);
    });
};

/**
 * Find task by id
 */
exports.task = function(req, res, next, id) {
    Task
        .findOne({
            _id: id
        })
        .exec(function(err, task) {
            if (err) return next(err);
            if (!task) return next(new Error('Failed to load Task ' + id));
            req.task = task;
            next();
        });
};
/**
 * Update a task
 */
exports.update = function(req, res) {
    console.log('In the server side update() function');
    var task = req.task;
    task = _.extend(task, req.body);

    console.log(task);
    console.log(req.body);

    task.save(function(err) {
        res.json(task);
    });
};

exports.updateMaterial = function(req, res) {
    //console.log('In the server side updateMaterial() function');
    
    var task = req.body;
    task = _.extend(task, req.body);

    //console.log(task);
    
    task.save(function(err) {
        if (err) {
          return res.status(500).json({
            error: 'Cannot save the material'
          });
        } else {
          task.populate({
            path: 'materials',
            select: '_id'
          }, function(err, doc) {
            res.json(doc);
          });
        }
    });
};

/**
 * Delete an task
 */
exports.destroy = function(req, res) {
    console.log('in the regular delete function...commented out the remove function for now.');
    var task = req.task;

    //console.log(res);
    console.log(task);

    if(req.query.type === 'material'){
        if(req.query.index){
            console.log('index does exits for the material type');
            task.materials.splice(req.query.index, 1);
            console.log(task);
            task.save(function(err) {
                if (err) {
                    res.render('could not remove material item from list', {
                        status: 500
                    });
                } else {
                    res.json(task);
                }
            });
        }
    } else if(req.query.type === 'equipment'){
        if(req.query.index){
            console.log('index does exits for the equipment type');
        }
    } else {
        console.log('this is a delete on the task itself.');
        task.remove(function(err) {
            if (err) {
                res.render('error', {
                    status: 500
                });
            } else {
                res.json(task);
            }
        });
    }
};

exports.destroyMatItem = function(req, res){
    console.log(req);
    console.log('item value is: ' + req.params.taskId);
    console.log('index value is: ' + req.params.index);
    res.send('testing destroyMatItem');
};

/**
 * Show a goal
 */
exports.show = function(req, res) {
    res.json(req.task);
};

/**
 * List of Tasks
 */
exports.all = function(req, res) {
    Task.find().exec(function(err, gtasks) {
        if (err) {
            return res.status(500).json({
            error: 'Cannot list the tasks'
            });
        }
        res.json(gtasks);
    });
};
