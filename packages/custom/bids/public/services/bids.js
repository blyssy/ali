'use strict';

angular.module('mean.bids').factory('Bids', ['$resource',
  function($resource) {
    return $resource('/bids/:bidId', {
      bidId: '@_id'
    }, {
    	update: {
    		method: 'PUT'
    	}
    });
  }
]);

angular.module('mean.bids').factory('BidRequestEdit', function() {
	var savedData = {};
	
	function set(data) {
		savedData = data;
	}
	function get() {
		return savedData;
	}

	return {
		set: set,
		get: get
	};

});
