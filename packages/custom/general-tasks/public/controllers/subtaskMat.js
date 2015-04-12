'use strict';

angular.module('mean.general-tasks').controller('SubTasksMatController', ['$scope', 'Global', 'Menus', '$rootScope', '$http', 'Subtasks', 'Materials', '$filter', 'ngTableParams',
    function($scope, Global, Menus, $rootScope, $http, Subtasks, Materials, $filter, NGTableParams) {
    
        $scope.global = Global;
        $scope.subtasks = [];
        $scope.subtasks.materials = [];

        $scope.hasAuthorization = function(task) {
          if (!task || !task.user) return false;
          return $scope.global.isAdmin || task.user._id === $scope.global.user._id;
        };

        $scope.$on('SubListMatAddRefresh', function(event, item) {
            $scope.current_materials.push(item);

            var data = $scope.current_materials;
            $scope.tableSubListMatParams.total(data.length);
            $scope.tableSubListMatParams.reload();
        });

        $scope.$on('SubListMatRefresh', function(event, item) {
            var data = $scope.current_materials;
            $scope.tableSubListMatParams.total(data.length);
            $scope.tableSubListMatParams.reload();
        });

        $scope.initSubListMat = function(subtask) {
            $scope.current_subtask = subtask;
            var current_materials = [];

            Materials.query({}, function(materials) {
                for(var i=0; i<subtask.materials.length; i=i+1){
                    for(var j=0; j<materials.length; j=j+1){
                        if(subtask.materials[i] === materials[j]._id)
                            current_materials.push(materials[j]);
                    }
                }

                $scope.current_materials = current_materials;
                var data = current_materials;

                $scope.tableSubListMatParams = new NGTableParams({
                    page: 1,
                    count: 5
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

        $scope.removeSubListMat = function(item, material, index) {
            var subtask = new Subtasks({
                _id: item._id,
                subtask_code: item.subtask_code,
                subtask_trade: item.subtask_trade,
                subtask: item.subtask,
                subtask_name: item.subtask_name,
                materials: item.materials,
                equipments: item.equipments
            });
            
            //delete a material from the current task item
            subtask.$delete({'type': 'material', 'index': index}, function(item){

                $scope.current_subtask.materials = item.materials;
                $scope.current_materials.splice(index, 1);

                $scope.$emit('SubListMatRefresh', item.materials);
            });
        };
    }
]);