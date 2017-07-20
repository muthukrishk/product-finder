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

    $scope.loadProducts = function(term) {

      var data = {};
      data.q = term;
      data.mode = 'online';
      data.type = 'products'
      return searchFactory.search(data).then(function (response){
        $scope.searching = false;
        console.log(response.products);
        var products = response.products;
        if(products) {
          return products.filter(function(product) {
            return product;
          });
        }
      });

    };

    $scope.goProductlisting = function() {
      console.log($scope.selectedProduct);
      $location.path('/product-list/' + $scope.selectedProduct[0].description);
    };
  });
