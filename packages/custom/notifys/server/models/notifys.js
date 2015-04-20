'use strict';

//module dependencies
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var NotifySchema = new Schema({
    receiver: {  //either employee_id or by trade ("Concrete", "Framer", etc...)
        type: String,
        required: true
    },
    type: { //success, warning, error, info
    	type: String
    },
    title: {
    	type: String
    },
    message: {
    	type: String
    },
    sticky: {
        type: String
    }
});

/**
 * Statics
 */
NotifySchema.statics.load = function(id, cb) {
  this.findOne({
    _id: id
  }).exec(cb);
};

mongoose.model('Notify', NotifySchema);