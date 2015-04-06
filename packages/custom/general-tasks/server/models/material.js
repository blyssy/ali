'use strict';

//module dependencies
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var MaterialSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    unit: {
        type: Schema.ObjectId,
        ref: 'Unit'
    },
    delivery_offset: {
        type: String
    }
});

/**
 * Statics
 */
MaterialSchema.statics.load = function(id, cb) {
  this.findOne({
    _id: id
  }).populate('unit', 'unit').exec(cb);
};

mongoose.model('Material', MaterialSchema);