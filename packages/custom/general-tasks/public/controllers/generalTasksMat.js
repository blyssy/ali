'use strict';

angular.module('mean.general-tasks').controller('GeneralTasksMatController', ['$scope', 'Global', 'Menus', '$rootScope', '$http', 'GeneralTasks', 'Materials', '$filter', 'ngTableParams', 'DeleteMaterial',
    function($scope, Global, Menus, $rootScope, $http, GeneralTasks, Materials, $filter, NGTableParams, DeleteMaterial) {
    
        $scope.global = Global;
        $scope.tasks = [];
        $scope.tasks.materials = [];
        //var socket = MeanSocket;

        $scope.hasAuthorization = function(task) {
          if (!task || !task.user) return false;
          return $scope.global.isAdmin || task.user._id === $scope.global.user._id;
        };

        $scope.$on('ListMatAddRefresh', function(event, item) {
            //console.log('listmat needs to be refreshed here' + item.name);

            $scope.current_materials.push(item);

            var data = $scope.current_materials;
            $scope.tableListMatParams.total(data.length);
            $scope.tableListMatParams.reload();
        });

        $scope.$on('ListMatRefresh', function(event, item) {
            //console.log('listmat needs to be refreshed here' + item.name);

            var data = $scope.current_materials;
            $scope.tableListMatParams.total(data.length);
            $scope.tableListMatParams.reload();
        });

        $scope.initListMat = function(task) {
            console.log('in the init function for the task list mat controller');

            console.log('task name: ' + task.task_name);

            $scope.current_task = task;
            var current_materials = [];

            Materials.query({}, function(materials) {
                for(var i=0; i<task.materials.length; i=i+1){
                    for(var j=0; j<materials.length; j=j+1){
                        if(task.materials[i] === materials[j]._id)
                            current_materials.push(materials[j]);
                    }
                }

                $scope.current_materials = current_materials;
                var data = current_materials;

                $scope.tableListMatParams = new NGTableParams({
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

        $scope.removeListMat = function(item, material, index) {
            var task = new GeneralTasks({
                _id: item._id,
                task_code: item.task_code,
                trade: item.trade,
                task: item.task,
                task_name: item.task_name,
                materials: item.materials
            });
        //$scope.current_materials.splice(index, 1);
            
            console.log('spliced at index ' + index);
            console.log(task);
            //item.$deleteMaterial({'index': index});
            task.$delete({'type': 'material', 'index': index}, function(item){
                console.log('back from delete function with item ' + item.materials);

                $scope.current_materials = item.materials;
                //$scope.$emit('ListMatRefresh', material);

                //var data = $scope.current_materials;
                //$scope.tableListMatParams.total(data.length);
                //$scope.tableListMatParams.reload();
            });
            //GeneralTasks.deleteMaterial({'id':item._id, 'index': index});
            //this needs work.  probably setup a route and
            //a service to handle removing a material from
            //a list item.
            //material.$remove();

            var data = $scope.current_materials;
            $scope.tableListMatParams.total(data.length);
            $scope.tableListMatParams.reload();
            //$scope.$emit('ListMatRefresh', material);
        };

        //$scope.setEditListMatId =  function(pid) {
        //    $scope.editId = pid;
        //};
    }
]);