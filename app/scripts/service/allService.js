(function () {
'use strict';

angular.module('wowProductFinderApp').service('mapService',function () {


  this.setmap = function (data) {
    this.mapPath = data;
  };

  this.getmap = function () {
    return this.mapPath;
  };


});

})();