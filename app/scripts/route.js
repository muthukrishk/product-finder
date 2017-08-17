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
      .when('/product-list-filter/:term/:aisleNumber', {
        templateUrl: 'views/product-list-filter.html',
        controller: 'SearchListinFilterCtrl'
      })
       .when('/product-category-filter/:term/:category', {
        templateUrl: 'views/product-list-filter.html',
        controller: 'SearchListinFilterCtrl'
      })

      .otherwise({
        redirectTo: '/'
      });
  }]);
})();
