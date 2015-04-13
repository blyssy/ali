'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Bid = mongoose.model('Bid'),
    _ = require('lodash');

/**
 * Create bid
 */
exports.create = function(req, res, next) {
    var bid = new Bid(req.body);

    var errors = req.validationErrors();
    console.log(errors);
    if (errors) {
        return res.status(400).send(errors);
    }

    bid.save(function(err) {
        if (err) {
            return res.status(500).json({
                error: 'Cannot save the current bid'
            });
        }
        res.json(bid);
    });
};

/**
 * Find bid by id
 */
exports.bid = function(req, res, next, id) {
    Bid
        .findOne({
            _id: id
        })
        .exec(function(err, bid) {
            if (err) return next(err);
            if (!bid) return next(new Error('Failed to load Bid ' + id));
            req.bid = bid;
            next();
        });
};
/**
 * Update a bid
 */
exports.update = function(req, res) {
    console.log('In the server side update() function');
    var bid = req.bid;
    bid = _.extend(bid, req.body);

    //console.log(req.body);

    bid.save(function(err) {
        res.json(bid);
    });
};

/**
 * Delete an bid
 */
exports.destroy = function(req, res) {
    //console.log('in the regular delete function...commented out the remove function for now.');
    var bid = req.bid;

    bid.remove(function(err) {
        if (err) {
            res.render('error deleting bid', {
                status: 500
            });
        } else {
            res.json(bid);
        }
    });
    
};

/**
 * Show a bid
 */
exports.show = function(req, res) {
    res.json(req.bid);
};

/**
 * List of bids
 */
exports.all = function(req, res) {
    Bid.find().exec(function(err, bids) {
        if (err) {
            return res.status(500).json({
            error: 'Cannot list the bids'
            });
        }
        res.json(bids);
    });
};
