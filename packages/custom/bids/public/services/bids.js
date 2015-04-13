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
