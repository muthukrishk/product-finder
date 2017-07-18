'use strict';

/**
 * @ngdoc function
 * @name wowProductFinderApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the wowProductFinderApp
 */
angular.module('wowProductFinderApp')
  .controller('MainCtrl', function ($scope) {
    $scope.selectedProduct = [

    ];

    $scope.loadProducts = function() {
    	$scope.products = [
    	{
    		name: "Butter"
    	},
    	{
    		name: "Jam"
    	},
    	{
    		name: "Cheese"
    	},
    ];
    return $scope.products;
    };
  });
