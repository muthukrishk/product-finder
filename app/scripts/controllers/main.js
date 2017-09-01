'use strict';

/**
 * @ngdoc function
 * @name wowProductFinderApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the wowProductFinderApp
 */
angular.module('wowProductFinderApp')
  .controller('MainCtrl', function ($scope, $location, searchFactory) {

    $scope.selectedProduct = [];

    $scope.init = function() {
 		console.log("In init");
    	$scope.storeMapDiv=true;
  		var data = {};
  		data.store = '1294';
  		return searchFactory.getMap(data).then(function (response){
  	        var map = response.map;
  	        console.log(map);
  	      });
  	};
  	
     $scope.loadSuggestions = function(term) {
      var data = {};
      data.q = term;
      return searchFactory.suggestion(data).then(function (response){
        $scope.searching = false;
        var suggestions = response.suggestions;
        if(suggestions) {
          return suggestions.filter(function(product) {
            return product;
          });
        }
      });

    };
    
    $scope.toggleView = function() {
        $scope.storeMapDiv = !$scope.storeMapDiv;
        
      };

    $scope.goProductlisting = function() {
      console.log($scope.selectedProduct);
      $location.path('/product-list/' + $scope.selectedProduct[0].result);
    };
    
    $scope.init();
  });
