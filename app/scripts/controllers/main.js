'use strict';

/**
 * @ngdoc function
 * @name wowProductFinderApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the wowProductFinderApp
 */
angular.module('wowProductFinderApp')
  .controller('MainCtrl', function ($scope, $location, searchFactory, mapService) {

    $scope.selectedProduct = [];

    $scope.init = function() {
    	$scope.mapImage = mapService.getmap();
    	if(!$scope.mapImage){
        	$scope.getStoreMap();
    	}
    	$scope.keyWords();
    	$scope.storeMap = true;
    	$scope.mapactive = true;
  		
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
        data.days = '10';
        data.limit='20';
        data.store='1649';
        return searchFactory.getPopularTerms(data).then(function (response){
        	$scope.keyword = response.searchTermsList;
        });
      };
      
     $scope.keywordSearch = function(keyword){
          $location.path('/product-list/' + keyword);
     }
      
     $scope.getStoreMap = function() {
 	    var data = {};
 		data.store = '1294';
 		searchFactory.getMap(data).then(function (response){
 	        var map = response.message.entities[0].url;
 	        $scope.mapImage = map;
 	        mapService.setmap($scope.mapImage);
 	    });
     	$scope.storeMap=true;
     };

     $scope.toggleMap = function() {
         if($scope.storeMap == false){
 		    $scope.storeMap = true;
 		    $scope.mapactive = true;
     }else{
     	$scope.storeMap = false;
     	$scope.mapactive = false;
       }
     };

     $scope.search = function() {
   	  var product = $(".input").val().trim();
         if(!product){}
         else{
   	  		$location.path('/product-list/' + product);
         }
     };

    $scope.goProductlisting = function() {
      console.log($scope.selectedProduct);
      $location.path('/product-list/' + $scope.selectedProduct[0].result);
    };
    
    $scope.init();
  });
