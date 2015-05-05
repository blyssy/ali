'use strict';

/* jshint -W098 */
angular.module('mean.bids').controller('BidRequestsController', ['$scope', 'Users', 'Global', 'Bids', '$filter', 'ngTableParams', '$sce', 'toaster', 'NotifyService', 'BidRequestEdit',
  function($scope, Users, Global, Bids, $filter, NGTableParams, $sce, toaster, NotifyService, BidRequestEdit) {
    $scope.global = Global;
    $scope.package = {
      name: 'bids'
    };

    $scope.init = function() {
    	$scope.editId = 1;

        Bids.query({}, function(bids) {
            //$scope.new_bids = $filter('filter')(bids, { bid_status: 'new' });
            //$scope.submitted_bids = $filter('filter')(bids, { bid_status: 'submitted' });
            //$scope.review_bids = $filter('filter')(bids, { bid_status: 'review' });
            $scope.requests = $filter('filter')(bids, { bid_status: 'submitted' });
            Users.get({ userId: $scope.global.user._id}, function(user) {
                console.log('getting the current user trade ' + user.trade);
                //var trades = $scope.requests.bidding_trades[0].trade;
                //$scope.user_requests = $filter('filter')($scope.requests, { trades: user.trade });

                var user_requests = [];

                for(var i=0; i<$scope.requests.length; i=i+1) {
                    for(var j=0; j<$scope.requests[i].bidding_trades.length; j=j+1){
                        if($scope.requests[i].bidding_trades[j].trade === user.trade[0]) {
                            user_requests.push($scope.requests[i]);
                        }
                    }
                }

                $scope.user_requests = user_requests;
                //$scope.requests = $filter('filter')($scope.requests, { bidding_trades:  });

    	    	var data = $scope.user_requests;
    	        $scope.requestsBidTableParams = new NGTableParams({
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

    $scope.editBid = function(bid) {
        console.log('setting the bid to be editted.');
        BidRequestEdit.set(bid);
    };

    $scope.submitBid = function(bid) {
    	//for (var i in $scope.new_bids) {
        //    if ($scope.new_bids[i] === bid) {
        //        $scope.new_bids.splice(i, 1);
        //    }
        //}

        //bid.bid_status = 'submitted';
        //bid.$update();

        //probably use the date_completed variable for the bidding trade when the bid request is completed by
        //each trade manager.

        for(var j=0; j<bid.bidding_trades.length; j=j+1) {
            NotifyService.addNotification(bid.bidding_trades[j].username, 'toast-info', 'New Bid', 'There is a new bid request for you to fill out and return', 'No');
        }
        $scope.$broadcast('notificationAdded');
        //$scope.submitted_bids.push(bid);

        //for(var j=0; bid.bidding_trades.length; j=j+1) {
        //    Notifys.addNotification(bid.bidding_trades[j].username, 'toast-info', 'New Bid', 'There is a new bid request for you to fill out and return', 'No');
        //}

        //var data = $scope.new_bids;
        //$scope.newBidTableParams.total(data.length);
        //$scope.newBidTableParams.reload();
    };
  }
]);
