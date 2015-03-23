'use strict';

angular.module('mean.general-tasks').config(['$stateProvider',
  function($stateProvider) {
    // Check if the user is connected
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

   /*$stateProvider.state('goals', {
      url: '/goals',
      templateUrl: 'goals/views/index.html',
      resolve: {
        loggedin: checkLoggedin
      }
    }).state('goals.create',{
      url: '/create',
      templateUrl: 'goals/views/goals/create.html',
      resolve: {
        loggedin: checkLoggedin
      }
    }).state('goals.log', {

<a ui-sref='tasks.units'><img ng-src="inspinia/assets/img/units.jpg" width="200"/></a>
      <a ui-sref='tasks.equipment'><img ng-src="inspinia/assets/img/equipment.jpg" width="200"/></a>
    </div>
    <div class="info col-md-6">
      <a ui-sref='tasks.materials'><img ng-src="inspinia/assets/img/materials.jpg" width="200"/></a>
      <a ui-sref='tasks.list'><img ng-src="in

     */

    $stateProvider
    	.state('task control', {
      	  url: '/tasks',
      	  templateUrl: 'general-tasks/views/index.html',
      	  resolve: {
          loggedin: checkLoggedin
        }
    }).state('tasks units', {
          url: '/units',
          templateUrl: 'general-tasks/views/units.html',
          resolve: {
          loggedin: checkLoggedin
        }
    }).state('tasks materials', {
          url: '/materials',
          templateUrl: 'general-tasks/views/materials.html',
          resolve: {
          loggedin: checkLoggedin
        }
    }).state('tasks equipment', {
          url: '/equipment',
          templateUrl: 'general-tasks/views/equipment.html',
          resolve: {
          loggedin: checkLoggedin
        }
    }).state('tasks list', {
          url: '/list',
          templateUrl: 'general-tasks/views/tasks.html',
          resolve: {
          loggedin: checkLoggedin
        }
    });
  }
]);

/*.config(['ngClipProvider',
    function(ngClipProvider) {
        ngClipProvider.setPath('../mean-admin/assets/lib/zeroclipboard/ZeroClipboard.swf');
    }
]);*/
