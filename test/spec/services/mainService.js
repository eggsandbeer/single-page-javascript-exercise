'use strict';

describe('Service: Mainservice', function () {

  // load the service's module
  beforeEach(module('singlePageJavascriptExerciseApp'));

  // instantiate service
  var MainService;
  beforeEach(inject(function (_MainService_) {
    MainService = _MainService_;
  }));

  it('should be defined', function () {
    expect(MainService).toBeDefined();
  });

  it('should have a get user info function attached', function () {
    expect(MainService.getUserInfo).toBeDefined();
  });

  it('should have a get user info function attached', function () {
    expect(MainService.getUserRepos).toBeDefined();

  });
});
