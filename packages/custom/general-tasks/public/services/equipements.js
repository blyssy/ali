'use strict';

angular.module('mean.general-tasks').factory('Equipments', ['$resource',
  function($resource) {
    return $resource('/equipments/:equipmentId', {
      equipmentId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);