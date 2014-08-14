'use strict';

describe('Directive: search', function () {

  // load the directive's module
  beforeEach(module('singlePageJavascriptExerciseApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('set the scope when text is inputted', inject(function ($compile) {
    element = angular.element('<search></search>');
    element = $compile(element)(scope);

    expect(scope.username).toBeUndefined();

    element.val(3);

    // Test not finished. I am trying to simulate setting the value on the input, clicking the button on the directive template (or just triggering the getGitInfo() function and then check the scope to make sure it matches the value of the input.
  }));
});
