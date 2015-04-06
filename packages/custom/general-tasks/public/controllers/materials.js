'use strict';

angular.module('mean.general-tasks').controller('MaterialsController', ['$scope', 'Global', 'Menus', '$rootScope', '$http', 'Materials', 'Units', '$filter', 'ngTableParams',
    function($scope, Global, Menus, $rootScope, $http, Materials, Units, $filter, NGTableParams) {
        $scope.global = Global;
    $scope.hasAuthorization = function(material) {
      if (!material || !material.user) return false;
      return $scope.global.isAdmin || material.user._id === $scope.global.user._id;
    };

        $scope.init = function() {
            Materials.query({}, function(materials) {

                $scope.materials = materials;
                $scope.units = Units.query();

                var data = materials;
            
                $scope.tableMaterialsParams = new NGTableParams({
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
            if (!$scope.materials) $scope.materials = [];

            var material = new Materials({
                name: $scope.name,
                unit: $scope.unit,
                delivery_offset: $scope.delivery_offset
            });

            material.$save(function(response) {
                $scope.materials.push(response);

                console.log('added ' + response);

                var data = $scope.materials;
                $scope.tableMaterialsParams.total(data.length);
                $scope.tableMaterialsParams.reload();
            });

            this.name = this.unit = this.delivery_offset = '';
        };

        $scope.remove = function(material) {
            for (var i in $scope.materials) {
                if ($scope.materials[i] === material) {
                    $scope.materials.splice(i, 1);
                }
            }

            material.$remove();
            var data = $scope.materials;
            $scope.tableMaterialsParams.total(data.length);
            $scope.tableMaterialsParams.reload();
        };

        $scope.update = function(material, materialField) {
            console.log('in the update function');
            material.$update();
            $scope.materialsEditId = -1;
        };

        $scope.setMaterialsEditId =  function(pid) {
            $scope.materialsEditId = pid;
        };
    }
]);