'use strict';

angular.module('mean.general-tasks').controller('SubTasksController', ['$scope', 'Global', 'Menus', '$rootScope', '$http', 'Subtasks', '$filter', 'ngTableParams',
    function($scope, Global, Menus, $rootScope, $http, Subtasks, $filter, ngTableParams) {
        $scope.global = Global;
    $scope.hasAuthorization = function(subtask) {
      if (!subtask || !subtask.user) return false;
      return $scope.global.isAdmin || subtask.user._id === $scope.global.user._id;
    };

        $scope.init = function() {
            Subtasks.query({}, function(subtasks) {
                $scope.subtasks = subtasks;

                var data = subtasks;
    
                $scope.subtaskTableParams = new ngTableParams({
                    page: 1,
                    count: 10
                },{
                    total: data.length,
                    getData: function($defer, params) {
                        params.total(data.length);
                        var orderedData = params.sorting()?$filter('orderBy')(data, params.orderBy()):data;
                        $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                    }
                });
            });
        };

        $scope.add = function() {
            if (!$scope.subtasks) $scope.subtasks = [];

            $scope.subtask_code = $scope.subtask_trade + $scope.subtask;

            var subtask = new Subtasks({
                subtask_code: $scope.subtask_code,
                subtask_trade: $scope.subtask_trade,
                subtask: $scope.subtask,
                subtask_name: $scope.subtask_name
            });

            subtask.$save(function(response) {
                $scope.subtasks.push(response);
                
                var data = $scope.subtasks;
                $scope.subtaskTableParams.total(data.length);
                $scope.subtaskTableParams.reload();
            });

            this.subtask_code = this.subtask_trade = this.subtask = this.subtask_name = '';
        };

        $scope.remove = function(subtask) {
            for (var i in $scope.subtasks) {
                if ($scope.subtasks[i] === subtask) {
                    $scope.subtasks.splice(i, 1);
                }
            }

            subtask.$remove();
            var data = $scope.subtasks;
            $scope.subtaskTableParams.total(data.length);
            $scope.subtaskTableParams.reload();
        };

        $scope.update = function(subtask, subtaskField) {
            subtask.$update();
            $scope.editId = -1;
        };

        $scope.setEditId =  function(pid) {
            $scope.editId = pid;
        };

        /*$scope.doSearch = function () {
            $scope.subtaskTableParams.reload();
        };*/
    }
]);