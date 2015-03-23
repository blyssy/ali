'use strict';

angular.module('mean.general-tasks').factory('Units', ['$resource',
  function($resource) {
    return $resource('/units/:unitId', {
      taskId: '@_id'
    }, {
    	update: {
    		method: 'PUT'
    	}
    });
  }
]);