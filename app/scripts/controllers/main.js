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
    	$scope.getStoreMap();
    	$scope.keyWords();
  		
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
    
    $scope.keyWords = function() {
        var data = {};
        data.q = 'chocolate';
        return searchFactory.suggestion(data).then(function (response){
        	$scope.keyword = response.suggestions;
        });
      };
      
      $scope.getStoreMap = function() {
    	  console.log("Get Store Map");
    	    var data = {};
    		data.store = '1294';
    		return searchFactory.getMap(data).then(function (response){
    	        var map = response.map;
    	        console.log(map);
    	    });
        	$scope.storeMapDiv=true;
        };
        
        $scope.keywordSearch = function(keyword){
        	$location.path('/product-list/' + keyword);
        };
      
      
    
    $scope.closeMap = function() {
        $scope.storeMapDiv = false;        
      };
      
      $scope.openMap = function() {
          $scope.storeMapDiv = true;       
      };

    $scope.goProductlisting = function() {
      console.log($scope.selectedProduct);
      $location.path('/product-list/' + $scope.selectedProduct[0].result);
    };
    
    $scope.init();
  });
