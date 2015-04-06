'use strict';

//module dependencies
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UnitSchema = new Schema({
    unit: {
        type: String,
        required: true
    }
});

/**
 * Statics
 */
UnitSchema.statics.load = function(id, cb) {
  this.findOne({
    _id: id
  }).exec(cb);
};

mongoose.model('Unit', UnitSchema);