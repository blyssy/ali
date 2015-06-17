'use strict';

angular.module('mean.bids').controller('BidRequestEditController', ['$scope', 'Users', 'Global', 'Bids', '$filter', 'ngTableParams', '$sce', 'toaster', 'NotifyService', 'BidRequestEdit', 'CompanyFactors',
  function($scope, Users, Global, Bids, $filter, NGTableParams, $sce, toaster, NotifyService, BidRequestEdit, CompanyFactors) {
    $scope.global = Global;

    $scope.expanded_table = 'true';
    $scope.bid_total_labor = 0;
    $scope.bid_total_materials = 0;
    $scope.bid_total_equipment = 0;
    $scope.bid_total = 0;
    $scope.bid_general_liability = 0;

    var data = [];

    $scope.toggleTableColumns = function() {
        if($scope.expanded_table === 'true') {
            $scope.expanded_table = 'false';
        } else {
            $scope.expanded_table = 'true';
        }
    };

    $scope.init = function() {
        $scope.expanded_table = 'false';
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

        $scope.bid_menu.push({
            item: 'Cover'
        });

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
                                                                if(smq.delivery_price) {
                                                                  tsmq.delivery_price = smq.delivery_price;
                                                                  tsmq.delivery_sub_total = tsmq.delivery_sub_total + smq.delivery_price;
                                                                }
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
        

            CompanyFactors.query({}, function(company_factors) {
                company_factors.forEach(function(company_factor) {
                    if(company_factor.trade_code === $scope.my_bid_trade) {
                
                        $scope.company_factors = company_factor;
                    
                        // if($scope.company_factors)
                        $scope.applayCalculations(bid_tasks);

            	    	//$scope.bid_total = '2000';
            	    	//$scope.bid_direct_labor = '900';

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
                    }
                });
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
                                        task.equipment.forEach(function(mat){
                                            mat.quantity = '';
                                        });
                                        task.materials.forEach(function(eq) {
                                            eq.quantity = '';
                                        });
                                        task.subtasks.forEach(function(sub) {
                                            sub.quantity = '';
                                            sub.bid_hours = '';
                                            sub.materials.forEach(function(smat) {
                                                smat.quantity = '';
                                            });
                                            sub.equipment.forEach(function(seq) {
                                                seq.quantity = '';
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

        $scope.applayCalculations(bid_tasks);

        //$scope.bid_total = '2000';
        //$scope.bid_direct_labor = '900';

        data = bid_tasks;

        $scope.bidTasksTableParams.reload();
    };

    $scope.currentNetPay = function(bid_hours, crew_rate, quantity, piece_rate) {
        var val = 0;

        if(bid_hours > 0) {
            val = bid_hours * crew_rate;
        } else {
            val = quantity * piece_rate;
        }

        return val;
    };

    $scope.directLaborCosts = function(bid_hours, quantity, ali_crew_rate) {
        var val = 0;
        if(bid_hours === 0) {
            val = quantity * ali_crew_rate;
        } else {
            val = bid_hours * ali_crew_rate;
        }

        return val;
    };

    $scope.aliCrewRate = function(bid_hours, piece_rate, crew_rate, ali_crew_net_pay) {
        var val = 0;

        if(bid_hours === 0) {
            val = piece_rate * ali_crew_net_pay;
        } else {
            val = crew_rate * ali_crew_net_pay;
        }

        return val;
    };

    $scope.aliCrewNetPay = function(direct_labor_costs, training_and_education) {
        return direct_labor_costs - training_and_education;
    };

    // $scope.increasePay = function(ali_crew_net_pay, current_net_pay) {
    //     return ali_crew_net_pay - current_net_pay;
    // };

    $scope.hoursAllowed = function(bid_hours, current_net_pay, crew_rate) {
        var temp_value = 0;

        if(!bid_hours) bid_hours = 0;
        if(!current_net_pay) current_net_pay = 0;
        if(!crew_rate) crew_rate = 0;

        if(bid_hours === 0) {
            if(crew_rate)
              temp_value = (current_net_pay / crew_rate);
            else
              temp_value = 0;
        } else {
            temp_value = bid_hours;
        }

        return $filter('number')(temp_value, 2);
    };

    $scope.trainingAndEducation = function(hours_allowed, training_and_education) {
        return hours_allowed * training_and_education;
    };

    $scope.employeeBenefits = function(hours_allowed, benefits) {
        return hours_allowed * benefits;
    };

    $scope.applayCalculations = function(tasks) {
        //this is where we take a built task list and add the
        //extra calculations of items that do not get stored.
        $scope.bid_total_labor = 0;
        $scope.bid_total_materials = 0;
        $scope.bid_total_equipment = 0;
        $scope.bid_total = 0;
        var subtask_mat_subtotal;
        var subtask_mat_dev_subtotal;
        var subtask_eq_subtotal;
        var subtask_eq_dev_subtotal;
        var task_material_total;
        var task_equipment_total;
        var task_total_labor;
        var total_labor = 0;
        var task_total_hours_allowed = 0;
        var task_employee_benefits;
        var task_traning_and_education;

        tasks.forEach(function(task, index) {
            task_material_total = 0;
            task_equipment_total = 0;
            subtask_eq_subtotal = 0;
            subtask_eq_dev_subtotal = 0;
            task_total_labor = 0;
            task_total_hours_allowed = 0;
            task_employee_benefits = 0;
            task_traning_and_education = 0;

            //iterate over the subtasks and add up
            task.subtasks.forEach(function(subtask, ii) {
                subtask_mat_subtotal = 0;
                subtask_mat_dev_subtotal = 0;
                subtask_eq_subtotal = 0;
                subtask_eq_dev_subtotal = 0;
                
                subtask.materials.forEach(function(smat) {
                    if(!smat.quantity) smat.quantity = 0;
                    if(!smat.price_per_order) smat.price_per_order = 0;
                    if(!smat.delivery_price) smat.delivery_price = 0;

                    subtask_mat_subtotal += smat.quantity * smat.price_per_order;
                    subtask_mat_dev_subtotal += smat.delivery_price;
                });

                subtask.equipment.forEach(function(seq) {
                    if(!seq.quantity) seq.quantity = 0;
                    if(!seq.price) seq.price = 0;
                    if(!seq.delivery_price) seq.delivery_price = 0;
                    
                    subtask_eq_subtotal += seq.quantity * seq.price;
                    subtask_eq_dev_subtotal += seq.delivery_price;
                });

                subtask.material_subtotal = subtask_mat_subtotal;
                subtask.material_delivery_subtotal = subtask_mat_dev_subtotal;
                subtask.equipment_subtotal = subtask_eq_subtotal;
                subtask.equipment_delivery_subtotal = subtask_eq_dev_subtotal;

                subtask.total_materials = (subtask.material_subtotal + 
                    (subtask.material_subtotal * $scope.company_factors.sales_tax )) + subtask.material_delivery_subtotal;
                
                subtask.total_equipment = subtask.equipment_subtotal + subtask.equipment_delivery_subtotal;

                task_material_total += subtask.total_materials;
                task_equipment_total += subtask.total_equipment;

                subtask.current_net_pay = 
                    $scope.currentNetPay(subtask.bid_hours, subtask.crew_rate, subtask.quantity, subtask.piece_rate);
                subtask.hours_allowed = 
                    $scope.hoursAllowed(subtask.bid_hours, subtask.current_net_pay, subtask.crew_rate);
                subtask.employee_benefits = 
                    $scope.employeeBenefits(subtask.hours_allowed, $scope.company_factors.benefits);
                subtask.training_and_education = 
                    $scope.trainingAndEducation(subtask.hours_allowed, $scope.company_factors.training_education);

                task_employee_benefits += subtask.employee_benefits;
                task_traning_and_education += subtask.training_and_education;
                task_total_labor += subtask.current_net_pay;
                task_total_hours_allowed = parseFloat(task_total_hours_allowed) + parseFloat(subtask.hours_allowed);
                task_total_hours_allowed.toFixed(2);
            });

            task.total_labor = task_total_labor;
            task.total_current_net_pay = task_total_labor;
            task.total_hours_allowed = task_total_hours_allowed;
            task.total_employee_benefits = task_employee_benefits;
            task.total_training_and_education = task_traning_and_education;

            var materials_subtotal = 0;
            var materials_dev_subtotal = 0;
            task.materials.forEach(function(mat, ii) {
                if(!mat.quantity) mat.quantity = 0;
                if(!mat.price_per_order) mat.price_per_order = 0;
                if(!mat.delivery_price) mat.delivery_price = 0;
                
                materials_subtotal += mat.quantity * mat.price_per_order;
                materials_dev_subtotal += mat.delivery_price;
            });

            task.materials_subtotal = materials_subtotal;
            task.materials_dev_subtotal = materials_dev_subtotal;

            var equipment_subtotal = 0;
            var equipment_dev_subtotal = 0;
            task.equipment.forEach(function(eq, ii) {
                if(!eq.quantity) eq.quantity = 0;
                if(!eq.price) eq.price = 0;
                if(!eq.delivery_price) eq.delivery_price = 0;
                
                equipment_subtotal += eq.quantity * eq.price;
                equipment_dev_subtotal += eq.delivery_price;
            });

            task.equipment_subtotal = equipment_subtotal;
            task.equipment_dev_subtotal = equipment_dev_subtotal;

            task.total_materials = task_material_total + 
                (task.materials_subtotal + (task.materials_subtotal * $scope.company_factors.sales_tax)) +
                task.materials_dev_subtotal;

            task.total_equipment = task_equipment_total + equipment_subtotal + equipment_dev_subtotal;

            if(!task_total_labor) task_total_labor = 0;
            if(!task.total_hours_allowed) task.total_hours_allowed = 0;
            if(!task.total_materials) task.total_materials = 0;
            if(!task.total_equipment) task.total_equipment = 0;

            $scope.bid_total_labor += task_total_labor;
            $scope.bid_total_materials += task.total_materials;
            $scope.bid_total_equipment += task.total_equipment;
        });

        $scope.bid_general_liability = $scope.bid_total_labor * $scope.company_factors.general_liability;
        $scope.bid_general_liability += $scope.bid_total_materials * $scope.company_factors.general_liability;
        $scope.bid_general_liability += $scope.bid_total_equipment * $scope.company_factors.general_liability;

        $scope.bid_total = $scope.bid_total_labor + $scope.bid_total_materials + $scope.bid_total_equipment + $scope.bid_general_liability;
        //$scope.bid_general_liability = $scope.bid_total * $scope.company_factors.general_liability;
        //$scope.bid_total_labor = total_labor;
        console.log('setting total labor to ' + total_labor);
    };

    $scope.onSelect = function() {
        if($scope.current_plan.item === 'Cover') {
            data = [];
            $scope.bidTasksTableParams.reload();
        } else {
            $scope.updateTablePlan();
        }
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
                                    // material_subtotal: tsub.material_subtotal,
                                    // material_delivery_subtotal: tsub.material_delivery_subtotal,
                                    // equipment_subtotal: tsub.equipment_subtotal,
                                    // equipment_delivery_subtotal: tsub.equipment_delivery_subtotal,
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
                
                $scope.updateTablePlan();
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