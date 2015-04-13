'use strict';
/**
 * wizardCtrl - Controller for wizard functions
 * used in Wizard view
 */
 
/*function wizardCtrl($scope, $rootScope) {
    // All data will be store in this object
    $scope.formData = {};

    // After process wizard
    $scope.processForm = function() {
        alert('Wizard completed');
    };

}*/

angular.module('mean.bids').controller('WizardController', ['$scope', 'Global', 'Bids',
  function($scope, Global, Bids) {
    $scope.global = Global;

    // All data will be store in this object
    $scope.formData = {'test': 'hello'};

    $scope.init = function() {
    	$scope.editId = 1;
    };

    // After process wizard
    $scope.processForm = function() {
        alert('Wizard completed');
    };

    $scope.setEditId =  function(pid) {
       $scope.editId = pid;
    };
  }
]);