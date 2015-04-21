'use strict';

/* jshint -W098 */
angular.module('mean.profile').controller('ProfileController', ['$scope', '$rootScope', 'Global', 'Profile', 'Admin',
  function($scope, $rootScope, Global, Profile, Admin) {
    $scope.global = Global;

    $scope.profile = {};

    $scope.init = function() {
    	Admin.get({
    		userId: $scope.global.user._id
    	}, function(user) {
    		$scope.profile.name = user.name;
    		$scope.profile.username = user.username;

    		$scope.global.profile = $scope.profile;
    	});
    }; 

    // $scope.update = function(item) {
    // 	var user = 
    // }

    $scope.package = {
      name: 'profile'
    };
  }
]);
