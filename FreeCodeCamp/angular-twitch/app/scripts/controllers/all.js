'use strict';

/**
 * @ngdoc function
 * @name angularTwitchApp.controller:AllCtrl
 * @description
 * # AllCtrl
 * Controller of the angularTwitchApp
 */
angular.module('angularTwitchApp')
  .controller('AllCtrl', function ($scope, $rootScope, twitch) {

    //This function is heavy as fuck, will be called first time when page all is loaded
    //(by default in application) and then it will be available from the rootScope for
    //the rest of the controllers.
    $scope.showAllStreams = function () {
      $rootScope.twitchUsers.forEach(function (elem) {
        twitch.getStreams().get({ stream: elem }, function (data) {
          var aux = {};
          aux[elem] = data;
          $rootScope.twitchUsersData.push(aux);
        });
      });
    }

    $scope.showAllStreams();
  });
