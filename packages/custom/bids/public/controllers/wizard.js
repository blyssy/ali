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
    	$scope.editId = 1;

        Bids.query({}, function(bids) {
            $scope.bids = bids;
        });

        $scope.formData.builderName = 'test name';
        Users.query({}, function(users) {
            $scope.users = users;
        });
    };

    $scope.onSelect = function(){
        console.log('in onSelect with item ' + $scope.selectedItem);
        $scope.current_bid_name = $scope.selectedItem.name;
        $scope.current_bid_status = $scope.selectedItem.status;
        $scope.formData.builderName = $scope.selectedItem.builderName;
        $scope.formData.builderAddress = $scope.selectedItem.builderAddress;
    };

    // After process wizard
    $scope.processForm = function() {
        var formD = $scope.formData;
        var result = (formD.phaseOneCheckbox)?'true':'false';

        if(formD.phaseOneCheckbox) {
            console.log('formD.phaseOneCheckbox is set to true');
        } else {
            console.log('formD.phaseOneCheckbox is set to false');
        }

        alert('Wizard completed ' + formD.builderName + ' result is ' + result);
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
        this.concrete = '';
    };

    $scope.setPlumbing = function(obj) {
        $scope.formData.plumbing = obj;
        this.plumbing = '';
    };

    $scope.setGrader = function(obj) {
        $scope.formData.grader = obj;
        this.grader = '';
    };
    
    $scope.setFramer = function(obj) {
        $scope.formData.framer = obj;
        this.framer = '';
    };

    $scope.setDrywall = function(obj) {
        $scope.formData.drywall = obj;
        this.drywall = '';
    };

    $scope.setRoofer = function(obj) {
        $scope.formData.roofer = obj;
        this.roofer = '';
    };

    $scope.setHVAC = function(obj) {
        $scope.formData.havc = obj;
        this.havc = '';
    };

    $scope.setStucco = function(obj) {
        $scope.formData.stucco = obj;
        this.stucco = '';
    };
    
    $scope.setElectrician = function(obj) {
        $scope.formData.electrician = obj;
        this.electrician = '';
    };

    $scope.setUnused = function(obj) {
        $scope.formData.unused = obj;
        this.unused = '';
    };

    $scope.setFireSprinkler = function(obj) {
        $scope.formData.fireSprinkler = obj;
        this.fireSprinkler = '';
    };

    $scope.setInsulation = function(obj) {
        $scope.formData.insulation = obj;
        this.insulation = '';
    };

    $scope.setPainter = function(obj) {
        $scope.formData.painter = obj;
        this.painter = '';
    };

    $scope.setCabinets = function(obj) {
        $scope.formData.cabinets = obj;
        this.cabinets = '';
    };
    
    $scope.setMasonry = function(obj) {
        $scope.formData.masonry = obj;
        this.masonry = '';
    };

    $scope.setFinishTrim = function(obj) {
        $scope.formData.finishTrim = obj;
        this.finishTrim = '';
    };

    $scope.setTile = function(obj) {
        $scope.formData.tile = obj;
        this.tile = '';
    };

    $scope.setFlooring = function(obj) {
        $scope.formData.flooring = obj;
        this.flooring = '';
    };

    $scope.setFencing = function(obj) {
        $scope.formData.fencing = obj;
        this.fencing = '';
    };

    $scope.setLandScaping = function(obj) {
        $scope.formData.landScaping = obj;
        this.landScaping = '';
    };
  }
]);