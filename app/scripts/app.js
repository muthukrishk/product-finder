'use strict';

/**
 * @ngdoc overview
 * @name wowProductFinderApp
 * @description
 * # wowProductFinderApp
 *
 * Main module of the application.
 */
angular
  .module('wowProductFinderApp', [
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ngTagsInput',
    'infinite-scroll',
    'ui.bootstrap'
  ]);


 angular.module('wowProductFinderApp').config(['$locationProvider',  function ($locationProvider) {
   //$locationProvider.html5Mode(true);
   $locationProvider.hashPrefix('');
 }]);