'use strict';

angular.module('mean.admin').config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('users', {
                url: '/admin/users',
                templateUrl: 'admin/views/users.html'
            })
            .state('admin', {
                url: '/admin/profile',
                templateUrl: 'admin/views/index.html'
            });
    }
]).config(['ngClipProvider',
    function(ngClipProvider) {
        ngClipProvider.setPath('../admin/assets/lib/zeroclipboard/ZeroClipboard.swf');
    }
]);