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
        type: mongoose.Schema.ObjectId,
        ref: 'Unit'
    },
    delivery_offset: {
        type: Number
    }
});

mongoose.model('Material', MaterialSchema);