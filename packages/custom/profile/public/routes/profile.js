'use strict';

angular.module('mean.profile').config(['$stateProvider',
  function($stateProvider) {
    var checkLoggedin = function($q, $timeout, $http, $location) {
      // Initialize a new promise
      var deferred = $q.defer();

      // Make an AJAX call to check if the user is logged in
      $http.get('/loggedin').success(function(user) {
        // Authenticated
        if (user !== '0') $timeout(deferred.resolve);

        // Not Authenticated
        else {
          $timeout(deferred.reject);
          $location.url('/login');
        }
      });

      return deferred.promise;
    };
    
    $stateProvider.state('profile', {
      url: '/profile',
      templateUrl: 'profile/views/index.html',
      resolve: {
        loggedin: checkLoggedin
      }
    }).state('password reset',{
      url: '/profile/reset-password',
      templateUrl: 'profile/views/reset-password.html',
      resolve: {
        loggedin: checkLoggedin
      }
    });
  }
]);
