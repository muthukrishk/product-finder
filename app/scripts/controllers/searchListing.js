'use strict';

/**
 * @ngdoc function
 * @name wowProductFinderApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the wowProductFinderApp
 */
angular.module('wowProductFinderApp')
  .controller('SearchListinCtrl', function ($routeParams, $scope, searchFactory, $location) {

  	$scope.init = function() {
  		$scope.selectedProduct = [];

  		$scope.term = $routeParams.term;
  		var paramsObj = {};
  		paramsObj.result = $routeParams.term;
  		$scope.selectedProduct.push(paramsObj);
  		console.log($scope.selectedProduct);
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

    $scope.goProductlisting = function() {
      console.log($scope.selectedProduct);
      $location.path('/product-list/' + $scope.selectedProduct[0].result);
    };

  	$scope.init();
    
  });
