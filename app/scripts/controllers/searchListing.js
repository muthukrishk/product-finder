'use strict';

/**
 * @ngdoc function
 * @name wowProductFinderApp.controller:SearchListinCtrl
 * @description
 * # SearchListinCtrl
 * Controller of the wowProductFinderApp
 */
angular.module('wowProductFinderApp')
  .controller('SearchListinCtrl', function ($routeParams, $scope, searchFactory, $location, $http, productService) {

  	$scope.init = function() {
  		$scope.selectedProduct = [];

  		$scope.term = $routeParams.term;
  		var paramsObj = {};
  		paramsObj.result = $routeParams.term;
  		$scope.selectedProduct.push(paramsObj);
  		$scope.LoadProducts($scope.term);
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

    $scope.LoadProducts = function(term) {
         var data = {};
         data.q = term;
         data.store='1294';
         data.type='products';
         data.max = 1000;
         $scope.productLoading = true;
         searchFactory.search(data).then(function (response){
            $scope.allProducts = response.products;
            $scope.productLoading = false;
            var productsWithAisle = _.filter(response.products, function(product){return product.instoreaisleid && parseInt(product.instoreaisleid) != 0});
            $scope.productsList = _.groupBy(productsWithAisle, 'instoreaisleid');
            var productsWithoutAisle = _.filter(response.products, function(product){return !product.instoreaisleid});
            $scope.productsListCateogry = _.groupBy(productsWithoutAisle, 'ecfcategory1');
            var productsWithAisleZero = _.filter(response.products, function(product){return parseInt(product.instoreaisleid) === 0});
            $scope.productsListInStore = _.groupBy(productsWithAisleZero, 'instorelocation')
            console.log($scope.productsListInStore );
            productService.setallProducts(response.products);
         });

       };

    $scope.drillDownAisle = function(aisleNumber) {
      $location.path('/product-list-filter/' + $scope.selectedProduct[0].result + '/' + aisleNumber);
    };

  	$scope.init();

  });
