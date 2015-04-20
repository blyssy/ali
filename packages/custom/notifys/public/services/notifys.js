'use strict';

angular.module('mean.notifys').factory('Notifys', ['$resource',
  function($resource) {
    return $resource('/notifys/:notifyId', {
      notifyId: '@_id'
    }, {
    	update: {
    		method: 'PUT'
    	}
    });
  }
]);

angular.module('mean.notifys').service('NotifyService', ['$rootScope', '$http', 
  function($rootScope, $http) {
	//var notify = {};

	/*Notifys.addNotification = function(receiver, type, title, message, sticky) {
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
	var notify;

	this.addNotification = function(receiver, type, title, message, sticky) {
		// notify = [{
		// 	receiver: receiver,
  //       	type: type,
  //   		tite: title,
  //   		message: message,
  //   		sticky: sticky
		// }];

		// alert(receiver);
		var request = $http({
                    method: 'post',
                    url: '/notifys',
                    //transformRequest: transformRequestAsFormPost,
                    data: {
                        receiver: receiver,
			        	type: type,
			    		title: title,
			    		message: message,
			    		sticky: sticky
                    }
                });

		request.success( function(html) {
			$rootScope.$emit('notificationAdded');
		});
		//this.$save(notify);
	};

	return notify;
  }
]);
