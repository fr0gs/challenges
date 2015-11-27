'use strict';

describe('Controller: OfflineCtrl', function () {

  // load the controller's module
  beforeEach(module('angularTwitchApp'));

  var OfflineCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    OfflineCtrl = $controller('OfflineCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(OfflineCtrl.awesomeThings.length).toBe(3);
  });
});
