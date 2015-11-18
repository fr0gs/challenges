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

.filter('KelvinToCelsius', function() {
  return function(input) {
    input = input | "";
    var output = parseFloat(input);
    return (output-273.15).toPrecision(4);
  }
})

.filter('KelvinToFahrenheit', function () {
  return function(input) {
    input = input | "";
    var output = parseFloat(input);
    return (output * 9 / 5 - 459.67).toPrecision(4);
  }
})

.factory('GeolocationPosition', function($q, $window, $rootScope) {
  //This code is mostly based on the Angular Newsletter:
  //http://www.ng-newsletter.com/advent2013/#!/day/12
  var geoCapable = false;

  if ($window.navigator && $window.navigator.geolocation) geoCapable = true;

  if (!geoCapable) {
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
  var url = "http://api.openweathermap.org/data/2.5/weather?lat=:lat&lon=:lon&appid=:apikey";
  //var url = "http://api.openweathermap.org/data/2.5/weather/";

  return $resource(url);
})

.controller('MainCtrl', function($scope, GeolocationPosition, WeatherService) {

  var ApiKey = "6f4032b90a90dae8739e30dfe02eca87";

  $scope.isCelsius = true;

  $scope.getLocation = function() {
    GeolocationPosition.getPosition().then(pos => {
      WeatherService.get({ lat: pos.coords.latitude, lon: pos.coords.longitude, apikey: ApiKey }, function (data) {
        $scope.weatherCountry = data.sys["country"];
        $scope.weatherCity = data.name;
        $scope.weatherWindSpeed = data.wind.speed;
        $scope.weatherStatus = data.weather[0]["main"];
        $scope.weatherDescription = data.weather[0]["description"];
        $scope.weatherActualTemperature = data.main.temp;
        $scope.weatherTempMax = data.main.temp_max;
        $scope.weatherTempMin = data.main.temp_min;
      });
    })
  }

  $scope.toCelsius = function() {
    $scope.isCelsius = true;
  }

  $scope.toFahrenheit = function() {
    $scope.isCelsius = false;
  }

  $scope.getLocation();

});
