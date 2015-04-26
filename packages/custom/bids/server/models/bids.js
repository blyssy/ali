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
    bid_request_progress: {
        type: String
    },
    builder_name: {
        type: String
    }, 
    builder_division: {
        type: String
    }, 
    builder_address: {
        type: String
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
        type: String
    },
    project_address: {
        type: String
    },
    project_city: {
        type: String
    },
    project_state: {
        type: String
    },
    project_zip: {
        type: String
    },
    purchasing_agent_name: {
        type: String
    },
    purchasing_agent_phone_number: {
        type: String
    },
    purchasing_agent_email: {
        type: String
    },
    project_type: {  //not in the html at this point but should track multi-home, single family, etc...
        type: String
    },
    project_plan: {
        single: [{
            number: {
                type: String
            },
            elevations: {
                type: String
            }
        }],
        multi: {
            interior: [{
                type: String
            }],
            exterior: [{
                type: String
            }]
        }
    },
    project_number_of_lots: {
        type: Number
    },
    project_lot_numbers: {
        type: String
    },
    project_phases: [{
        lots: {
            type: String
        }
    }],
    mtc_name: {
        type: String
    },
    mtc_division: {
        type: String
    },
    mtc_president_name: {
        type: String
    },
    mtc_president_phone_number: {
        type: String
    },
    mtc_president_email: {
        type: String
    },
    mtc_division_manager_name: {
        type: String
    },
    mtc_division_manager_phone_number: {
        type: String
    },
    mtc_division_manager_email: {
        type: String
    },
    bidding_trades: [{
        trade: {
            type: String
        },
        name: {
            type: String
        },
        username: {
            type: String
        },
        email: {
            type: String
        },
        phone: {
            type: String
        }
    }],
    task_list_attached: {
        type: String
    },
    task_list: [{
        _id: {
            type: Number
        },
        trade: {
            type: String
        },
        task: {
            type: String
        },
        name: {
            type: String
        },
        materials: [{
            _id: {
                type: Number
            },
            name: {
                type: String
            },
            description: {
                type: String
            },
            unit: {
                type: String
            },
            delivery_offset: {
                type: String
            }
        }],
        equipment: [{
            _id: {
                type: Number
            },
            name: {
                type: String
            },
            description: {
                type: String
            },
            delivery_offset: {
                type: String
            }
        }],
        subtasks: [{
            _id: {
                type: Number
            },
            trade: {
                type: String
            },
            task: {
                type: String
            },
            name: {
                type: String
            },
            materials: [{
                _id: {
                    type: Number
                },
                name: {
                    type: String
                },
                description: {
                    type: String
                },
                unit: {
                    type: String
                },
                delivery_offset: {
                    type: String
                }
            }],
            equipment: [{
                _id: {
                    type: Number
                },
                name: {
                    type: String
                },
                description: {
                    type: String
                },
                delivery_offset: {
                    type: String
                }
            }]
        }]
    }]
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




