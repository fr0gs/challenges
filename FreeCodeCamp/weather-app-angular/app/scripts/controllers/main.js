'use strict';

/**
 * @ngdoc function
 * @name weatherAppAngularApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Basically as it is a very simple app and I'll be pasting it to CodePen, I
 * join all the Application config, two service definitions and the controller logic
 * in a single main.js file.s
 */
angular.module('weatherAppAngularApp')

.factory('GeolocationPosition', function($q, $window, $rootScope) {
  //This code is mostly based on the Angular Newsletter:
  //http://www.ng-newsletter.com/advent2013/#!/day/12
  var geoCapable = false;

  if ($window.navigator && $window.navigator.geolocation) geoCapable = true;

  if (!geoCapable) {
    console.log("cagondios");
    $rootScope.broadcast('geo:error', 'geolocation not supported');
  }

  //Otherwise service is created, it returns a promise with the data of the
  //current location.
  var service =  {
    getPosition: function() {
      var d = $q.defer();

      if (!geoCapable) return d.reject();

      $window.navigator.geolocation.getCurrentPosition(function(pos) {
        d.resolve(pos);
        $rootScope.$apply();
      }, function(err) {

        $rootScope.$broadcast('geo:error', err);
        d.reject(pos);
        $rootScope.$apply();
      })
      return d.promise;
    }
  }

  return service;
})

.factory('WeatherService', function($resource, GeolocationPosition) {
  //var url = "http://api.openweathermap.org/data/2.5/weather?q=Madrid,es&appid=:apikey";
  //var url = "http://api.openweathermap.org/data/2.5/weather?lat=43.367866400000004&lon=-8.4084311&appid=:apikey";
  var url = "http://api.openweathermap.org/data/2.5/weather/";

  return $resource(url);
})

.controller('MainCtrl', function ($http, $scope, GeolocationPosition, WeatherService) {
  $http.defaults.useXDomain = true;

  var ApiKey = "6f4032b90a90dae8739e30dfe02eca87";

  $scope.getLocation = function () {
    GeolocationPosition.getPosition().then(pos => {
      $scope.latitude = pos.coords.latitude;
      $scope.longitude = pos.coords.longitude;
    })
  }

  $scope.getLocation();

  WeatherService.get({ q: 'Madrid,es', apikey: ApiKey  }, function (data) {
    $scope.weatherData = data;
  });

});
