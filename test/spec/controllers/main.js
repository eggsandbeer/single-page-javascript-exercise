'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('singlePageJavascriptExerciseApp'));

  var MainCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });
  }));

  it('should be defined', function () {
    expect(MainCtrl).toBeDefined();
  });
  it('should set usernotfound value to be initially be false, so we do not see the github user info view', function () {
    expect(scope.userNotFound).toBe(false);
  });
  it('should set loaded to be initially be false, so we do not see the user github repo listing view on load', function () {
    expect(scope.loaded).toBe(false);
  });
  it('have a main function call to control getting git info on the scope', function () {
    expect(scope.getGitInfo).toBeDefined();
  });
  it('have a function call to alert git info after it has been retrieved on the scope', function () {
    expect(scope.alertGitInfo).toBeDefined();
  });
  describe('getGitInfo Returning Promises', function(){
    beforeEach(inject(function ($q) {
      var deferred = $q.defer();
      deferred.resolve('data');

      spyOn(scope, 'getGitInfo').andReturn(deferred.promise);
    }));
    it('Get Info function should return a fulfilled promise', function () {
      var result;
      scope.getGitInfo().then(function(promise) {
        result = promise;
      });
      scope.$apply();
      expect(result).toMatch('data');
    });
  });

});
