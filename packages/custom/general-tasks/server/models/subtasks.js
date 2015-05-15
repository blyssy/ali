'use strict';

//module dependencies
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

//sub task schema

var SubtaskSchema = new Schema({
    subtask_code: {
        type: String,
        required: true
    }, 
    subtask_trade: {
        type: String,
        required: true
    }, 
    subtask: {
        type: String,
        required: true
    }, 
    subtask_name: {
        type: String,
        required: true
    },
    piece_rate: {
        type: Number
    },
    crew_rate: {
        type: Number
    },
    piece_per_hour_rate: {
        type: Number
    },
    materials: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Material'
    }],
    equipment: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Equipment'
    }]
});

/**
 * Validations
 */
SubtaskSchema.path('subtask_code').validate(function(subtask_code) {
  return !!subtask_code;
}, 'SubTask Code cannot be blank');

SubtaskSchema.path('subtask_name').validate(function(subtask_name) {
  return !!subtask_name;
}, 'SubTask Name cannot be blank');


/**
 * Statics
 */
SubtaskSchema.statics.load = function(id, cb) {
  this.findOne({
    _id: id
  });
};

mongoose.model('Subtask', SubtaskSchema);




