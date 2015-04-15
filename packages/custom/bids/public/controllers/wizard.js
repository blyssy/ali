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

angular.module('mean.bids').controller('WizardController', ['$scope', 'Global', 'Bids', 'Users', 
  function($scope, Global, Bids, Users) {
    $scope.global = Global;

    // All data will be store in this object
    $scope.formData = {};

    $scope.init = function() {
        console.log('In the bids init function');
    	$scope.editId = 1;

        Users.query({}, function(users) {
            $scope.users = users;
        });
    };

    // After process wizard
    $scope.processForm = function() {
        var formD = $scope.formData;
        alert('Wizard completed' + formD);
    };

    $scope.setEditId =  function(pid) {
       $scope.editId = pid;
    };

    $scope.states = [
        'Alabama',
        'Alaska',
        'Arizona',
        'Arkansas',
        'California',
        'Colorado',
        'Connecticut',
        'Delaware',
        'Florida',
        'Georgia',
        'Hawaii',
        'Idaho',
        'Illinois',
        'Indiana',
        'Iowa',
        'Kansas',
        'Kentucky',
        'Louisiana',
        'Maine',
        'Maryland',
        'Massachusetts',
        'Michigan',
        'Minnesota',
        'Mississippi',
        'Missouri',
        'Montana',
        'Nebraska',
        'Nevada',
        'New Hampshire',
        'New Jersey',
        'New Mexico',
        'New York',
        'North Carolina',
        'North Dakota',
        'Ohio',
        'Oklahoma',
        'Oregon',
        'Pennsylvania',
        'Rhode Island',
        'South Carolina',
        'South Dakota',
        'Tennessee',
        'Texas',
        'Utah',
        'Vermont',
        'Virginia',
        'Washington',
        'West Virginia',
        'Wisconsin',
        'Wyoming'
    ];

    $scope.setConcrete = function(obj) {
        $scope.formData.concrete = obj;
    };

    $scope.setPlumbing = function(obj) {
        $scope.formData.plumbing = obj;
    };

    $scope.setGrader = function(obj) {
        $scope.formData.grader = obj;
    };
    
    $scope.setFramer = function(obj) {
        $scope.formData.framer = obj;
    };

    $scope.setDrywall = function(obj) {
        $scope.formData.drywall = obj;
    };

    $scope.setRoofer = function(obj) {
        $scope.formData.roofer = obj;
    };

    $scope.setHVAC = function(obj) {
        $scope.formData.havc = obj;
    };

    $scope.setStucco = function(obj) {
        $scope.formData.stucco = obj;
    };
    
    $scope.setElectrician = function(obj) {
        $scope.formData.electrician = obj;
    };

    $scope.setUnused = function(obj) {
        $scope.formData.unused = obj;
    };

    $scope.setFireSprinkler = function(obj) {
        $scope.formData.fireSprinkler = obj;
    };

    $scope.setInsulation = function(obj) {
        $scope.formData.insulation = obj;
    };

    $scope.setPainter = function(obj) {
        $scope.formData.painter = obj;
    };

    $scope.setCabinets = function(obj) {
        $scope.formData.cabinets = obj;
    };
    
    $scope.setMasonry = function(obj) {
        $scope.formData.masonry = obj;
    };

    $scope.setFinishTrim = function(obj) {
        $scope.formData.finishTrim = obj;
    };

    $scope.setTile = function(obj) {
        $scope.formData.tile = obj;
    };

    $scope.setFlooring = function(obj) {
        $scope.formData.flooring = obj;
    };

    $scope.setFencing = function(obj) {
        $scope.formData.fencing = obj;
    };

    $scope.setLandScaping = function(obj) {
        $scope.formData.landScaping = obj;
    };
  }
]);