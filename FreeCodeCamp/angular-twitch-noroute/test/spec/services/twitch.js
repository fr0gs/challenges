'use strict';

describe('Service: twitch', function () {

  // load the service's module
  beforeEach(module('angularTwitchNoRouteApp'));

  // instantiate service
  var twitch;
  beforeEach(inject(function (_twitch_) {
    twitch = _twitch_;
  }));

  it('should do something', function () {
    expect(!!twitch).toBe(true);
  });

});
