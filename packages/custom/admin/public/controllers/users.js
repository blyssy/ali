'use strict';

angular.module('mean.admin').controller('UsersController', ['$scope', 'Global', 'Menus', '$rootScope', '$http', 'Users',
    function($scope, Global, Menus, $rootScope, $http, Users) {
        $scope.global = Global;
        $scope.userSchema = [{
            title: 'Email',
            schemaKey: 'email',
            type: 'text',
            inTable: true
        }, {
            title: 'Name',
            schemaKey: 'name',
            type: 'text',
            inTable: true
        }, {
            title: 'Employee ID',
            schemaKey: 'username',
            type: 'text',
            inTable: true
        }, {
            title: 'Roles',
            schemaKey: 'roles',
            type: 'select',
            options: ['authenticated', 'foreman', 'tm', 'mtc', 'admin'],
            inTable: true
        }, {
            title: 'Password',
            schemaKey: 'password',
            type: 'password',
            inTable: false
        }, {
            title: 'Trade',
            schemaKey: 'trade',
            type: 'select',
            options: ['Concrete', 'Plumbing', 'Grader', 'Framer', 'Drywall', 'Roofer', 'HVAC', 'Stucco', 
              'Electrician', 'Unused', 'Fire Sprinkler', 'Insulation', 'Painter', 'Cabinets', 'Masonry',
              'Finish Trim', 'Tile', 'Flooring', 'Fencing', 'Landscaping'],
            inTable: true
        }, {
            title: 'Phone',
            schemaKey: 'phone',
            type: 'text',
            inTable: true
        }];

        $scope.user = {};

        $scope.init = function() {
            Users.query({}, function(users) {
                $scope.users = users;
            });
        };

        $scope.add = function() {
            if (!$scope.users) $scope.users = [];

            console.log('adding user %s with role %s and trade %s', $scope.user.name, $scope.user.roles, $scope.user.trade);

            var user = new Users({
                email: $scope.user.email,
                name: $scope.user.name,
                username: $scope.user.username,
                password: $scope.user.password,
                confirmPassword: $scope.user.password,
                roles: $scope.user.roles,
                trade: $scope.user.trade,
                phone: $scope.user.phone
            });

            user.$save(function(response) {
                $scope.users.push(response);
            });

            //user.firstName = user.lastName = user.email = user.password = user.role = '';

            this.firstName = this.lastName = this.email = this.password = this.role = this.trade = '';
        };

        $scope.remove = function(user) {
            for (var i in $scope.users) {
                if ($scope.users[i] === user) {
                    $scope.users.splice(i, 1);
                }
            }

            user.$remove();
        };

        $scope.update = function(user, userField) {
            console.log('we are now in the update function!!!!!!!!!!!!');
            if (userField && userField === 'roles' && user.roles.indexOf('admin') === -1) {
                if (confirm('Are you sure you want to remove "admin" role?')) {
                    user.$update();
                } else {
                    user.roles = user.tmpRoles;
                }
            } else
                user.$update();
        };

        $scope.beforeSelect = function(userField, user) {
            if (userField === 'roles') {
                user.tmpRoles = user.roles;
            }
        };
    }
]);