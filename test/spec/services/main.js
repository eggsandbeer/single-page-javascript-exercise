'use strict';

describe('Service: Main', function () {

  // load the service's module
  beforeEach(module('singlePageJavascriptExerciseApp'));

  // instantiate service
  var Main;
  beforeEach(inject(function (_Main_) {
    Main = _Main_;
  }));
});
