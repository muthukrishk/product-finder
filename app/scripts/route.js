(function () {
'use strict';
	angular.module('wowProductFinderApp').config(['$httpProvider', '$provide', '$locationProvider', '$compileProvider', '$routeProvider', function ($httpProvide, $provide, $locationProvider, $compileProvider, $routeProvider) {

		$routeProvider
      .when('/', {
        templateUrl: 'views/home.html'
      })
      .when('/home', {
        templateUrl: 'views/home.html'
      })
			.when('/productList', {
        templateUrl: 'views/product-list.html'
      })
			.when('/productDetail', {
        templateUrl: 'views/product-detail.html'
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);
})();
