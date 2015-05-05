'use strict';

angular.module('mean.bids').controller('BidRequestEditController', ['$scope', 'Users', 'Global', 'Bids', '$filter', 'ngTableParams', '$sce', 'toaster', 'NotifyService', 'BidRequestEdit',
  function($scope, Users, Global, Bids, $filter, NGTableParams, $sce, toaster, NotifyService, BidRequestEdit) {
    $scope.global = Global;

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
	    	$scope.bid.task_list.forEach(function(task, index){
	    		var code = $scope.getTradeCode(user.trade[0]);
	    		//console.log('code value ' + code + ' task code value ' + task.trade);
	    		if( task.trade === code ){
	    			bid_tasks.push(task);
	    		}
	    	});

	    	var data = bid_tasks;
	        $scope.bidTasksTableParams = new NGTableParams({
	            page: 1,
	            count: 10
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
  }
]);