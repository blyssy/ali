'use strict';

angular.module('mean.general-tasks').controller('GeneralTasksEquipController', ['$scope', 'Global', 'Menus', '$rootScope', '$http', 'GeneralTasks', 'Equipments', '$filter', 'ngTableParams',
    function($scope, Global, Menus, $rootScope, $http, GeneralTasks, Equipments, $filter, NGTableParams) {
    
        $scope.global = Global;
        $scope.tasks = [];
        $scope.tasks.equipments = [];

        $scope.hasAuthorization = function(task) {
          if (!task || !task.user) return false;
          return $scope.global.isAdmin || task.user._id === $scope.global.user._id;
        };

        $scope.$on('ListEquipAddRefresh', function(event, item) {
            $scope.current_equipment.push(item);

            var data = $scope.current_equipment;
            $scope.tableListEquipParams.total(data.length);
            $scope.tableListEquipParams.reload();
        });

        $scope.$on('ListEquipRefresh', function(event, item) {
            var data = $scope.current_equipment;
            $scope.tableListEquipParams.total(data.length);
            $scope.tableListEquipParams.reload();
        });

        $scope.initListEquip = function(task) {
            $scope.current_task = task;
            var current_equipment = [];

            Equipments.query({}, function(equipment) {
                for(var i=0; i<task.equipment.length; i=i+1){
                    for(var j=0; j<equipment.length; j=j+1){
                        if(task.equipment[i] === equipment[j]._id)
                            current_equipment.push(equipment[j]);
                    }
                }

                $scope.current_equipment = current_equipment;
                var data = current_equipment;

                $scope.tableListEquipParams = new NGTableParams({
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

        $scope.removeListEquip = function(item, material, index) {
            var task = new GeneralTasks({
                _id: item._id,
                task_code: item.task_code,
                trade: item.trade,
                task: item.task,
                task_name: item.task_name,
                materials: item.materials,
                equipment: item.equipment
            });
            
            //delete a material from the current task item
            task.$delete({'type': 'equipment', 'index': index}, function(item){

                $scope.current_task.equipment = item.equipment;
                $scope.current_equipment.splice(index, 1);

                $scope.$emit('ListEquipRefresh', item.equipment);
            });
        };
    }
]);