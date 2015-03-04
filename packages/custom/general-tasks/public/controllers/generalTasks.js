'use strict';

angular.module('mean.general-tasks').controller('GeneralTasksController', ['$scope', 'Global', 'Menus', '$rootScope', '$http', 'GeneralTasks',
    function($scope, Global, Menus, $rootScope, $http, GeneralTasks) {
        $scope.global = Global;
    $scope.hasAuthorization = function(task) {
      if (!task || !task.user) return false;
      return $scope.global.isAdmin || task.user._id === $scope.global.user._id;
    };

        $scope.init = function() {
            GeneralTasks.query({}, function(tasks) {
                $scope.tasks = tasks;
            });
        };

        $scope.add = function() {
            if (!$scope.tasks) $scope.tasks = [];

            var task = new GeneralTasks({
                task_code: $scope.task.task_code,
                trade: $scope.task.trade,
                task: $scope.task.task,
                task_name: $scope.task.task_name
            });

            task.$save(function(response) {
                $scope.gtasks.push(response);
            });

            this.taskCode = this.trade = this.task = this.taskName = '';
        };

        $scope.remove = function(task) {
            for (var i in $scope.tasks) {
                if ($scope.tasks[i] === task) {
                    $scope.tasks.splice(i, 1);
                }
            }

            task.$remove();
        };

        $scope.update = function(task, taskField) {
            task.$update();
        };
    }
]);