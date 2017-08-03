'use strict';

angular.module('wowProductFinderApp')
.factory('searchFactory', function ($rootScope, HttpService, $interpolate) {

  var baseUrl = api_url;
  var urls = {
    search: 'v3/search',
    autocomplete: 'v2/autocomplete'

  };

  var searchFactory = {};


  searchFactory.search = function (data) {
    return HttpService.process(baseUrl+urls.search,'GET',data);
  };

  searchFactory.suggestion = function (data) {
    return HttpService.process(baseUrl+urls.autocomplete,'GET',data);
  };




  return searchFactory;
});
