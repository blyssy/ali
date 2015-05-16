'use strict';

//module dependencies
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var MaterialSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    trade: {
        type: String
    },
    units_per_order: {
        type: Number
    },
    price_per_order: {
        type: Number
    },
    delivery_price: {
        type: Number
    },
    unit: {
        type: mongoose.Schema.ObjectId,
        ref: 'Unit'
    },
    delivery_offset: {
        type: String,
        required: true
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