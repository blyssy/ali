'use strict';

angular.module('mean.bids').controller('WizardController', ['$scope', 'Global', 'Bids', 'Users', 'toaster', 
  function($scope, Global, Bids, Users, toaster) {
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
        //get the current bid from the database
        Bids.get({
            bidId: $scope.selectedItem._id
          }, function(bid) {
            $scope.formData = {};

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

            for(var i=0; i<bid.bidding_trades.length; i=i+1){
                if(bid.bidding_trades[i].trade === 'Concrete'){
                    $scope.formData.bidTradeConcrete = true;

                    $scope.formData.concrete = {
                        name: bid.bidding_trades[i].name,
                        username: bid.bidding_trades[i].username,
                        trade: 'Concrete',
                        email: bid.bidding_trades[i].email,
                        phone: bid.bidding_trades[i].phone
                    };
                }
                if(bid.bidding_trades[i].trade === 'Plumbing'){
                    $scope.formData.bidTradePlumbing = true;

                    $scope.formData.plumbing = {
                        name: bid.bidding_trades[i].name,
                        username: bid.bidding_trades[i].username,
                        trade: 'Plumbing',
                        email: bid.bidding_trades[i].email,
                        phone: bid.bidding_trades[i].phone
                    };
                }
                if(bid.bidding_trades[i].trade === 'Grader'){
                    $scope.formData.bidTradeGrader = true;

                    $scope.formData.grader = {
                        name: bid.bidding_trades[i].name,
                        username: bid.bidding_trades[i].username,
                        trade: 'Grader',
                        email: bid.bidding_trades[i].email,
                        phone: bid.bidding_trades[i].phone
                    };
                }
                if(bid.bidding_trades[i].trade === 'Framer'){
                    $scope.formData.bidTradeFramer = true;

                    $scope.formData.framer = {
                        name: bid.bidding_trades[i].name,
                        username: bid.bidding_trades[i].username,
                        trade: 'Framer',
                        email: bid.bidding_trades[i].email,
                        phone: bid.bidding_trades[i].phone
                    };
                }
                if(bid.bidding_trades[i].trade === 'Drywall'){
                    $scope.formData.bidTradeDrywall = true;

                    $scope.formData.drywall = {
                        name: bid.bidding_trades[i].name,
                        username: bid.bidding_trades[i].username,
                        trade: 'Drywall',
                        email: bid.bidding_trades[i].email,
                        phone: bid.bidding_trades[i].phone
                    };
                }
                if(bid.bidding_trades[i].trade === 'Roofer'){
                    $scope.formData.bidTradeRoofer = true;

                    $scope.formData.roofer = {
                        name: bid.bidding_trades[i].name,
                        username: bid.bidding_trades[i].username,
                        trade: 'Roofer',
                        email: bid.bidding_trades[i].email,
                        phone: bid.bidding_trades[i].phone
                    };
                }
                if(bid.bidding_trades[i].trade === 'HVAC'){
                    $scope.formData.bidTradeHVAC = true;

                    $scope.formData.hvac = {
                        name: bid.bidding_trades[i].name,
                        username: bid.bidding_trades[i].username,
                        trade: 'HVAC',
                        email: bid.bidding_trades[i].email,
                        phone: bid.bidding_trades[i].phone
                    };
                }
                if(bid.bidding_trades[i].trade === 'Stucco'){
                    $scope.formData.bidTradeStucco = true;

                    $scope.formData.stucco = {
                        name: bid.bidding_trades[i].name,
                        username: bid.bidding_trades[i].username,
                        trade: 'Stucco',
                        email: bid.bidding_trades[i].email,
                        phone: bid.bidding_trades[i].phone
                    };
                }
                if(bid.bidding_trades[i].trade === 'Electrician'){
                    $scope.formData.bidTradeElectrician = true;

                    $scope.formData.electrician = {
                        name: bid.bidding_trades[i].name,
                        username: bid.bidding_trades[i].username,
                        trade: 'Electrician',
                        email: bid.bidding_trades[i].email,
                        phone: bid.bidding_trades[i].phone
                    };
                }
                if(bid.bidding_trades[i].trade === 'Unused'){
                    $scope.formData.bidTradeUnused = true;

                    $scope.formData.unused = {
                        name: bid.bidding_trades[i].name,
                        username: bid.bidding_trades[i].username,
                        trade: 'Unused',
                        email: bid.bidding_trades[i].email,
                        phone: bid.bidding_trades[i].phone
                    };
                }
                if(bid.bidding_trades[i].trade === 'FireSprinkler'){
                    $scope.formData.bidTradeFireSprinkler = true;

                    $scope.formData.fireSprinkler = {
                        name: bid.bidding_trades[i].name,
                        username: bid.bidding_trades[i].username,
                        trade: 'FireSprinkler',
                        email: bid.bidding_trades[i].email,
                        phone: bid.bidding_trades[i].phone
                    };
                }
                if(bid.bidding_trades[i].trade === 'Insulation'){
                    $scope.formData.bidTradeInsulation = true;

                    $scope.formData.insulation = {
                        name: bid.bidding_trades[i].name,
                        username: bid.bidding_trades[i].username,
                        trade: 'Insulation',
                        email: bid.bidding_trades[i].email,
                        phone: bid.bidding_trades[i].phone
                    };
                }
                if(bid.bidding_trades[i].trade === 'Painter'){
                    $scope.formData.bidTradePainter = true;

                    $scope.formData.painter = {
                        name: bid.bidding_trades[i].name,
                        username: bid.bidding_trades[i].username,
                        trade: 'Painter',
                        email: bid.bidding_trades[i].email,
                        phone: bid.bidding_trades[i].phone
                    };
                }
                if(bid.bidding_trades[i].trade === 'Cabinets'){
                    $scope.formData.bidTradeCabinets = true;

                    $scope.formData.cabinets = {
                        name: bid.bidding_trades[i].name,
                        username: bid.bidding_trades[i].username,
                        trade: 'Cabinets',
                        email: bid.bidding_trades[i].email,
                        phone: bid.bidding_trades[i].phone
                    };
                }
                if(bid.bidding_trades[i].trade === 'Masonry'){
                    $scope.formData.bidTradeMasonry = true;

                    $scope.formData.masonry = {
                        name: bid.bidding_trades[i].name,
                        username: bid.bidding_trades[i].username,
                        trade: 'Masonry',
                        email: bid.bidding_trades[i].email,
                        phone: bid.bidding_trades[i].phone
                    };
                }
                if(bid.bidding_trades[i].trade === 'FinishTrim'){
                    $scope.formData.bidTradeFinishTrim = true;

                    $scope.formData.finishTrim = {
                        name: bid.bidding_trades[i].name,
                        username: bid.bidding_trades[i].username,
                        trade: 'FinishTrim',
                        email: bid.bidding_trades[i].email,
                        phone: bid.bidding_trades[i].phone
                    };
                }
                if(bid.bidding_trades[i].trade === 'Tile'){
                    $scope.formData.bidTradeTile = true;

                    $scope.formData.tile = {
                        name: bid.bidding_trades[i].name,
                        username: bid.bidding_trades[i].username,
                        trade: 'Tile',
                        email: bid.bidding_trades[i].email,
                        phone: bid.bidding_trades[i].phone
                    };
                }
                if(bid.bidding_trades[i].trade === 'Flooring'){
                    $scope.formData.bidTradeFlooring = true;

                    $scope.formData.flooring = {
                        name: bid.bidding_trades[i].name,
                        username: bid.bidding_trades[i].username,
                        trade: 'Flooring',
                        email: bid.bidding_trades[i].email,
                        phone: bid.bidding_trades[i].phone
                    };
                }
                if(bid.bidding_trades[i].trade === 'Fencing'){
                    $scope.formData.bidTradeFencing = true;

                    $scope.formData.fencing = {
                        name: bid.bidding_trades[i].name,
                        username: bid.bidding_trades[i].username,
                        trade: 'Fencing',
                        email: bid.bidding_trades[i].email,
                        phone: bid.bidding_trades[i].phone
                    };
                }
                if(bid.bidding_trades[i].trade === 'LandScaping'){
                    $scope.formData.bidTradeLandScaping = true;

                    $scope.formData.landScaping = {
                        name: bid.bidding_trades[i].name,
                        username: bid.bidding_trades[i].username,
                        trade: 'LandScaping',
                        email: bid.bidding_trades[i].email,
                        phone: bid.bidding_trades[i].phone
                    };
                }
            }
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

    $scope.removeIfTradeFound = function(trade) {
        for(var i=0; i<$scope.selectedItem.bidding_trades.length; i=i+1) {
            if($scope.selectedItem.bidding_trades[i].trade === trade)
                $scope.selectedItem.bidding_trades.splice(i, 1);
        }
    };

    // After process wizard
    //need to come up with something better than toaster 
    //for system type messages.
    $scope.processForm = function() {
        if(!$scope.selectedItem || !$scope.selectedItem._id) {
            toaster.pop({
                type: 'error',
                title: 'Bid Selection',
                body: 'Please Select a Bid!',
                timeout: 0,
                fadein: 0,
                position: 'toast-top-full-width',
                showCloseButton: true
            });
            //alert('No Bid Selected');
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
            $scope.removeIfTradeFound('Concrete');

            $scope.selectedItem.bidding_trades.push({
                trade: 'Concrete',
                name: $scope.formData.concrete.name,
                username: $scope.formData.concrete.username,
                email: $scope.formData.concrete.email,
                phone: $scope.formData.concrete.phone
            });
        } else {
            $scope.removeIfTradeFound('Concrete');
        }

        if($scope.formData.bidTradePlumbing) {
            $scope.removeIfTradeFound('Plumbing');

            $scope.selectedItem.bidding_trades.push({
                trade: 'Plumbing',
                name: $scope.formData.plumbing.name,
                username: $scope.formData.plumbing.username,
                email: $scope.formData.plumbing.email,
                phone: $scope.formData.plumbing.phone
            });
        } else {
            $scope.removeIfTradeFound('Plumbing');
        }
        
        if($scope.formData.bidTradeGrader) {
            $scope.removeIfTradeFound('Grader');

            $scope.selectedItem.bidding_trades.push({
                trade: 'Grader',
                name: $scope.formData.grader.name,
                username: $scope.formData.grader.username,
                email: $scope.formData.grader.email,
                phone: $scope.formData.grader.phone
            });
        } else {
            $scope.removeIfTradeFound('Grader');
        }
        
        if($scope.formData.bidTradeFramer) {
            $scope.removeIfTradeFound('Framer');

            $scope.selectedItem.bidding_trades.push({
                trade: 'Framer',
                name: $scope.formData.framer.name,
                username: $scope.formData.framer.username,
                email: $scope.formData.framer.email,
                phone: $scope.formData.framer.phone
            });
        } else {
            $scope.removeIfTradeFound('Framer');
        }
        
        if($scope.formData.bidTradeDrywall) {
            $scope.removeIfTradeFound('Drywall');

            $scope.selectedItem.bidding_trades.push({
                trade: 'Drywall',
                name: $scope.formData.drywall.name,
                username: $scope.formData.drywall.username,
                email: $scope.formData.drywall.email,
                phone: $scope.formData.drywall.phone
            });
        } else {
            $scope.removeIfTradeFound('Drywall');
        }
        
        if($scope.formData.bidTradeRoofer) {
            $scope.removeIfTradeFound('Roofer');

            $scope.selectedItem.bidding_trades.push({
                trade: 'Roofer',
                name: $scope.formData.roofer.name,
                username: $scope.formData.roofer.username,
                email: $scope.formData.roofer.email,
                phone: $scope.formData.roofer.phone
            });
        } else {
            $scope.removeIfTradeFound('Roofer');
        }
        
        if($scope.formData.bidTradeHVAC) {
            $scope.removeIfTradeFound('HVAC');

            $scope.selectedItem.bidding_trades.push({
                trade: 'HVAC',
                name: $scope.formData.hvac.name,
                username: $scope.formData.hvac.username,
                email: $scope.formData.hvac.email,
                phone: $scope.formData.hvac.phone
            });
        } else {
            $scope.removeIfTradeFound('HVAC');
        }
        
        if($scope.formData.bidTradeStucco) {
            $scope.removeIfTradeFound('Stucco');

            $scope.selectedItem.bidding_trades.push({
                trade: 'Stucco',
                name: $scope.formData.stucco.name,
                username: $scope.formData.stucco.username,
                email: $scope.formData.stucco.email,
                phone: $scope.formData.stucco.phone
            });
        } else {
            $scope.removeIfTradeFound('Stucco');
        }
        
        if($scope.formData.bidTradeElectrician) {
            $scope.removeIfTradeFound('Electrician');

            $scope.selectedItem.bidding_trades.push({
                trade: 'Electrician',
                name: $scope.formData.electrician.name,
                username: $scope.formData.electrician.username,
                email: $scope.formData.electrician.email,
                phone: $scope.formData.electrician.phone
            });
        } else {
            $scope.removeIfTradeFound('Electrician');
        }
        
        if($scope.formData.bidTradeUnused) {
            $scope.removeIfTradeFound('Unused');

            $scope.selectedItem.bidding_trades.push({
                trade: 'Unused',
                name: $scope.formData.unused.name,
                username: $scope.formData.unused.username,
                email: $scope.formData.unused.email,
                phone: $scope.formData.unused.phone
            });
        } else {
            $scope.removeIfTradeFound('Unused');
        }
        
        if($scope.formData.bidTradeFireSprinkler) {
            $scope.removeIfTradeFound('FireSprinkler');

            $scope.selectedItem.bidding_trades.push({
                trade: 'FireSprinkler',
                name: $scope.formData.fireSprinkler.name,
                username: $scope.formData.fireSprinkler.username,
                email: $scope.formData.fireSprinkler.email,
                phone: $scope.formData.fireSprinkler.phone
            });
        } else {
            $scope.removeIfTradeFound('FireSprinkler');
        }
        
        if($scope.formData.bidTradeInsulation) {
            $scope.removeIfTradeFound('Insulation');

            $scope.selectedItem.bidding_trades.push({
                trade: 'Insulation',
                name: $scope.formData.insulation.name,
                username: $scope.formData.insulation.username,
                email: $scope.formData.insulation.email,
                phone: $scope.formData.insulation.phone
            });
        } else {
            $scope.removeIfTradeFound('Insulation');
        }
        
        if($scope.formData.bidTradePainter) {
            $scope.removeIfTradeFound('Painter');

            $scope.selectedItem.bidding_trades.push({
                trade: 'Painter',
                name: $scope.formData.painter.name,
                username: $scope.formData.painter.username,
                email: $scope.formData.painter.email,
                phone: $scope.formData.painter.phone
            });
        } else {
            $scope.removeIfTradeFound('Painter');
        }
        
        if($scope.formData.bidTradeCabinets) {
            $scope.removeIfTradeFound('Cabinets');

            $scope.selectedItem.bidding_trades.push({
                trade: 'Cabinets',
                name: $scope.formData.cabinets.name,
                username: $scope.formData.cabinets.username,
                email: $scope.formData.cabinets.email,
                phone: $scope.formData.cabinets.phone
            });
        } else {
            $scope.removeIfTradeFound('Cabinets');
        }
        
        if($scope.formData.bidTradeMasonry) {
            $scope.removeIfTradeFound('Masonry');

            $scope.selectedItem.bidding_trades.push({
                trade: 'Masonry',
                name: $scope.formData.masonry.name,
                username: $scope.formData.masonry.username,
                email: $scope.formData.masonry.email,
                phone: $scope.formData.masonry.phone
            });
        } else {
            $scope.removeIfTradeFound('Masonry');
        }
        
        if($scope.formData.bidTradeFinishTrim) {
            $scope.removeIfTradeFound('FinishTrim');

            $scope.selectedItem.bidding_trades.push({
                trade: 'FinishTrim',
                name: $scope.formData.finishTrim.name,
                username: $scope.formData.finishTrim.username,
                email: $scope.formData.finishTrim.email,
                phone: $scope.formData.finishTrim.phone
            });
        } else {
            $scope.removeIfTradeFound('FinishTrim');
        }
        
        if($scope.formData.bidTradeTile) {
            $scope.removeIfTradeFound('Tile');

            $scope.selectedItem.bidding_trades.push({
                trade: 'Tile',
                name: $scope.formData.tile.name,
                username: $scope.formData.tile.username,
                email: $scope.formData.tile.email,
                phone: $scope.formData.tile.phone
            });
        } else {
            $scope.removeIfTradeFound('Tile');
        }
        
        if($scope.formData.bidTradeFlooring) {
            $scope.removeIfTradeFound('Flooring');

            $scope.selectedItem.bidding_trades.push({
                trade: 'Flooring',
                name: $scope.formData.flooring.name,
                username: $scope.formData.flooring.username,
                email: $scope.formData.flooring.email,
                phone: $scope.formData.flooring.phone
            });
        } else {
            $scope.removeIfTradeFound('Flooring');
        }
        
        if($scope.formData.bidTradeFencing) {
            $scope.removeIfTradeFound('Fencing');

            $scope.selectedItem.bidding_trades.push({
                trade: 'Fencing',
                name: $scope.formData.fencing.name,
                username: $scope.formData.fencing.username,
                email: $scope.formData.fencing.email,
                phone: $scope.formData.fencing.phone
            });
        } else {
            $scope.removeIfTradeFound('Fencing');
        }
        
        if($scope.formData.bidTradeLandScaping) {
            $scope.removeIfTradeFound('LandScaping');

            $scope.selectedItem.bidding_trades.push({
                trade: 'LandScaping',
                name: $scope.formData.landScaping.name,
                username: $scope.formData.landScaping.username,
                email: $scope.formData.landScaping.email,
                phone: $scope.formData.landScaping.phone
            });
        } else {
            $scope.removeIfTradeFound('LandScaping');
        }
        
        //I am thinking here is where we want to pull the task list and subtask
        //list and fill it in and attach to the bid.  Do it one time for now since
        //there is only one task list.  May want to add a check down the road to
        //see if we need to wipe it out and repopulate.

        $scope.selectedItem.$update();
        toaster.pop({
                type: 'success',
                title: 'Bid Update',
                body: 'Current bid ' + $scope.current_bid_name + ' saved.',
                timeout: 5000,
                showDuration: 30,
                position: 'toast-top-full-width',
                showCloseButton: true
            });
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