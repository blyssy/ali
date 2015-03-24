'use strict';

/* jshint -W098 */
angular.module('mean.bids').controller('BidsController', ['$scope', 'Global', 'Bids',
  function($scope, Global, Bids) {
    $scope.global = Global;
    $scope.package = {
      name: 'bids'
    };
  }
]);
