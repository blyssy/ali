'use strict';

angular.module('mean.company-factors').factory('CompanyFactors', ['$resource',
  function($resource) {
    return $resource('/company-factors/:factorId', {
      factorId: '@_id'
    }, {
    	update: {
    		method: 'PUT'
    	}
    });
  }
]);
