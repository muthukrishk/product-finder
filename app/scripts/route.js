(function () {
'use strict';
	angular.module('wowProductFinderApp').config(['$httpProvider', '$provide', '$locationProvider', '$compileProvider', '$routeProvider', function ($httpProvide, $provide, $locationProvider, $compileProvider, $routeProvider) {

		$routeProvider
      .when('/', {
        templateUrl: 'views/home.html'
      })
      .when('/product-list/:id', {
        templateUrl: 'views/product-list.html'
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);
})();
