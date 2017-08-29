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
		$scope.sortoptions=[
		        	        {id:"relevance",name:"Relevance"},
		        	        {id:"alphabetical",name:"A to Z"},
		        	        {id:"alphabetical",name:"Z to A"}];

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

    $scope.loadMoreProducts = function() {
      console.log($scope.LoadMore.split('&'));
      var loadMoreParts = {};
      $scope.LoadMore.split('&').reduce(function (result, item) {
        var parts = item.split('=');
        loadMoreParts[parts[0]] = parts[1];
      }, {});
      $scope.productInfinteLoading = true;
      var infinteData = {};
      infinteData.q = $scope.term;
      infinteData.store='1294';
      infinteData.type='products';
      infinteData.prodcurr = loadMoreParts.prodcurr;
      infinteData.cursor = loadMoreParts.cursor;
      infinteData.max = 40;
      if(loadMoreParts.sort) {
        infinteData.sort = loadMoreParts.sort;
      }
      if(loadMoreParts.reversed) {
        infinteData.reversed='true';
      }
      searchFactory.search(infinteData).then(function (response){
        if(response.products.length > 0) {
          var productsWithId = _.filter(response.products, function(product){return !_.isUndefined(product.instoreaisleid)});
          _.each(productsWithId, function(product){
            $scope.allProducts.push(product);
          });
        }
        $scope.LoadMore = response.nextpage;
        $scope.productInfinteLoading = false;
      });
    };


    $scope.LoadProducts = function(term, sortOptions) {
        var data = {};
        data.q = term;
        data.store='1294';
        data.type='products';
        data.max = 40;
       if(sortOptions) {
          data.sort = sortOptions.id;
        }
        if(sortOptions && sortOptions.name == "Z to A") {
       	 data.reversed='true';
        }
        if(!sortOptions) {
       	 $scope.productLoading = true;
        } else {
       	 $scope.sortingProducts = true;
        }
        searchFactory.search(data).then(function (response){
           $scope.allProducts = _.filter(response.products, function(product){return !_.isUndefined(product.instoreaisleid)});
           $scope.productLoading = false;
           $scope.sortingProducts = false;
           $scope.product_count = response.product_count;
           $scope.LoadMore = response.nextpage;
           productService.setallProducts(response.products);
        });

      };

	   $scope.productSort = function(sortOptions){
	    	$scope.LoadProducts($scope.term, sortOptions);
	   };

  	$scope.init();

  });
