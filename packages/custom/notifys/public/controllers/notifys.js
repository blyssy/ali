'use strict';

/* jshint -W098 */
angular.module('mean.notifys').controller('NotifyController', ['$scope', '$rootScope', 'Global', 'Notifys', '$http', 'toaster', 'Users',
  function($scope, $rootScope, Global, Notifys, $http, toaster, Users) {
    $scope.global = Global;
    $scope.package = {
      name: 'notifys'
    };

	//Initial Holding Object for our Notifications - set as empty
	$scope.notifications = {};

	/*$scope.addNotification = function(receiver, type, title, message, sticky){
		//var temp = $scope.notifications.length;
		//temp = temp+1;
		var notify = new Notifys({
			receiver: receiver,
        	type: type,
    		tite: title,
    		message: message,
    		sticky: sticky
		});

		notify.$save();
		$scope.notifications.push(notify);
		$scope.displayNotification();
	};*/

	//Load Notifications for this current user from the View using the Domino REST API
	//For the demo we will use a local sample.json file which mimics the Domino JSON Data
	$scope.loadNotifications = function() {
		Notifys.query({ receiver: $scope.global.user.username }, function(notifys){
			//$scope.notifications = notifys;

			console.log('in loadNotifications');
			for(var i=0; i<notifys.length; i=i+1) {
				$scope.displayNotification(notifys[i]);
				console.log('showing notification # ' + i + ' with receiver ' + notifys[i].receiver);
			}
			//$scope.displayNotifications();
		});

		//$scope.displayNotifications();
	};

	/*$rootScope.testClick = function(id) {
		//console.log('in the rootScope test function' + id);
		//console.log($scope);
		//var i = 0;
        var selectedToaster={};
        //for (i; i < $scope.notifications.length; i=i+1) {
        //    if ($scope.notifications[i].id === id){
        selectedToaster = $scope.notifications[id.id];
        //        break;
        //    }
        //}
        $scope.notifications.splice(id.id, 1);
        $rootScope.$broadcast('toaster-Removed',{'notify':selectedToaster});
	}; */

	//This code watches the notifications object - if it changes then it calls another function
	//This helps to decouple your loading data logic.
	/*$scope.$watch('notifications', function(newVal, oldVal) {
		if(newVal === undefined) return;
		console.log('in the notify watch function');
		if (oldVal === newVal) return;

		console.log('old val and new val are different');
		//We have notifications - loop through them and show them
		$scope.displayNotifications();
	});*/

	/*$scope.$watch('notifications.length', function(newVal, oldVal) {
		if(newVal === undefined) return;
		console.log('in the notify watch function');
		if (oldVal === newVal) return;

		if (newVal < oldVal) return;

		console.log('old val and new val are different');
		//We have notifications - loop through them and show them
		$scope.displayNotification();
	});*/

	$scope.$on('notificationAdded', function(event, toasterObj) {
		console.log('in the notificationAdded function');
		//$scope.handleNotificationClick(toasterObj.notify);
		$scope.loadNotifications();
	});

	$scope.displayNotifications = function() {
		//toaster.clear();
		/*angular.forEach($scope.notifications, function(value, key) {
		  
			var sticky;

			if (value.sticky === 'No') {
				sticky = 3000;
			} else {
				sticky = 0;
			}

			toaster.pop(value.type, value.title, value.message, sticky, 'trustedHtml', '');
		});*/
		for(var i=0; i<$scope.notifications.length; i=i+1) {
			var sticky;

			if ($scope.notifications[i].sticky === 'No') {
				sticky = 5000;
			} else {
				sticky = 0;
			}

			//this will display the notification
			toaster.pop(
				$scope.notifications[i].type, 
				$scope.notifications[i].title, 
				$scope.notifications[i].message, 
				sticky, 
				'trustedHtml', 
				'');

			console.log('calling remove on notification from displayNotifications ' + $scope.notifications[i].receiver);
			$scope.notifications[i].$remove();
			$scope.notifications.splice(i, 1);
		}
	};

	$scope.displayNotification = function(item) {
		//toaster.clear();
		if(!item) return;

		//if($scope.global.user.username !== )

		//var notification = $scope.notifications[$scope.notifications.length - 1];

		if($scope.global.user.username !== item.receiver) return;
		//angular.forEach($scope.notifications, function(value, key) {
		  
		var sticky;

		if (item.sticky === 'No') {
			sticky = 5000;
		} else {
			sticky = 0;
		}

		toaster.pop(item.type, item.title, item.message, sticky, 'trustedHtml', '');

		console.log('calling remove on notification from displayNotification ' + item.receiver);
		item.$remove();
		//});
	};
	//For the demo we will hold a list of clicked toasts so we can display the result
	//$scope.demoClickedToasts = [];

	/*$scope.handleNotificationClick = function(toasterObj) {
		//remove clicked notification


		//toasterObj.$remove();
		//toaster.clear();
	};*/
  }
]);
