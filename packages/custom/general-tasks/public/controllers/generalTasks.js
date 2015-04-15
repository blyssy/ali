'use strict';

angular.module('mean.general-tasks').controller('GeneralTasksController', ['$scope', 'Global', 'Menus', '$rootScope', '$http', 'GeneralTasks', 'Materials', 'Equipments', '$filter', 'ngTableParams', 
    function($scope, Global, Menus, $rootScope, $http, GeneralTasks, Materials, Equipments, $filter, NGTableParams) {
    
        $scope.global = Global;
        $scope.tasks = [];
        $scope.tasks.materials = [];
        $scope.tasks.equipments = [];

        $scope.hasAuthorization = function(task) {
          if (!task || !task.user) return false;
          return $scope.global.isAdmin || task.user._id === $scope.global.user._id;
        };

        $scope.init = function() {
            GeneralTasks.query({}, function(tasks) {
                $scope.tasks = tasks;

                Materials.query({}, function(materials) {
                    //get the materials list
                    $scope.materials_list = materials;
                });

                Equipments.query({}, function(equipments) {
                    //get the equipments list
                    $scope.equipments_list = equipments;
                });

                var data = tasks;

                $scope.tableParams = new NGTableParams({
                    page: 1,
                    count: 10,
                    sorting: {
                        order: 'asc'     // initial sorting
                    }
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

        $scope.addNewMaterial = function(task, material) {
            console.log('in addNewMaterial with task id %s and material id %s', task._id, material._id);
            var local_task = new GeneralTasks({
                _id: task._id,
                task_code: task.task_code,
                trade: task.trade,
                task: task.task,
                task_name: task.task_name,
                materials: task.materials,
                equipment: task.equipment
            });
            
            local_task.materials.push(material._id);

            local_task.$update(function(response){
                if (response._id !== undefined) {
                  $scope.$broadcast('ListMatAddRefresh', material);
                }
            });
            //$scope.materials_list = '';
        };

        $scope.addNewEquipment = function(task, equipment) {
            //console.log('in addNewMaterial with task id %s and material id %s', task._id, material._id);
            var local_task = new GeneralTasks({
                _id: task._id,
                task_code: task.task_code,
                trade: task.trade,
                task: task.task,
                task_name: task.task_name,
                materials: task.materials,
                equipment: task.equipment
            });
            
            local_task.equipment.push(equipment._id);

            local_task.$update(function(response){
                if (response._id !== undefined) {
                  $scope.$broadcast('ListEquipAddRefresh', equipment);
                }
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
            //console.log('in the public/controller update function');
            task.task_code = task.trade + task.task;
            task.$update();
            $scope.editId = -1;
        };

        $scope.setEditId =  function(pid) {
            $scope.editId = pid;
        };

        $scope.getTradeName = function(id) {
            var tradeText = '';
            switch(id){
                case '01':
                  tradeText = 'Concrete';
                  break;
                case '02':
                  tradeText = 'Plumbing';
                  break;
                case '03':
                  tradeText = 'Grader';
                  break;
                case '04':
                  tradeText = 'Framer';
                  break;
                case '05':
                  tradeText = 'Drywall';
                  break;
                case '06':
                  tradeText = 'Roofer';
                  break;
                case '07':
                  tradeText = 'HVAC';
                  break;
                case '08':
                  tradeText = 'Stucco';
                  break;
                case '09':
                  tradeText = 'Electrician';
                  break;
                case '10':
                  tradeText = 'Unused';
                  break;
                case '11':
                  tradeText = 'Fire Sprinkler';
                  break;
                case '12':
                  tradeText = 'Insulation';
                  break;
                case '13':
                  tradeText = 'Painter';
                  break;
                case '14':
                  tradeText = 'Cabinets';
                  break;
                case '15':
                  tradeText = 'Masonry';
                  break;
                case '16':
                  tradeText = 'Finish Trim';
                  break;
                case '17':
                  tradeText = 'Tile';
                  break;
                case '18':
                  tradeText = 'Flooring';
                  break;
                case '19':
                  tradeText = 'Fencing';
                  break;
                case '20':
                  tradeText = 'Lanscaping';
                  break;
            }
            return tradeText;
        };
    }
]);