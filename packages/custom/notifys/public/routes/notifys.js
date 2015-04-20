'use strict';

angular.module('mean.notifys').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.state('notify example page', {
      url: '/notifys/example',
      templateUrl: 'notifys/views/index.html'
    });
  }
]);
