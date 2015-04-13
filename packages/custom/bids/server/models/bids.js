'use strict';

//module dependencies
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

//general task schema

var BidSchema = new Schema({
    bid_name: {
        type: String,
        required: true
    },
    bid_status: {
        type: String,
        required: true
    }, 
    builder_name: {
        type: String,
        required: true
    }, 
    builder_division: {
        type: String
    }, 
    builder_address: {
        type: String,
        required: true
    },
    builder_city: {
        type: String
    },
    builder_state: {
        type: String
    },
    builder_zip: {
        type: String
    },
    builder_phone_number: {
        type: String
    },
    builder_email: {
        type: String
    },
    project_name: {
        type: String,
        required: true
    },
    project_address: {
        type: String
    },
    project_city: {
        type: String
    },
    project_zip: {
        type: String
    }
});

/**
 * Validations
 */
/*GeneralTaskSchema.path('task_code').validate(function(task_code) {
  return !!task_code;
}, 'Task Code cannot be blank');

GeneralTaskSchema.path('task_name').validate(function(task_name) {
  return !!task_name;
}, 'Task Name cannot be blank');
*/

/**
 * Statics
 */
/*GeneralTaskSchema.statics.load = function(id, cb) {
  this.findOne({
    _id: id
  }).populate('materials', 'name unit delivery_offset').exec(cb);
};*/
BidSchema.statics.load = function(id, cb) {
  this.findOne({
    _id: id
  });
};

mongoose.model('Bid', BidSchema);




