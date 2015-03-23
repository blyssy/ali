'use strict';

angular.module('mean.general-tasks').controller('MaterialsController', ['$scope', 'Global', 'Menus', '$rootScope', '$http', 'Materials', 'Units', '$filter', 'ngTableParams',
    function($scope, Global, Menus, $rootScope, $http, Materials, Units, $filter, ngTableParams) {
        $scope.global = Global;
    $scope.hasAuthorization = function(material) {
      if (!material || !material.user) return false;
      return $scope.global.isAdmin || material.user._id === $scope.global.user._id;
    };

        $scope.init = function() {
            Materials.query({}, function(materials) {
                $scope.materials = materials;
            });
        };

        $scope.add = function() {
            if (!$scope.materials) $scope.materials = [];

            var material = new Materials({
                material: $scope.material
            });

            material.$save(function(response) {
                $scope.materials.push(response);
            });

            this.material = '';
            this.doSearch();
        };

        $scope.remove = function(material) {
            console.log('In remove material ' + material);
            for (var i in $scope.materials) {
                if ($scope.materials[i] === material) {
                    $scope.materials.splice(i, 1);
                }
            }

            material.$remove();
        };

        $scope.update = function(material, materialField) {
            material.$update();
            $scope.materialsEditId = -1;
        };

        //$scope.matForm = {};
        //$scope.matForm.unit = " ";
        $scope.unit = {};
        Units.query({}, function(units) {
                $scope.units = units;
        });
        

        var data = Materials.query();
        $scope.materialsEditId = -1;
    
        $scope.tableMaterialsParams = new ngTableParams({
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

        $scope.materialsEditId = -1;

        $scope.setMaterialsEditId =  function(pid) {
            $scope.materialsEditId = pid;
        };

        $scope.doSearch = function () {
            $scope.tableMaterialsParams.reload();
        };
    }
]);