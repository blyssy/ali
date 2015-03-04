'use strict';

/* jshint -W098 */
angular.module('mean.inspinia').controller('InspiniaController', ['$scope', 'Global', 'Inspinia',
  function($scope, Global, Inspinia) {
    $scope.global = Global;
    $scope.package = {
      name: 'inspinia'
    };
  }
]);
