'use strict';

angular.module('mean.general-tasks').directive('myCurrency', ['$filter',
	function($filter){
	return {
		require: 'ngModel',
		link: function(elem, $scope, attrs, ngModel){
            ngModel.$formatters.push(function(val){
                return '$ ' + $filter('number')(val, 2);
            });
            ngModel.$parsers.push(function(val){
                return val.replace(/^\$/, '');
            });
        }
	};
}]);