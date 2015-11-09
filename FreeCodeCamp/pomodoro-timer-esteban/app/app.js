'use strict';

/*
  Declare app level module which depends on views, and components
  Creates module myApp and we inject the ngRoute, the myApp.pomodoro
  and the version modules.
*/
angular.module('myApp', [
  'ngRoute',
  'myApp.pomodoro',
  'myApp.version'
]).

//Config function that configures the module in compile time before rendering
//Default route configured to redirect to /pomodoro
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise(
    {redirectTo: '/pomodoro'}
  );
}]);
