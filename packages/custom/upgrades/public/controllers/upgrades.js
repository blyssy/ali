'use strict';

/* jshint -W098 */
angular.module('mean.upgrades').controller('UpgradesController', ['$scope', 'Global', 'Upgrades',
  function($scope, Global, Upgrades) {
    $scope.global = Global;
    $scope.package = {
      name: 'upgrades'
    };
  }
]);
