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

        //$scope.formData.builderName = 'test name';
        Users.query({}, function(users) {
            $scope.users = users;
        });
    };

    $scope.onSelect = function(){
        //I want to get the currently selected bid by id from the database
        //$scope.selectedItem._id and fill in the formData based on what
        //is in the database.

        //if the user has a currently selected bid and did not save the
        //changes, those changes will be wiped out.  Might want to send
        //a warning of that case in the future.
        console.log('onSelect has a bid id of ' + $scope.selectedItem._id);

        //get the current bid from the database
        Bids.get({
            bidId: $scope.selectedItem._id
          }, function(bid) {
            $scope.current_bid_name = bid.bid_name;
            $scope.current_bid_status = bid.bid_status;
            $scope.formData.builderName = bid.builder_name;
            $scope.formData.builderDivision = bid.builder_division;
            $scope.formData.builderAddress = bid.builder_address;
            $scope.formData.builderCity = bid.builder_city;
            $scope.formData.builderState = bid.builder_state;
            $scope.formData.builderZip = bid.builder_zip;
            $scope.formData.builderPhone = bid.builder_phone_number;
            $scope.formData.builderEmail = bid.builder_email;
            $scope.formData.projectName = bid.project_name;
            $scope.formData.projectAddress = bid.project_address;
            $scope.formData.projectCity = bid.project_city;
            $scope.formData.projectState = bid.project_state;
            $scope.formData.projectZip = bid.project_zip;
            $scope.formData.purchasingAgent = bid.purchasing_agent_name;
            $scope.formData.purchasingAgentPhone = bid.purchasing_agent_phone_number;
            $scope.formData.purchasingAgentEmail = bid.purchasing_agent_email;
            //$scope.formData. = $scope.selectedItem.project_type; //not yet impled
            $scope.formData.numberOfLots = bid.project_number_of_lots;
            $scope.formData.lotNumbers = bid.project_lot_numbers;
            //$scope.formData. = $scope.selectedItem.project_phases; //need to figure this one out
            $scope.formData.mtcName = bid.mtc_name;
            $scope.formData.mtcDivision = bid.mtc_division;
            $scope.formData.mtcPresidentName = bid.mtc_president_name;
            $scope.formData.mtcPresidentPhone = bid.mtc_president_phone_number;
            $scope.formData.mtcPresidentEmail = bid.mtc_president_email;
            $scope.formData.mtcDivisionManagerName = bid.mtc_division_manager_name;
            $scope.formData.mtcDivisionManagerPhone = bid.mtc_division_manager_phone_number;
            $scope.formData.mtcDivisionManagerEmail = bid.mtc_division_manager_email;
            /*$scope.formData. = $scope.selectedItem.bidding_trades;  //need to figure this one out
            $scope.formData. = $scope.selectedItem.;
            $scope.formData. = $scope.selectedItem.;
            $scope.formData. = $scope.selectedItem.;
            $scope.formData. = $scope.selectedItem.;
            $scope.formData. = $scope.selectedItem.;
            $scope.formData. = $scope.selectedItem.;
            $scope.formData. = $scope.selectedItem.;
            $scope.formData. = $scope.selectedItem.;
            */
        });
    };

    // After process wizard
    $scope.processForm = function() {
        if(!$scope.selectedItem || !$scope.selectedItem._id) {
            alert('No Bid Selected');
            return;
        }

        //onSelect will get a bid from the database and the user will
        //update the wizard.  At this point the bid object should be
        //updated and saved back to the database.

        //var formD = $scope.formData;
        /*var result = (formD.phaseOneCheckbox)?'true':'false';

        if(formD.phaseOneCheckbox) {
            console.log('formD.phaseOneCheckbox is set to true');
        } else {
            console.log('formD.phaseOneCheckbox is set to false');
        }*/
        
        $scope.selectedItem.builder_name = $scope.formData.builderName;
        $scope.selectedItem.builder_division = $scope.formData.builderDivision;
        $scope.selectedItem.builder_address = $scope.formData.builderAddress;
        $scope.selectedItem.builder_city = $scope.formData.builderCity;
        $scope.selectedItem.builder_state = $scope.formData.builderState;
        $scope.selectedItem.builder_zip = $scope.formData.builderZip;
        $scope.selectedItem.builder_phone_number = $scope.formData.builderPhone;
        $scope.selectedItem.builder_email = $scope.formData.builderEmail;
        $scope.selectedItem.project_name = $scope.formData.projectName;
        $scope.selectedItem.project_address = $scope.formData.projectAddress;
        $scope.selectedItem.project_city = $scope.formData.projectCity;
        $scope.selectedItem.project_state = $scope.formData.projectState;
        $scope.selectedItem.project_zip = $scope.formData.projectZip;
        $scope.selectedItem.purchasing_agent_name = $scope.formData.purchasingAgent;
        $scope.selectedItem.purchasing_agent_phone_number = $scope.formData.purchasingAgentPhone;
        $scope.selectedItem.purchasing_agent_email = $scope.formData.purchasingAgentEmail;
        //$scope.formData. = $scope.selectedItem.project_type; //not yet impled
        $scope.selectedItem.project_number_of_lots = $scope.formData.numberOfLots;
        $scope.selectedItem.project_lot_numbers = $scope.formData.lotNumbers;
        //$scope.formData. = $scope.selectedItem.project_phases; //need to figure this one out
        $scope.selectedItem.mtc_name = $scope.formData.mtcName;
        $scope.selectedItem.mtc_division = $scope.formData.mtcDivision;
        $scope.selectedItem.mtc_president_name = $scope.formData.mtcPresidentName;
        $scope.selectedItem.mtc_president_phone_number = $scope.formData.mtcPresidentPhone;
        $scope.selectedItem.mtc_president_email = $scope.formData.mtcPresidentEmail;
        $scope.selectedItem.mtc_division_manager_name = $scope.formData.mtcDivisionManagerName;
        $scope.selectedItem.mtc_division_manager_phone_number = $scope.formData.mtcDivisionManagerPhone;
        $scope.selectedItem.mtc_division_manager_email = $scope.formData.mtcDivisionManagerEmail;
        //$scope.formData. = $scope.selectedItem.bidding_trades;  //need to figure this one out
        if($scope.formData.bidTradeConcrete) {
            $scope.selectedItem.bidding_trades.push({
                trade: 'Concrete',
                name: $scope.formData.concrete.name,
                username: $scope.formData.concrete.username,
                email: $scope.formData.concrete.email,
                phone: $scope.formData.concrete.phone
            });
        }
        if($scope.formData.bidTradePlumbing) {
            $scope.selectedItem.bidding_trades.push({
                trade: 'Plumbing',
                name: $scope.formData.plumbing.name,
                username: $scope.formData.concrete.username,
                email: $scope.formData.plumbing.email,
                phone: $scope.formData.plumbing.phone
            });
        }
        if($scope.formData.bidTradeGrader) {
            $scope.selectedItem.bidding_trades.push({
                trade: 'Grader',
                name: $scope.formData.grader.name,
                username: $scope.formData.concrete.username,
                email: $scope.formData.grader.email,
                phone: $scope.formData.grader.phone
            });
        }
        if($scope.formData.bidTradeFramer) {
            $scope.selectedItem.bidding_trades.push({
                trade: 'Framer',
                name: $scope.formData.framer.name,
                username: $scope.formData.concrete.username,
                email: $scope.formData.framer.email,
                phone: $scope.formData.framer.phone
            });
        }
        if($scope.formData.bidTradeDrywall) {
            $scope.selectedItem.bidding_trades.push({
                trade: 'Drywall',
                name: $scope.formData.drywall.name,
                username: $scope.formData.concrete.username,
                email: $scope.formData.drywall.email,
                phone: $scope.formData.drywall.phone
            });
        }
        if($scope.formData.bidTradeRoofer) {
            $scope.selectedItem.bidding_trades.push({
                trade: 'Roofer',
                name: $scope.formData.roofer.name,
                username: $scope.formData.concrete.username,
                email: $scope.formData.roofer.email,
                phone: $scope.formData.roofer.phone
            });
        }
        if($scope.formData.bidTradeHVAC) {
            $scope.selectedItem.bidding_trades.push({
                trade: 'HVAC',
                name: $scope.formData.hvac.name,
                username: $scope.formData.concrete.username,
                email: $scope.formData.hvac.email,
                phone: $scope.formData.hvac.phone
            });
        }
        if($scope.formData.bidTradeStucco) {
            $scope.selectedItem.bidding_trades.push({
                trade: 'Stucco',
                name: $scope.formData.stucco.name,
                username: $scope.formData.concrete.username,
                email: $scope.formData.stucco.email,
                phone: $scope.formData.stucco.phone
            });
        }
        if($scope.formData.bidTradeElectrician) {
            $scope.selectedItem.bidding_trades.push({
                trade: 'Electrician',
                name: $scope.formData.electrician.name,
                username: $scope.formData.concrete.username,
                email: $scope.formData.electrician.email,
                phone: $scope.formData.electrician.phone
            });
        }
        if($scope.formData.bidTradeUnused) {
            $scope.selectedItem.bidding_trades.push({
                trade: 'Unused',
                name: $scope.formData.unused.name,
                username: $scope.formData.concrete.username,
                email: $scope.formData.unused.email,
                phone: $scope.formData.unused.phone
            });
        }
        if($scope.formData.bidTradeFireSprinkler) {
            $scope.selectedItem.bidding_trades.push({
                trade: 'FireSprinkler',
                name: $scope.formData.fireSprinkler.name,
                username: $scope.formData.concrete.username,
                email: $scope.formData.fireSprinkler.email,
                phone: $scope.formData.fireSprinkler.phone
            });
        }
        if($scope.formData.bidTradeInsulation) {
            $scope.selectedItem.bidding_trades.push({
                trade: 'Insulation',
                name: $scope.formData.insulation.name,
                username: $scope.formData.concrete.username,
                email: $scope.formData.insulation.email,
                phone: $scope.formData.insulation.phone
            });
        }
        if($scope.formData.bidTradePainter) {
            $scope.selectedItem.bidding_trades.push({
                trade: 'Painter',
                name: $scope.formData.painter.name,
                username: $scope.formData.concrete.username,
                email: $scope.formData.painter.email,
                phone: $scope.formData.painter.phone
            });
        }
        if($scope.formData.bidTradeCabinets) {
            $scope.selectedItem.bidding_trades.push({
                trade: 'Cabinets',
                name: $scope.formData.cabinets.name,
                username: $scope.formData.concrete.username,
                email: $scope.formData.cabinets.email,
                phone: $scope.formData.cabinets.phone
            });
        }
        if($scope.formData.bidTradeMasonry) {
            $scope.selectedItem.bidding_trades.push({
                trade: 'Masonry',
                name: $scope.formData.masonry.name,
                username: $scope.formData.concrete.username,
                email: $scope.formData.masonry.email,
                phone: $scope.formData.masonry.phone
            });
        }
        if($scope.formData.bidTradeFinishTrim) {
            $scope.selectedItem.bidding_trades.push({
                trade: 'FinishTrim',
                name: $scope.formData.finishTrim.name,
                username: $scope.formData.concrete.username,
                email: $scope.formData.finishTrim.email,
                phone: $scope.formData.finishTrim.phone
            });
        }
        if($scope.formData.bidTradeTile) {
            $scope.selectedItem.bidding_trades.push({
                trade: 'Tile',
                name: $scope.formData.tile.name,
                username: $scope.formData.concrete.username,
                email: $scope.formData.tile.email,
                phone: $scope.formData.tile.phone
            });
        }
        if($scope.formData.bidTradeFlooring) {
            $scope.selectedItem.bidding_trades.push({
                trade: 'Flooring',
                name: $scope.formData.flooring.name,
                username: $scope.formData.concrete.username,
                email: $scope.formData.flooring.email,
                phone: $scope.formData.flooring.phone
            });
        }
        if($scope.formData.bidTradeFencing) {
            $scope.selectedItem.bidding_trades.push({
                trade: 'Fencing',
                name: $scope.formData.fencing.name,
                username: $scope.formData.concrete.username,
                email: $scope.formData.fencing.email,
                phone: $scope.formData.fencing.phone
            });
        }
        if($scope.formData.bidTradeLandScaping) {
            $scope.selectedItem.bidding_trades.push({
                trade: 'LandScaping',
                name: $scope.formData.landScaping.name,
                username: $scope.formData.concrete.username,
                email: $scope.formData.landScaping.email,
                phone: $scope.formData.landScaping.phone
            });
        }

        $scope.selectedItem.$update();
        //alert('Wizard completed ' + $scope.current_bid_name + ' status is ' + $scope.current_bid_status);
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