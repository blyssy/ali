'use strict';

//module dependencies
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var EquipmentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    delivery_offset: {
        type: String
    }
});

mongoose.model('Equipment', EquipmentSchema);