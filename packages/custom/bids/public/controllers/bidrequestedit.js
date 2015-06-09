'use strict';

angular.module('mean.bids').controller('BidRequestEditController', ['$scope', 'Users', 'Global', 'Bids', '$filter', 'ngTableParams', '$sce', 'toaster', 'NotifyService', 'BidRequestEdit', '$state',
  function($scope, Users, Global, Bids, $filter, NGTableParams, $sce, toaster, NotifyService, BidRequestEdit, $state) {
    $scope.global = Global;

    var data = [];

    $scope.$on('bidTableListRefresh', function(event, table_data) {
        var data = table_data;
        $scope.bidTasksTableParams.total(data.length);
        $scope.bidTasksTableParams.reload();
    });

    $scope.init = function() {
    	$scope.bid = BidRequestEdit.get();

    	$scope.bid_menu = [];

    	var menu = $scope.bid.project_plan;

    	if(menu.single.length) {
    		var elevations = [];
    		$scope.construction_single = true;

    		menu.single.forEach(function(object, Idx){
    			elevations = object.elevations.split(',');

				elevations.forEach(function(subitem, ii){
					subitem = subitem.replace(/\s/g, '');
					$scope.bid_menu.push({
						item: object.number + subitem
					});
				});
    		});

    	} else if(menu.multi.interior.length || menu.multi.exterior.length){
    		$scope.construction_multi = true;
    		menu.multi.interior.forEach(function(item, index){
    			menu.multi.exterior.forEach(function(subitem, ii){
    				$scope.bid_menu.push({
						item: item.item + subitem.item
					});
    			});
    		});
    	} else {
    		alert('unknown construction type');
    	}

    	var bid_tasks = [];

    	Users.get({ userId: $scope.global.user._id}, function(user) {
            $scope.my_bid_trade = $scope.getTradeCode(user.trade[0]);
	    	$scope.bid.task_list.forEach(function(task, index){
	    		if( task.trade === $scope.my_bid_trade){
	    			$scope.bid.bidding_trades.forEach(function(bidder, ii){
	    				if(bidder.trade === user.trade[ii]) {
                            //need to get bid_hours, quantities, etc... for each bid menu
                            //make sure the plan and task id's match up.
                            bidder.bid.forEach(function(bid, ii) {
                                if(bid.plan_code === $scope.current_plan.item) {
                                    if(bid.task_id === task._id) {
                                        bid.equipment.forEach(function(eq, eidx) {
                                            task.equipment.forEach(function(teq, teidx) {
                                                if(eq.equipment_id === teq._id) {
                                                    teq.quantity = eq.quantity;
                                                    if(eq.price_per_order)
                                                      teq.price_per_order = eq.price_per_order;
                                                    if(eq.delivery_price)
                                                      teq.delivery_price = eq.delivery_price;
                                                }
                                            });
                                        });
                                        bid.materials.forEach(function(mq, midx) {
                                            task.materials.forEach(function(tmq, tmidx) {
                                                if(mq.material_id === tmq._id) {
                                                    tmq.quantity = mq.quantity;
                                                    if(mq.price_per_order)
                                                      tmq.price_per_order = mq.price_per_order;
                                                    if(mq.delivery_price)
                                                      tmq.delivery_price = mq.delivery_price;
                                                }
                                            });
                                        });
                                        bid.subtasks.forEach(function(subtask, si) {
                                            task.subtasks.forEach(function(tsub, tsi) {
                                                if(subtask.task_id === tsub._id) {
                                                    tsub.quantity = subtask.quantity;
                                                    tsub.bid_hours = subtask.bid_hours;
                                                    tsub.labor = subtask.labor;

                                                    subtask.equipment.forEach(function(seq, sei) {
                                                        tsub.equipment.forEach(function(tseq, tsei) {
                                                            if(seq.equipment_id === tseq._id){
                                                                tseq.quantity = seq.quantity;
                                                                if(seq.price_per_order)
                                                                  tseq.price_per_order = seq.price_per_order;
                                                                if(seq.delivery_price)
                                                                  tseq.delivery_price = seq.delivery_price;
                                                            }
                                                        });
                                                    });
                                                    subtask.materials.forEach(function(smq, smi) {
                                                        tsub.materials.forEach(function(tsmq, tsmi) {
                                                            if(smq.material_id === tsmq._id){
                                                                tsmq.quantity = smq.quantity;
                                                                if(smq.price_per_order)
                                                                  tsmq.price_per_order = smq.price_per_order;
                                                                if(smq.delivery_price)
                                                                  tsmq.delivery_price = smq.delivery_price;
                                                            }
                                                        });
                                                    });
                                                }
                                            });
                                        });
                                    }
                                }
                            });
	    				}
	    			});

                    bid_tasks.push(task);
	    		}
	    	});

	    	$scope.bid_total = '2000';
	    	$scope.bid_direct_labor = '900';

	    	data = bid_tasks;
	        $scope.bidTasksTableParams = new NGTableParams({
	            page: 1,
	            count: 100
	        },{
	            total: data.length,
                counts: [], //remove the pagination controller
	            getData: function($defer, params) {
	                params.total(data.length);
	                var orderedData = params.sorting()?$filter('orderBy')(data, params.orderBy()):data;
	                $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
	            }
	        });
	    });
    };

    $scope.updateTablePlan = function() {
        var bid_tasks = [];

        //already know this users bid trade
        $scope.bid.task_list.forEach(function(task, index){
            if( task.trade === $scope.my_bid_trade){
                $scope.bid.bidding_trades.forEach(function(bidder, ii){
                    if($scope.getTradeCode(bidder.trade) === task.trade) {
                        //need to get bid_hours, quantities, etc... for each bid menu
                        //make sure the plan and task id's match up.
                        bidder.bid.forEach(function(bid, ii) {
                            
                            if(bid.task_id === task._id) {
                                if(bid.plan_code === $scope.current_plan.item) {
                                    //console.log('task %s (plan %s) is updating for plan %s', task.name, bid.plan_code, $scope.current_plan.item);
                                    
                                    bid.equipment.forEach(function(eq, eidx) {
                                        task.equipment.forEach(function(teq, teidx) {
                                            if(eq.equipment_id === teq._id) {
                                                teq.quantity = eq.quantity;
                                                if(eq.price_per_order)
                                                  teq.price_per_order = eq.price_per_order;
                                                if(eq.delivery_price)
                                                  teq.delivery_price = eq.delivery_price;
                                            }
                                        });
                                    });
                                    bid.materials.forEach(function(mq, midx) {
                                        task.materials.forEach(function(tmq, tmidx) {
                                            if(mq.material_id === tmq._id) {
                                                tmq.quantity = mq.quantity;
                                                if(mq.price_per_order)
                                                  tmq.price_per_order = mq.price_per_order;
                                                if(mq.delivery_price)
                                                  tmq.delivery_price = mq.delivery_price;
                                            }
                                        });
                                    });
                                    bid.subtasks.forEach(function(subtask, si) {
                                        task.subtasks.forEach(function(tsub, tsi) {
                                            if(subtask.task_id === tsub._id) {
                                                tsub.quantity = subtask.quantity;
                                                tsub.bid_hours = subtask.bid_hours;
                                                tsub.labor = subtask.labor;

                                                subtask.equipment.forEach(function(seq, sei) {
                                                    tsub.equipment.forEach(function(tseq, tsei) {
                                                        if(seq.equipment_id === tseq._id){
                                                            tseq.quantity = seq.quantity;
                                                            if(seq.price_per_order)
                                                              tseq.price_per_order = seq.price_per_order;
                                                            if(seq.delivery_price)
                                                              tseq.delivery_price = seq.delivery_price;
                                                        }
                                                    });
                                                });
                                                subtask.materials.forEach(function(smq, smi) {
                                                    tsub.materials.forEach(function(tsmq, tsmi) {
                                                        if(smq.material_id === tsmq._id){
                                                            tsmq.quantity = smq.quantity;
                                                            if(smq.price_per_order)
                                                              tsmq.price_per_order = smq.price_per_order;
                                                            if(smq.delivery_price)
                                                              tsmq.delivery_price = smq.delivery_price;
                                                        }
                                                    });
                                                });
                                            }
                                        });
                                    });
                                } else {
                                    //this bid does not match the current plan but it matches the task.
                                    //we need to see if there is a plan/bid for this task.
                                    //if there is we need to leave it alone, if there is not
                                    //then we should clear it out.
                                    var bid_found = false;
                                    for(var i=0; i<bidder.bid.length; i=i+1){
                                        if(bidder.bid[i].task_id === task._id &&
                                            bidder.bid[i].plan_code === $scope.current_plan.item)
                                          bid_found = true;
                                    }

                                    if(!bid_found){
                                        console.log('task %s (plan %s) is clearing data for plan %s', task.name, bid.plan_code, $scope.current_plan.item);
                                        task.equipment.forEach(function(mat){
                                            mat.quantity = '0';
                                        });
                                        task.materials.forEach(function(eq) {
                                            eq.quantity = '0';
                                        });
                                        task.subtasks.forEach(function(sub) {
                                            sub.quantity = '0';
                                            sub.bid_hours = '0';
                                            sub.materials.forEach(function(smat) {
                                                smat.quantity = '0';
                                            });
                                            sub.equipment.forEach(function(seq) {
                                                seq.quantity = '0';
                                            });
                                        });
                                    }
                                }
                            }
                        });

                    }
                });

                bid_tasks.push(task);
            }
        });

        //$scope.bid_total = '2000';
        //$scope.bid_direct_labor = '900';

        data = bid_tasks;

        $scope.bidTasksTableParams.reload();
    };

    $scope.onSelect = function() {
        //$scope.taskEditId = -1;
    	//console.log('in the onSelect function ' + $scope.current_plan.item);
        $scope.updateTablePlan();
    };

    $scope.setTaskEditId =  function(pid) {
        $scope.taskEditId = pid;
    };

    $scope.next =  function(pid) {
        //pid -1 is the index of the current task so lets just start with the next task and iterate
        var current_task_idx = pid;
        for(; current_task_idx < $scope.bid.task_list.length; current_task_idx = current_task_idx + 1) {
            if($scope.bid.task_list[current_task_idx].trade === $scope.my_bid_trade) {
                $scope.taskEditId = $scope.bid.task_list[current_task_idx]._id;
                break;
            }
        }
    };

    $scope.update = function(item) {
        // we have an item to update.  look through the bidding trades to get the owner
        $scope.bid.bidding_trades.forEach(function(trade, index){
            if($scope.getTradeCode(trade.trade) === $scope.my_bid_trade) {
                //found the owner of the bid
                //see if this task is in his bid list
                var updated = false;
                trade.bid.forEach(function(bid, bi) {
                    if(bid.task_id === item._id){
                        if(bid.plan_code === $scope.current_plan.item) {
                            //found the task.  update with new info
                            updated = true;
                            bid.labor = item.labor;

                            bid.materials = [];
                            item.materials.forEach(function(tmat,tmi) {
                                bid.materials.push({
                                    material_id: tmat._id,
                                    quantity: tmat.quantity,
                                    price_per_order: tmat.price_per_order,
                                    delivery_price: tmat.delivery_price,
                                });
                            });

                            bid.equipment = [];
                            item.equipment.forEach(function(teqt, tei) {
                                bid.equipment.push({
                                    equipment_id: teqt._id,
                                    quantity: teqt.quantity,
                                    price_per_order: teqt.price_per_order,
                                    delivery_price: teqt.delivery_price
                                });
                            });

                            bid.subtasks = [];
                            item.subtasks.forEach(function(tsub, tsi) {
                                bid.subtasks.push({
                                    task_id: tsub._id,
                                    quantity: tsub.quantity,
                                    bid_hours: tsub.bid_hours,
                                    labor: tsub.labor,
                                    materials: [],
                                    equipment: []
                                });
                            });

                            item.subtasks.forEach(function(tsub, tsi) {
                                bid.subtasks[tsi].materials = [];
                                tsub.materials.forEach(function(tsmat, tsmi) {
                                    bid.subtasks[tsi].materials.push({
                                        material_id: tsmat._id,
                                        quantity: tsmat.quantity,
                                        price_per_order: tsmat.price_per_order,
                                        delivery_price: tsmat.delivery_price
                                    });
                                });

                                bid.subtasks[tsi].equipment = [];
                                tsub.equipment.forEach(function(tseq, tsei) {
                                    bid.subtasks[tsi].equipment.push({
                                        equipment_id: tseq._id,
                                        quantity: tseq.quantity,
                                        price_per_order: tseq.price_per_order,
                                        delivery_price: tseq.delivery_price
                                    });
                                });
                            });
                        }
                    }
                });

                if(!updated) {
                    //the item to be updated was not found in the bidders list
                    trade.bid.push({
                        plan_code: $scope.current_plan.item,
                        task_id: item._id,
                        labor: item.labor,
                        materials: [],
                        equipment: [],
                        subtasks: []
                    });

                    if(item.materials.length) {
                        item.materials.forEach(function(mat, mi) {
                            trade.bid[trade.bid.length - 1].materials.push({
                                material_id: mat._id,
                                quantity: mat.quantity,
                                price_per_order: mat.price_per_order,
                                delivery_price: mat.delivery_price
                            });
                        });
                    }
                    if(item.equipment.length) {
                        item.equipment.forEach(function(mat, mi) {
                            trade.bid[trade.bid.length - 1].equipment.push({
                                equipment_id: mat._id,
                                quantity: mat.quantity,
                                price_per_order: mat.price_per_order,
                                delivery_price: mat.delivery_price
                            });
                        });
                    }
                    if(item.subtasks.length) {
                        item.subtasks.forEach(function(sub, si) {
                            trade.bid[trade.bid.length - 1].subtasks.push({
                                task_id: sub._id,
                                quantity: sub.quantity,
                                bid_hours: sub.bid_hours,
                                labor: sub.labor,
                                materials: [],
                                equipment: []
                            });
                            if(sub.materials.length) {
                                sub.materials.forEach(function(smat, smi) {
                                    trade.bid[trade.bid.length - 1].subtasks[smi].materials.push({
                                        material_id: smat._id,
                                        quantity: smat.quantity,
                                        price_per_order: smat.price_per_order,
                                        delivery_price: smat.delivery_price
                                    });
                                });
                            }
                            if(sub.equipment.length) {
                                sub.equipment.forEach(function(smat, sei) {
                                    trade.bid[trade.bid.length - 1].subtasks[sei].equipment.push({
                                        equipment_id: smat._id,
                                        quantity: smat.quantity,
                                        price_per_order: smat.price_per_order,
                                        delivery_price: smat.delivery_price
                                    });
                                });
                            }
                        });
                    }
                }

                $scope.bid.$update();
                //$scope.updateTablePlan();
            }
        });
    };

    $scope.getTradeCode = function(trade) {
    	var value;
    	switch(trade){
    		case 'Concrete':
    		value = '01';
    		break;
    		case 'Plumbing':
    		value = '02';
    		break;
    		case 'Grader':
    		value = '03';
    		break;
    		case 'Framer':
    		value = '04';
    		break;
    		case 'Drywall':
    		value = '05';
    		break;
    		case 'Roofer':
    		value = '06';
    		break;
    		case 'HVAC':
    		value = '07';
    		break;
    		case 'Stucco':
    		value = '08';
    		break;
    		case 'Electrician':
    		value = '09';
    		break;
    		case 'Unused':
    		value = '10';
    		break;
    		case 'FireSprinkler':
    		value = '11';
    		break;
    		case 'Inuslation':
    		value = '12';
    		break;
    		case 'Painter':
    		value = '13';
    		break;
    		case 'Cabinets':
    		value = '14';
    		break;
    		case 'Masonry':
    		value = '15';
    		break;
    		case 'FinishTrim':
    		value = '16';
    		break;
    		case 'Tile':
    		value = '17';
    		break;
    		case 'Flooring':
    		value = '18';
    		break;
    		case 'Fencing':
    		value = '19';
    		break;
    		case 'LandScaping':
    		value = '20';
    		break;
    	}
    	return value;
    };
  }
]);