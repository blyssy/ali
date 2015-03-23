'use strict';

//module dependencies
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

//var UnitSchema = new Schema({
//    units: [{
//        type: String,
//       required: true
//    }]
//});

//var MaterialSchema = new Schema({
//    name: {
//        type: String,
//        required: true
//    },
//    unit: {
//        type: mongoose.Schema.ObjectId,
//        ref: 'units'
//    },
//    delivery_offset: {
//        type: Number
//    }
//});

//general task schema

var GeneralTaskSchema = new Schema({
    order: {
        type: Number,
        required: true
    },
    task_code: {
        type: String,
        required: true
    }, 
    trade: {
        type: String,
        required: true
    }, 
    task: {
        type: String,
        required: true
    }, 
    task_name: {
        type: String,
        required: true
    },
    materials: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Material'
    }]
});

/**
 * Validations
 */
GeneralTaskSchema.path('task_code').validate(function(task_code) {
  return !!task_code;
}, 'Task Code cannot be blank');

GeneralTaskSchema.path('task_name').validate(function(task_name) {
  return !!task_name;
}, 'Task Name cannot be blank');


/**
 * Statics
 */
GeneralTaskSchema.statics.load = function(id, cb) {
  this.findOne({
    _id: id
  });
};

mongoose.model('GeneralTask', GeneralTaskSchema);




