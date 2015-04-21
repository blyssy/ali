'use strict';

//module dependencies
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UpgradeSchema = new Schema({
	upgrade_name: {
		type: String
	},
    upgrade: [{
        name: {
            type: String
        },
        description: {
        	type: String
        },
        ref: {
        	type: mongoose.Schema.ObjectId,
        	ref: 'Material'
        }
    }]
});

/**
 * Statics
 */
UpgradeSchema.statics.load = function(id, cb) {
  this.findOne({
    _id: id
  }).exec(cb);
};

mongoose.model('Upgrade', UpgradeSchema);