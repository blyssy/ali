'use strict';

angular.module('mean.upgrades').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.state('upgrades', {
      url: '/upgrades',
      templateUrl: 'upgrades/views/index.html'
    });
  }
]);
