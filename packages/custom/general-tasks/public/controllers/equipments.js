'use strict';

angular.module('mean.general-tasks').controller('EquipmentsController', ['$scope', 'Global', 'Menus', '$rootScope', '$http', 'Equipments', '$filter', 'ngTableParams',
    function($scope, Global, Menus, $rootScope, $http, Equipments, $filter, NGTableParams) {
        $scope.global = Global;
    $scope.hasAuthorization = function(equipment) {
      if (!equipment || !equipment.user) return false;
      return $scope.global.isAdmin || equipment.user._id === $scope.global.user._id;
    };

        $scope.init = function() {
            Equipments.query({}, function(equipments) {
                $scope.equipments = equipments;

                var data = equipments;
            
                $scope.tableEquipmentsParams = new NGTableParams({
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
            if (!$scope.equipments) $scope.equipments = [];
            console.log('In add function with ' + $scope.name);

            var equipment = new Equipments({
                name: $scope.name,
                description: $scope.description,
                delivery_offset: $scope.delivery_offset
            });

            equipment.$save(function(response) {
                $scope.equipments.push(response);

                var data = $scope.equipments;
                $scope.tableEquipmentsParams.total(data.length);
                $scope.tableEquipmentsParams.reload();
            });

            this.name = this.description = this.unit = this.delivery_offset = '';
        };

        $scope.remove = function(equipment) {
            for (var i in $scope.equipments) {
                if ($scope.equipments[i] === equipment) {
                    $scope.equipments.splice(i, 1);
                }
            }

            equipment.$remove();
            var data = $scope.equipments;
            $scope.tableEquipmentsParams.total(data.length);
            $scope.tableEquipmentsParams.reload();
        };

        $scope.update = function(equipment, equipmentField) {
            equipment.$update();
            $scope.equipmentsEditId = -1;
        };

        $scope.setEquipmentsEditId =  function(pid) {
            $scope.equipmentsEditId = pid;
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