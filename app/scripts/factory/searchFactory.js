'use strict';

angular.module('wowProductFinderApp')
.factory('searchFactory', function ($rootScope, HttpService, $interpolate) {

  var baseUrl = api_url;
  var urls = {
		    search: 'wow/v3/search',
		    autocomplete: 'wow/v2/autocomplete',
		    map: 'storemap/map'
  };

  var searchFactory = {};


  searchFactory.search = function (data) {
    return HttpService.process(baseUrl+urls.search,'GET',data);
  };

  searchFactory.suggestion = function (data) {
    return HttpService.process(baseUrl+urls.autocomplete,'GET',data);
  };

  searchFactory.getMap = function (data) {
	    return HttpService.process(baseUrl+urls.map,'GET',data);
};

  return searchFactory;
});
