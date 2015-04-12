'use strict';

angular.module('mean.general-tasks').controller('SubTasksEquipController', ['$scope', 'Global', 'Menus', '$rootScope', '$http', 'Subtasks', 'Equipments', '$filter', 'ngTableParams',
    function($scope, Global, Menus, $rootScope, $http, Subtasks, Equipments, $filter, NGTableParams) {
    
        $scope.global = Global;
        $scope.subtasks = [];
        $scope.subtasks.equipments = [];

        $scope.hasAuthorization = function(subtask) {
          if (!subtask || !subtask.user) return false;
          return $scope.global.isAdmin || subtask.user._id === $scope.global.user._id;
        };

        $scope.$on('SubListEquipAddRefresh', function(event, item) {
            $scope.current_equipment.push(item);

            var data = $scope.current_equipment;
            $scope.tableSubListEquipParams.total(data.length);
            $scope.tableSubListEquipParams.reload();
        });

        $scope.$on('SubListEquipRefresh', function(event, item) {
            var data = $scope.current_equipment;
            $scope.tableSubListEquipParams.total(data.length);
            $scope.tableSubListEquipParams.reload();
        });

        $scope.initSubListEquip = function(subtask) {
            $scope.current_subtask = subtask;
            var current_equipment = [];

            Equipments.query({}, function(equipment) {
                for(var i=0; i<subtask.equipment.length; i=i+1){
                    for(var j=0; j<equipment.length; j=j+1){
                        if(subtask.equipment[i] === equipment[j]._id)
                            current_equipment.push(equipment[j]);
                    }
                }

                $scope.current_equipment = current_equipment;
                var data = current_equipment;

                $scope.tableSubListEquipParams = new NGTableParams({
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

        $scope.removeSubListEquip = function(item, material, index) {
            var subtask = new Subtasks({
                _id: item._id,
                subtask_code: item.subtask_code,
                subtask_trade: item.subtask_trade,
                subtask: item.subtask,
                subtask_name: item.subtask_name,
                materials: item.materials,
                equipment: item.equipment
            });
            
            //delete a material from the current task item
            subtask.$delete({'type': 'equipment', 'index': index}, function(item){

                $scope.current_subtask.equipment = item.equipment;
                $scope.current_equipment.splice(index, 1);

                $scope.$emit('SubListEquipRefresh', item.equipment);
            });
        };
    }
]);