'use strict';

/**
 * @ngdoc overview
 * @name weatherAppAngularApp
 * @description
 * # weatherAppAngularApp
 *
 * Main module of the application.
 */
angular
  .module('weatherAppAngularApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  //This is only to redirect all default requests to /, which in turn redirects to main controller.
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
