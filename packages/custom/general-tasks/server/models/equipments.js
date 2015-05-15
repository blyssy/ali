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
    trade: {
        type: String
    },
    price: {
        type: Number
    },
    delivery_price: {
        type: Number
    },
    delivery_offset: {
        type: String
    }
});

mongoose.model('Equipment', EquipmentSchema);