'use strict';

/* jshint -W098 */
angular.module('mean.company-factors').controller('CompanyFactorsController', ['$scope', 'Global', 'CompanyFactors',
  function($scope, Global, CompanyFactors) {
    $scope.global = Global;
    $scope.package = {
      name: 'company-factors'
    };

    $scope.update = function() {
    	if($scope.selectedItem.trade_code !== '10')
    	  $scope.selectedItem.$update();
    	else {
    		$scope.selectedItem.taxes = 
    		$scope.selectedItem.w_comp_high =
    		$scope.selectedItem.w_comp_low =
    		$scope.selectedItem.general_liability = 
    		$scope.selectedItem.auto = 
    		$scope.selectedItem.sales_tax = 
    		$scope.selectedItem.material =
    		$scope.selectedItem.equipment = 
    		$scope.selectedItem.benefits =
    		$scope.selectedItem.labor_increase =
    		$scope.selectedItem.general_contractor =
    		$scope.selectedItem.training_education = '0';
    		alert('Cannot save data to Unused');
    	}
    };

    $scope.init = function() {
        CompanyFactors.query({}, function(company_info) {
        	$scope.company_info = company_info;
        });	
    };
  }
]);
