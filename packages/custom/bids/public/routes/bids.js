'use strict';

angular.module('mean.bids').config(['$stateProvider',  
  function($stateProvider) {
  	// Check if the user is connected
    /* jshint ignore:start */
    /*var checkLoggedin = function($q, $timeout, $http, $location) {
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
    };*/
    /* jshint ignore:end */


    $stateProvider
      .state('bids', {
        url: '/bids',
        templateUrl: 'bids/views/bids.html'
    }).state('bid wizard', {
            url: '/wizard',
            templateUrl: '/bids/views/wizard.html'
        })
        .state('bid wizard step one', {
            url: '/step_one',
            templateUrl: '/bids/views/wizard/step_one.html'
        })
        .state('bid wizard step two', {
            url: '/step_two',
            templateUrl: '/bids/views/wizard/step_two.html'
        })
        .state('bid wizard step three', {
            url: '/step_three',
            templateUrl: '/bids/views/wizard/step_three.html'
        });

        //$urlRouteProvider.otherwise('/wizard/step_one');
  }
]);
