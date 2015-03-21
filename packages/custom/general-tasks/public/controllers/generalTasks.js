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
                console.log(tasks);
                $scope.tasks = tasks;
                console.log('size of task list is ' + $scope.tasks.length);
            });
        };

        $scope.add = function() {
            if (!$scope.tasks) $scope.tasks = [];

            console.log('in the add function with ' + $scope.task);
            var task = new GeneralTasks({
                task_code: $scope.task.task_code,
                trade: $scope.task.trade,
                task: $scope.task.task,
                task_name: $scope.task.task_name
            });

            task.$save(function(response) {
                $scope.tasks.push(response);
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
            console.log('task value: ' + task);
            console.log('taskField value: ' + taskField);
            task.$update();
        };

        var data = GeneralTasks.query();
    
        $scope.tableParams = new ngTableParams({
            page: 1,
            count: 10
        },{
            total: data.length,
            getData: function($defer, params) {
                $defer.resolve(data.slice((params.page() - 1) * params.count(), params.page() * params.count()));
            }
        });

        $scope.editId = -1;

        $scope.setEditId =  function(pid) {
            $scope.editId = pid;
        };
    }
]);