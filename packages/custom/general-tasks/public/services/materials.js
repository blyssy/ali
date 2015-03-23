'use strict';

angular.module('mean.general-tasks').factory('Materials', ['$resource',
  function($resource) {
    return $resource('/materials/:materialId', {
      materialId: '@_id'
    }, {
    	update: {
    		method: 'PUT'
    	}
    });
  }
]);