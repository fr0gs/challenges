'use strict';

/**
 * @ngdoc service
 * @name angularTwitchApp.twitch
 * @description
 * # twitch
 * Factory in the angularTwitchApp.
 */
angular.module('angularTwitchApp')
  .factory('twitch', function ($resource) {
    var url = "https://api.twitch.tv/kraken/streams/:stream";

    this.getStreamsLogic = function() {
      return $resource(url);
    }

    // Public API here
    return {
      getStreams: this.getStreamsLogic
    };
  });
