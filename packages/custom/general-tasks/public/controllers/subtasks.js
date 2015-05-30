'use strict';

angular.module('mean.general-tasks').controller('SubTasksController', ['$scope', 'Global', 'Menus', '$rootScope', '$http', 'Subtasks', '$filter', 'ngTableParams', 'Materials', 'Equipments',
    function($scope, Global, Menus, $rootScope, $http, Subtasks, $filter, NGTableParams, Materials, Equipments) {
        $scope.global = Global;
        $scope.subtasks = [];
        $scope.subtasks.materials = [];
        $scope.subtasks.equipments = [];

    $scope.hasAuthorization = function(subtask) {
      if (!subtask || !subtask.user) return false;
      return $scope.global.isAdmin || subtask.user._id === $scope.global.user._id;
    };

        $scope.initSub = function() {
            Subtasks.query({}, function(subtasks) {
                $scope.subtasks = subtasks;

                Materials.query({}, function(materials) {
                    //get the materials list
                    $scope.materials_list = materials;
                });

                Equipments.query({}, function(equipments) {
                    //get the equipments list
                    $scope.equipments_list = equipments;
                });

                var data = subtasks;
    
                $scope.subtaskTableParams = new NGTableParams({
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
                subtask_name: $scope.subtask_name,
                piece_rate: $scope.piece_rate,
                crew_rate: $scope.crew_rate,
                piece_per_hour_rate: $scope.piece_per_hour_rate
            });

            subtask.$save(function(response) {
                $scope.subtasks.push(response);
                
                var data = $scope.subtasks;
                $scope.subtaskTableParams.total(data.length);
                $scope.subtaskTableParams.reload();
            });

            this.subtask_code = 
            this.subtask_trade = 
            this.subtask = 
            this.subtask_name = 
            this.piece_rate =
            this.crew_rate = 
            this.piece_per_hour_rate = '';
        };

        $scope.addNewMaterial = function(subtask, material) {
            console.log('in addNewMaterial with subtask id %s and material id %s', subtask._id, material._id);
            var local_subtask = new Subtasks({
                _id: subtask._id,
                subtask_code: subtask.subtask_code,
                subtask_trade: subtask.subtask_trade,
                subtask: subtask.subtask,
                subtask_name: subtask.subtask_name,
                piece_rate: subtask.piece_rate,
                crew_rate: subtask.crew_rate,
                piece_per_hour_rate: subtask.piece_per_hour_rate,
                materials: subtask.materials,
                equipment: subtask.equipment
            });
            
            local_subtask.materials.push(material._id);

            local_subtask.$update(function(response){
                if (response._id !== undefined) {
                  $scope.$broadcast('SubListMatAddRefresh', material);
                }
            });
            //this.materials_list = '';
        };

        $scope.addNewEquipment = function(subtask, equipment) {
            //console.log('in addNewMaterial with task id %s and material id %s', task._id, material._id);
            var local_subtask = new Subtasks({
                _id: subtask._id,
                subtask_code: subtask.subtask_code,
                subtask_trade: subtask.subtask_trade,
                subtask: subtask.subtask,
                subtask_name: subtask.subtask_name,
                piece_rate: subtask.piece_rate,
                crew_rate: subtask.crew_rate,
                piece_per_hour_rate: subtask.piece_per_hour_rate,
                materials: subtask.materials,
                equipment: subtask.equipment
            });
            
            local_subtask.equipment.push(equipment._id);

            local_subtask.$update(function(response){
                if (response._id !== undefined) {
                  $scope.$broadcast('SubListEquipAddRefresh', equipment);
                }
            });
            //this.equipments_list = '';
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
            subtask.subtask_code = subtask.subtask_trade + subtask.subtask;
            subtask.$update();
            $scope.editSubId = -1;
        };

        $scope.setEditSubId =  function(pid) {
            $scope.editSubId = pid;
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