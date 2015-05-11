'use strict';

angular.module('mean.company-factors').directive('myPercentage', ['$filter', 
	function($filter){
	return {
		require: 'ngModel',
		link: function(scope, element, attrs, ngModelController) {
			ngModelController.$parsers.push(function(data) {
				//convert data from view format to model format
				return $filter('number')(parseFloat(data)/100);
			});

			ngModelController.$formatters.push(function(data) {
				//convert data from model format to view format
				return $filter('number')(parseFloat(data)*100, 2) + ' %';
			});
		}
	};
}]);