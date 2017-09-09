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
    	$scope.mapPath = mapService.getmap();
    	if(!$scope.mapPath){
        	$scope.getStoreMap();
    	}
    	$scope.keyWords();
    	$scope.storeMapDiv = true;
  		
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
      
     $scope.keywordSearch = function(keyword){
          $location.path('/product-list/' + keyword);
     }
      
     $scope.getStoreMap = function() {
 	    var data = {};
 		data.store = '1294';
 		return searchFactory.getMap(data).then(function (response){
 	        var map = response.message.entities[0].url;
 	        $scope.mapPath = map;
 	        mapService.setmap($scope.mapPath);
 	    });
     	$scope.storeMapDiv=true;
     };
      
    
     $scope.closeMap = function() {
         if($scope.storeMapDiv == true){
         	$scope.storeMapDiv = false; 
         	angular.element('span.map-marker').removeClass('active');
         }
       };

     $scope.toggleMap = function() {
         if($scope.storeMapDiv == false){
 		    $scope.storeMapDiv = true;
     		angular.element('span.map-marker').addClass('active');
     }else{
     	$scope.storeMapDiv = false; 
     	angular.element('span.map-marker').removeClass('active');
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
