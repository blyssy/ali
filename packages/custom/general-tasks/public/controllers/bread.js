'use strict';

/* jshint -W098 */
angular.module('mean.general-tasks').controller('breadController', ['$scope', 'Global',
  function($scope, Global) {
    $scope.taskInit = function () {
      $scope.breadCrumbs = [{
        'location': 'task control',
        'name': 'Task Control'
      }, {
        'location': 'tasks list',
        'name': 'Tasks'
      }, {
        'location': 'subtasks list',
        'name': 'Sub Tasks'
      }];
    };

    $scope.subtaskInit = function () {
      $scope.breadCrumbs = [{
        'location': 'task control',
        'name': 'Task Control'
      }, {
        'location': 'tasks list',
        'name': 'Tasks'
      }, {
        'location': 'subtasks list',
        'name': 'Sub Tasks'
      }];
    };

    $scope.materialInit = function () {
      $scope.breadCrumbs = [{
        'location': 'task control',
        'name': 'Task Control'
      }, {
        'location': 'tasks materials',
        'name': 'Materials'
      }];
    };

    $scope.unitInit = function () {
      $scope.breadCrumbs = [{
        'location': 'task control',
        'name': 'Task Control'
      }, {
        'location': 'tasks units',
        'name': 'Units'
      }];
    };

    $scope.equipmentInit = function () {
      $scope.breadCrumbs = [{
        'location': 'task control',
        'name': 'Task Control'
      }, {
        'location': 'tasks equipment',
        'name': 'Equipment'
      }];
    };

    $scope.mainInit = function () {
      $scope.breadCrumbs = [{
        'location': 'task control',
        'name': 'Task Control'
      }];
    };
    
  }
]);
