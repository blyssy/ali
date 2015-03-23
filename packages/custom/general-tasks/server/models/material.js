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
        type: String
    },
    delivery_offset: {
        type: String
    }
});

mongoose.model('Material', MaterialSchema);