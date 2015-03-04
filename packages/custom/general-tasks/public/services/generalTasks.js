'use strict';

angular.module('mean.general-tasks').factory('GeneralTasks', ['$resource',
  function($resource) {
    return $resource('/general-tasks/:taskId', {
      taskId: '@_id'
    }, {
    	update: {
    		method: 'PUT'
    	}
    });
  }
]);

