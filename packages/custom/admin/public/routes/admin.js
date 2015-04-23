'use strict';

angular.module('mean.admin').config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
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

        $stateProvider
            .state('users', {
                url: '/admin/users',
                templateUrl: 'admin/views/users.html',
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .state('admin', {
                url: '/admin/profile',
                templateUrl: 'admin/views/index.html',
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .state('profile', {
                url: '/profile',
                templateUrl: 'admin/views/profile.html',
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .state('password reset',{
                url: '/profile/reset-password',
                templateUrl: 'admin/views/reset-password.html',
                resolve: {
                    loggedin: checkLoggedin
                }
            });
    }
]).config(['ngClipProvider',
    function(ngClipProvider) {
        ngClipProvider.setPath('../admin/assets/lib/zeroclipboard/ZeroClipboard.swf');
    }
]);