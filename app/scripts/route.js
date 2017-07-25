(function () {
'use strict';
	angular.module('wowProductFinderApp').config(['$httpProvider', '$provide', '$locationProvider', '$compileProvider', '$routeProvider', function ($httpProvider, $provide, $locationProvider, $compileProvider, $routeProvider) {
    $httpProvider.interceptors.push('globalHttpInterceptor');
		$routeProvider
      .when('/', {
        templateUrl: 'views/home.html',
        controller: 'MainCtrl'
      })
      .when('/product-list/:term', {
        templateUrl: 'views/product-list.html',
        controller: 'SearchListinCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);
})();
