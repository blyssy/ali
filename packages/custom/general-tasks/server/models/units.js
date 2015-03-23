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

mongoose.model('Unit', UnitSchema);