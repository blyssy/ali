'use strict';

angular.module('mean.general-tasks').factory('Subtasks', ['$resource',
  function($resource) {
    return $resource('/subtasks/:subtaskId', {
      subtaskId: '@_id'
    }, {
    	update: {
    		method: 'PUT'
    	}
    });
  }
]);

