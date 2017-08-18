'use strict';

/**
 * @ngdoc function
 * @name wowProductFinderApp.controller:SearchListinFilterCtrl
 * @description
 * # SearchListinFilterCtrl
 * Controller of the wowProductFinderApp
 */
angular.module('wowProductFinderApp')
  .controller('SearchListinFilterCtrl', function ($routeParams, $scope, searchFactory, $location, $http, productService) {

  	$scope.init = function() {
  		$scope.selectedProduct = [];

  		$scope.sortoptions=[
	        {id:"relevance",name:"Relevance"},
	        {id:"alphabetical",name:"A to Z"},
	        {id:"alphabetical",name:"Z to A"}];

  		$scope.term = $routeParams.term;
  		$scope.aisleNumber = $routeParams.aisleNumber;
  		$scope.category = null;
  		$scope.storeLocation = null;
  		if($routeParams.category != null){
  			$scope.category = $routeParams.category;
  		}
  		if($routeParams.storeLocation != null ){
  			$scope.storeLocation = $routeParams.storeLocation;
  		}
  		
  		var paramsObj = {};
  		paramsObj.result = $routeParams.term;
  		$scope.selectedProduct.push(paramsObj);
  		
      var allProducts = productService.getallProducts();
      if(!allProducts) {
    	//Fetching Products from API
        $scope.LoadProducts($scope.term);
      } else {
    	//Filtering based on aisle
        var aisleProducts = _.filter(productService.getallProducts(), function(product){return product.instoreaisleid === parseInt($scope.aisleNumber); });
        $scope.productsList = aisleProducts;
        if($scope.category !== null){
        	 //Filtering based on category - Aisle undefined
        	var productsWithoutAisleid = _.filter(productService.getallProducts(), function(product){return !product.instoreaisleid && product.ecfcategory1 === $scope.category  });
        	console.log(productsWithoutAisleid);
      	  	$scope.productsonCategory = productsWithoutAisleid;
        }
        else if($scope.storeLocation !== null) {
        	//Filtering based on InStoreLocation for Aisle 0
      	  	var productsWithAisleZero = _.filter(productService.getallProducts(), function(product){
      	  	return (parseInt(product.instoreaisleid) === 0) && product.instorelocation === $scope.storeLocation;});
      	  	$scope.productsonAisle0 = productsWithAisleZero;
      	  	console.log($scope.productsonAisle0);
        }
      }

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
        $location.path('/product-list-filter/' + $scope.selectedProduct[0].result + '/' + $scope.aisleNumber);
     };

    $scope.LoadProducts = function(term, sortOptions) {
         var data = {};
         data.q = term;
         data.store='1294';
         data.type='products';
         data.max = 1000;
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
          $scope.productLoading = false;
          $scope.sortingProducts = false;
          $scope.allProducts = response.products;
          if($scope.category !== null){
        	  //Filtering based on category - Aisle undefined
        	  var productsWithoutAisleid = _.filter(response.products, function(product){return !product.instoreaisleid && product.ecfcategory1 === $scope.category  });
        	  $scope.productsonCategory = productsWithoutAisleid;  
          }
          else if($scope.storeLocation !== null){
        	//Filtering based on InStoreLocation for Aisle 0
        	  var productsWithAisleZero = _.filter(response.products, function(product){
        	  return (parseInt(product.instoreaisleid) === 0) && product.instorelocation === $scope.storeLocation;});
        	  $scope.productsonAisle0 = productsWithAisleZero;
          }
          else{
        	//Filtering based on Aisle
              var aisleProducts = _.filter(response.products, function(product){return product.instoreaisleid === parseInt($scope.aisleNumber); });
              $scope.productsList = aisleProducts;
          }
         });
       };


       $scope.productSort = function(sortOptions){
    	  $scope.LoadProducts($scope.term, sortOptions);
       };

  	$scope.init();

  });