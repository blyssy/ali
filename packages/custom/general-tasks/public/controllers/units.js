'use strict';

angular.module('mean.general-tasks').controller('UnitsController', ['$scope', 'Global', 'Menus', '$rootScope', '$http', 'Units', '$filter', 'ngTableParams',
    function($scope, Global, Menus, $rootScope, $http, Units, $filter, ngTableParams) {
        $scope.global = Global;
    $scope.hasAuthorization = function(unit) {
      if (!unit || !unit.user) return false;
      return $scope.global.isAdmin || unit.user._id === $scope.global.user._id;
    };

        $scope.init = function() {
            Units.query({}, function(units) {
                $scope.units = units;

                var data = units;
            
                $scope.tableUnitsParams = new ngTableParams({
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
            if (!$scope.units) $scope.units = [];

            var unit = new Units({
                unit: $scope.unit
            });

            unit.$save(function(response) {
                $scope.units.push(response);
            });

            this.unit = '';
            this.doSearch();
        };

        $scope.remove = function(unit) {
            console.log('In remove unit ' + unit);
            for (var i in $scope.units) {
                if ($scope.units[i] === unit) {
                    $scope.units.splice(i, 1);
                }
            }

            unit.$remove();
        };

        $scope.update = function(unit, unitField) {
            unit.$update();
            $scope.unitsEditId = -1;
        };

        $scope.setUnitsEditId =  function(pid) {
            $scope.unitsEditId = pid;
        };

        $scope.doSearch = function () {
            $scope.tableUnitsParams.reload();
        };
    }
]);