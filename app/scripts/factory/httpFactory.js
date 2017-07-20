(function () {
'use strict';
  angular.module('wowProductFinderApp').factory('globalHttpInterceptor',['$q', '$location', '$rootScope', '$window', 'httpBufferService', function ($q, $location, $rootScope, $window, httpBufferService){
    var interceptor = {

      request: function (config){
        config.headers['X-Api-Key'] = api_key;
        return $q.when(config);
      },
      response: function (response){
        if (response.status === 401) {
          //$window.location.href = $rootScope.signInUrl;
        }
        return response || $q.when(response);
      },
      responseError: function (rejection) {
        console.log(rejection);
        switch (rejection.status) {
          case 401:
          console.log(rejection);
          break;
          case 400:
            console.log("sds");

          break;
          case 404:

          break;
          case 403:

          break;
          case 0:
            $location.path('/');
          break;
          default:
        }
        return $q.reject(rejection);
      }
    };
    return interceptor;
  }]);

  angular.module('wowProductFinderApp').service('HttpService', ['$http', '$rootScope', '$q', function($http, $rootScope, $q) {
    this.process = function(url, method, params, data, header, form_data, timeout) {
      if (!header) {
        header = {};
      }
      if (form_data) {
        header['Content-Type'] = 'application/json';
        data = $.param(data);
      }
      var http_options = {};
      if (url !== null && url !== undefined) {
        http_options.url = url;
      }
      if (method !== null && method !== undefined) {
        http_options.method = method;
      }
      if (params !== null && params !== undefined) {
        http_options.params = params;
      }
      if (data !== null && data !== undefined) {
        http_options.data = data;
      }
      if (header !== null && header !== undefined && Object.keys(header).length > 0) {
        http_options.headers = header;
      }
      if (timeout !== null && timeout !== undefined) {
        http_options.timeout = timeout;
      }
      console.log(http_options);
      return $http(http_options).then(function(response) {
        return $q.when(response.data, response);
      }, function(responseError) {
        return $q.reject(responseError);
      });
    };

  }]);

  angular.module('wowProductFinderApp').factory('httpBufferService', ['$injector', '$q', function ($injector, $q) {

  //Requests buffer
  var buffer = [];

  //HTTP service, initialized later due to circular dependency
  var $http;

  /**
   * Helper to retry a http request
   */
  function retryHttpRequest(config, deferred) {

    //Get the http service now
    $http = $http || $injector.get('$http');

    //Retry the request
    $http(config).then(function(response) {
      deferred.resolve(response);
    }, function(reason) {
      deferred.reject(reason);
    });
  }

  /**
   * Service class
   */
  return {

    /**
     * Store a new request in the buffer
     */
    store: function(config) {
      var deferred = $q.defer();
      buffer.push({
        config: config,
        deferred: deferred
      });
      return deferred.promise;
    },

    /**
     * Clear the buffer (without rejecting requests)
     */
    clear: function() {
      buffer = [];
    },

    /**
     * Reject all the buffered requests
     */
    rejectAll: function(reason) {

      //Loop all buffered requests and reject them
      for (var i = 0; i < buffer.length; i++) {
        buffer[i].deferred.reject(reason);
      }

      //Clear the buffer
      this.clear();
    },

    /**
     * Retry all buffered requests
     */
    retryAll: function(configUpdater) {

      //Loop all buffered requests
      for (var i = 0; i < buffer.length; i++) {

        //Config updater provided? Use it
        if (configUpdater && angular.isFunction(configUpdater)) {
          buffer[i].config = configUpdater(buffer[i].config);
        }

        //Retry the request
        retryHttpRequest(buffer[i].config, buffer[i].deferred);
      }

      //Clear the buffer
      this.clear();
    }
  };
  }]);
})();
