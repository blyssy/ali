'use strict';

angular.module('mean.general-tasks').factory('GeneralTasks', ['$resource',
  function($resource) {
    return $resource('/general-tasks/:taskId', {
      taskId: '@_id'
    }, {
    	update: {
    		method: 'PUT'
    	}
    });
  }
]);

angular.module('mean.general-tasks').factory('DeleteMaterial', ['$resource',
  function($resource) {
    return $resource('/general-tasks/:taskId/:index', {
      taskId: '@_id',
      index: '@index'
      }, {
      deleteMaterial: {
        method: 'DELETE'
      }
    });
  }
]);

/*angular.module('mean.general-tasks').factory('GeneralTasks', ['$resource',
  function($resource) {
    return {
      query: $resource('/general-tasks/', {}, {
        query: {
          method: 'GET',
          isArray: true
        }
      }),
      update: $resource('/general-tasks/:taskId', {
        taskId: '@_id'
      }, {
        update: {
          method: 'PUT'
        } 
      }),
      material_delete: $resource('/general-tasks/:taskId/:index', {
        taskId: '@_id',
        index: '@index'
      }, {
        deleteMaterial: {
          method: 'DELETE'
        }
      })
    };
  }]);*/
/*.factory('utils', function() {
  var utils = {
    indexOf: function(arr, obj) {
      var index = -1; // not found initially
      var keys = Object.keys(obj);
      // filter the collection with the given criterias
      arr.filter(function(doc, idx) {
        // keep a counter of matched key/value pairs
        var matched = 0;

        // loop over criteria
        for (var i = keys.length - 1; i >= 0; i--) {
          if (doc[keys[i]] === obj[keys[i]]) {
            matched++;

            // check if all the criterias are matched
            if (matched === keys.length) {
              index = idx;
              return idx;
            }
          }
        }
      });
      return index;
    },

    findAndModify: function(arr, obj) {
      var index = utils.indexOf(arr, obj);
      if (~index) arr[index] = obj;
      else arr.push(obj);
      return arr;
    },
    checkDUplicates: function(arr, obj) {
      for (var i = 0; i < arr.length; i++) {
        if (arr[i]._id === obj._id) {
          return true;
        }
      }
      return false;
    },

    findAndModifyById: function(arr, obj) {
      var index = utils.indexOf(arr, {
        ID: obj.ID
      });
      if (~index) arr[index] = obj;
      else arr.unshift(obj);
      return arr;
    },

    findAndRemove: function(arr, obj) {
      var index = utils.indexOf(arr, obj);
      if (~index) arr.splice(index, 1);
      return arr;
    },

    findAndRemoveById: function(arr, obj) {
      var index = utils.indexOf(arr, {
        _id: obj._id
      });

      if (~index) arr.splice(index, 1);
      return arr;
    },

    unique: function(arr, key) {
      var unique = {};
      var distinct = [];
      arr.forEach(function(obj) {
        if (!unique[obj[key]]) {
          distinct.push(obj);
          unique[obj[key]] = true;
        }
      });
      return distinct;
    },
  };

  return utils;
});*/

