'use strict';

angular.module('mean.inspinia').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.state('inspinia example page', {
      url: '/inspinia/example',
      templateUrl: 'inspinia/views/index.html'
    });
  }
]);

angular.module('mean.inspinia', ['mean.system'])
.config(['$viewPathProvider', function($viewPathProvider) {
  $viewPathProvider.override('users/views/login.html', 'inspinia/views/login.html');
  $viewPathProvider.override('users/views/index.html', 'inspinia/views/or.html');
  $viewPathProvider.override('users/views/forgot-password.html', 'inspinia/views/forgot-password.html');
  $viewPathProvider.override('users/views/register.html', 'inspinia/views/register.html');
}]);
