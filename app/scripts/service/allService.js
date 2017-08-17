(function () {
'use strict';

angular.module('wowProductFinderApp').service('productService',function () {


  this.setallProducts = function (data) {
    this.allProducts = data;
  };

  this.getallProducts = function () {
    return this.allProducts;
  };


});

})();
