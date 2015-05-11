'use strict';

//module dependencies
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CompanyFactorSchema = new Schema({
    trade: {
        type: String,
        required: true
    },
    trade_name: {
        type: String
    },
    trade_code: {
        type: String
    },
    taxes: {
        type: Number
    },
    w_comp_high: {
        type: Number
    },
    w_comp_low: {
        type: Number
    },
    general_liability: {
        type: Number
    },
    auto: {
        type: Number
    },
    sales_tax: {
        type: Number
    },
    material: {
        type: Number
    },
    equipment: {
        type: Number
    },
    benefits: {
        type: Number
    },
    labor_increase: {
        type: Number
    },
    general_contractor: {
        type: Number
    },
    training_education: {
        type: Number
    }
});

/**
 * Statics
 */
CompanyFactorSchema.statics.load = function(id, cb) {
  this.findOne({
    _id: id
  });
};

mongoose.model('CompanyFactor', CompanyFactorSchema);




