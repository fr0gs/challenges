'use strict';

/**
 * @ngdoc function
 * @name angularTwitchNoRouteApp.controller:MaincontrollerCtrl
 * @description
 * # MaincontrollerCtrl
 * Controller of the angularTwitchNoRouteApp
 */
angular.module('angularTwitchNoRouteApp')
  .controller('MainControllerCtrl', function($scope, $rootScope, twitch) {
    $scope.usersShow = []; //the ones to show
    $rootScope.allUsersData = []; //all
    $rootScope.onlineUsersData = []; //online
    $rootScope.offlineUsersData = []; //offline
    $rootScope.twitchUsers = ["freecodecamp", "storbeck", "terakilobyte", "habathcx","RobotCaleb","thomasballinger","noobs2ninjas","beohoff", "medrybw", "monstercat"];

    $scope.changeAll = function () {
      $scope.usersShow = $rootScope.allUsersData;
    }

    $scope.changeOnline = function () {
      $scope.usersShow = $rootScope.onlineUsersData;
    }

    $scope.changeOffline = function () {
      $scope.usersShow = $rootScope.offlineUsersData;
    }

    //This function is heavy as fuck, will be called first time when page all is loaded
    //(by default in application) and then it will be available from the rootScope for
    //the rest of the controllers.
    $rootScope.twitchUsers.forEach(function (elem) {
      twitch.getStreams().get({ stream: elem }, function (data) {
        var aux = {};
        aux[elem] = data;
        $rootScope.allUsersData.push(aux);

        if (data.stream === null) {
          $scope.offlineUsersData.push(aux);
        }
        else {
          $scope.onlineUsersData.push(aux);
        }
      });
    });

    $scope.usersShow = $rootScope.allUsersData;
  });
