'use strict';

/* jshint -W098 */
angular.module('mean.bids').controller('BidsController', ['$scope', 'Global', 'Bids', '$filter', 'ngTableParams', '$sce',
  function($scope, Global, Bids, $filter, NGTableParams, $sce) {
    $scope.global = Global;
    $scope.package = {
      name: 'bids'
    };

    $scope.init = function() {
    	$scope.editId = 1;

        Bids.query({}, function(bids) {
            $scope.new_bids = $filter('filter')(bids, { bid_status: 'new' });
            $scope.submitted_bids = $filter('filter')(bids, { bid_status: 'submitted' });
            $scope.review_bids = $filter('filter')(bids, { bid_status: 'review' });

            for(var i=0; i<$scope.submitted_bids.length; i=i+1) {
            	var value = Math.floor((Math.random() * 100) + 1);

            	$scope.submitted_bids[i].bid_request_progress = value;
            }
	    	var data = $scope.new_bids;
	        $scope.newBidTableParams = new NGTableParams({
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

    $scope.addBid = function() {
    	console.log('in the add function');
    	if (!$scope.bid_name) $scope.bid_name = [];

    	console.log('in the add function');

    	var bid = new Bids({
    		bid_name: $scope.bid_name,
    		bid_status: 'new'
    	});

    	bid.$save(function(response) {
            $scope.new_bids.push(response);
            
            //var data = $filter('filter')($scope.bids, { bid_status: 'new' });
            var data = $scope.new_bids;
            $scope.newBidTableParams.total(data.length);
            $scope.newBidTableParams.reload();
        });
    };

    $scope.remove = function(bid) {
    	for (var i in $scope.new_bids) {
            if ($scope.new_bids[i] === bid) {
                $scope.new_bids.splice(i, 1);
            }
        }

        bid.$remove();
        //var data = $filter('filter')($scope.bids, { bid_status: 'new' });
        var data = $scope.new_bids;
        $scope.newBidTableParams.total(data.length);
        $scope.newBidTableParams.reload();
    };
    	   
    $scope.getProgress = function(bid) {
    	if(bid.bid_request_progress < 20) {
    		bid.progress_type = 'danger';
    	} else if(bid.bid_request_progress < 60) {
    		bid.progress_type = 'warning';
    	} else {
    		bid.progress_type = 'success';
    	}

    	return bid.bid_request_progress;
    };

    $scope.getProgressType = function(bid) {
    	return 'warning';
    };

    $scope.submitBid = function(bid) {
    	for (var i in $scope.new_bids) {
            if ($scope.new_bids[i] === bid) {
                $scope.new_bids.splice(i, 1);
            }
        }

        bid.bid_status = 'submitted';
        bid.$update();

        $scope.submitted_bids.push(bid);

        var data = $scope.new_bids;
        $scope.newBidTableParams.total(data.length);
        $scope.newBidTableParams.reload();
    };
  }
]);
