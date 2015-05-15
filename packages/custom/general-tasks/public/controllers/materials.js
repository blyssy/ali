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

        $scope.addMaterial = function() {
            if (!$scope.materials) $scope.materials = [];

            var material = new Materials({
                name: $scope.name,
                description: $scope.description,
                unit: $scope.unit._id,
                delivery_offset: $scope.delivery_offset
            });

            material.$save(function(response) {
                $scope.materials.push(response);

                var data = $scope.materials;
                $scope.tableMaterialsParams.total(data.length);
                $scope.tableMaterialsParams.reload();
            });

            this.name = this.description = this.unit = this.delivery_offset = '';
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