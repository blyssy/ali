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
                unit: $scope.unit,
                delivery_offset: $scope.delivery_offset
            });

            equipment.$save(function(response) {
                $scope.equipments.push(response);

                var data = $scope.equipments;
                $scope.tableEquipmentsParams.total(data.length);
                $scope.tableEquipmentsParams.reload();
            });

            this.name = this.unit = this.delivery_offset = '';
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

        /*$scope.doSearch = function () {
            $scope.tableEquipmentsParams.reload();
        };*/
    }
]);