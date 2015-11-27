'use strict';

/**
 * @ngdoc overview
 * @name angularTwitchApp
 * @description
 * # angularTwitchApp
 *
 * Main module of the application.
 */
angular
  .module('angularTwitchApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/all', {
        templateUrl: 'views/all.html',
        controller: 'AllCtrl',
        controllerAs: 'all'
      })
      .when('/online', {
        templateUrl: 'views/online.html',
        controller: 'OnlineCtrl',
        controllerAs: 'online'
      })
      .when('/offline', {
        templateUrl: 'views/offline.html',
        controller: 'OfflineCtrl',
        controllerAs: 'offline'
      })
      .otherwise({
        redirectTo: '/all'
      });
  })
  .run(function ($rootScope) {
    $rootScope.twitchUsersData = [];
    $rootScope.twitchUsers = ["freecodecamp", "storbeck", "terakilobyte", "habathcx","RobotCaleb","thomasballinger","noobs2ninjas","beohoff", "medrybw"];
  });
