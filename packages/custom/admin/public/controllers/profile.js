'use strict';

angular.module('mean.admin').controller('ProfileController', ['$scope', 'Global', 'Menus', '$rootScope', '$http', 'Users',
    function($scope, Global, Menus, $rootScope, $http, Users) {
    $scope.global = Global;
    $scope.package = {
      name: 'admin'
    };
    $scope.profile = {};

    /*$scope.init = function() {
    	Users.get({
    		userId: $scope.global.user._id
    	}, function(user) {
    		$scope.profile.name = user.name;
    		$scope.profile.username = user.username;

    		$scope.global.profile = $scope.profile;
    	});
    }; */

}]);