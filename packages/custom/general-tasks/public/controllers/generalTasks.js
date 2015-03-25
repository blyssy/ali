'use strict';

angular.module('mean.general-tasks').controller('GeneralTasksController', ['$scope', 'Global', 'Menus', '$rootScope', '$http', 'GeneralTasks', '$filter', 'ngTableParams',
    function($scope, Global, Menus, $rootScope, $http, GeneralTasks, $filter, ngTableParams) {
        $scope.global = Global;
    $scope.hasAuthorization = function(task) {
      if (!task || !task.user) return false;
      return $scope.global.isAdmin || task.user._id === $scope.global.user._id;
    };

        $scope.init = function() {
            GeneralTasks.query({}, function(tasks) {
                $scope.tasks = tasks;

                var data = tasks;

                $scope.tableParams = new ngTableParams({
                    page: 1,
                    count: 10
                },{
                    total: data.length,
                    getData: function($defer, params) {
                        params.total(data.length);
                        //var orderedData = params.sorting()?$filter('orderBy')(data, params.orderBy()):data;
                        $defer.resolve(data.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                    }
                });
            });
        };

        $scope.add = function() {
            if (!$scope.tasks) $scope.tasks = [];

            var task = new GeneralTasks({
                task_code: $scope.task_code,
                trade: $scope.trade,
                task: $scope.task,
                task_name: $scope.task_name
            });

            task.$save(function(response) {
                $scope.tasks.push(response);

                var data = $scope.tasks;
                $scope.tableParams.total(data.length);
                $scope.tableParams.reload();
            });

            this.task_code = this.trade = this.task = this.task_name = '';
        };

        $scope.remove = function(task) {
            for (var i in $scope.tasks) {
                if ($scope.tasks[i] === task) {
                    $scope.tasks.splice(i, 1);
                }
            }

            task.$remove();
            var data = $scope.tasks;
            $scope.tableParams.total(data.length);
            $scope.tableParams.reload();
        };

        $scope.update = function(task, taskField) {
            task.$update();
            $scope.editId = -1;
        };

        $scope.setEditId =  function(pid) {
            $scope.editId = pid;
        };

        /*$scope.doSearch = function () {
            $scope.tableParams.reload();
        };*/
    }
]);