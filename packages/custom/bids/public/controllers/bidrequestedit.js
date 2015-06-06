'use strict';

angular.module('mean.bids').controller('BidRequestEditController', ['$scope', 'Users', 'Global', 'Bids', '$filter', 'ngTableParams', '$sce', 'toaster', 'NotifyService', 'BidRequestEdit',
  function($scope, Users, Global, Bids, $filter, NGTableParams, $sce, toaster, NotifyService, BidRequestEdit) {
    $scope.global = Global;

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
    	var current_bid_index = 0;

    	Users.get({ userId: $scope.global.user._id}, function(user) {
            $scope.my_bid_trade = $scope.getTradeCode(user.trade[0]);
	    	$scope.bid.task_list.forEach(function(task, index){
	    		var code = $scope.my_bid_trade;
	    		//console.log('code value ' + code + ' task code value ' + task.trade);
	    		if( task.trade === code ){
	    			bid_tasks.push(task);
	    			$scope.bid.bidding_trades.forEach(function(bid, ii){
	    				if(bid.trade === user.trade[0]) {
                            //need to get bid_hours and quantities for each bid menu
                            //start with a basic

                            //bid_tasks[current_bid_index].subtasks[0].quantity = 100; //bid.bid[0].subtasks[0].quantity;
                            //bid_tasks[current_bid_index].subtasks[0].bid_hours = 23; //bid.bid[0].subtasks[0].bid_hours;
                            bid_tasks[current_bid_index].subtasks.forEach(function(subtask, idx){
                                subtask.quantity = idx + 100;
                                subtask.bid_hours = idx + 10;
                            });
	    					console.log('this is where we need to add to the list for actual bid numbers ' + code);
	    					//dummy values for now.  need to pull from the first bid index for the bidder
	    					bid_tasks[current_bid_index].task_labor = index;
	    					bid_tasks[current_bid_index].task_equipment = index;
	    					bid_tasks[current_bid_index].task_material = index;

	    					current_bid_index = current_bid_index + 1;
	    				}
	    			});
	    		}
	    	});

	    	$scope.bid_total = '2000';
	    	$scope.bid_direct_labor = '900';

	    	var data = bid_tasks;
	        $scope.bidTasksTableParams = new NGTableParams({
	            page: 1,
	            count: 100
	        },{
	            total: data.length,
	            getData: function($defer, params) {
	                params.total(data.length);
	                var orderedData = params.sorting()?$filter('orderBy')(data, params.orderBy()):data;
	                $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
	            }
	        });
	    });
    };

    $scope.onSelect = function() {
    	console.log('in the onSelect function ' + $scope.current_plan.item);
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
        console.log('this is where we save to the individuals bid information' + $scope);
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