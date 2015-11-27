'use strict';

describe('Controller: OnlineCtrl', function () {

  // load the controller's module
  beforeEach(module('angularTwitchApp'));

  var OnlineCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    OnlineCtrl = $controller('OnlineCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(OnlineCtrl.awesomeThings.length).toBe(3);
  });
});
