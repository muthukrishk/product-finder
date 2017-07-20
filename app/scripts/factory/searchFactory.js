'use strict';

angular.module('wowProductFinderApp')
.factory('searchFactory', function ($rootScope, HttpService, $interpolate) {

  var baseUrl = api_url;
  var urls = {
    search: 'search'

  };

  var searchFactory = {};


  searchFactory.search = function (data) {
    return HttpService.process(baseUrl+urls.search,'GET',data);
  };



  return searchFactory;
});
