'use strict';

angular.module('singlePageJavascriptExerciseApp')
  .directive('search', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.text('this is the search directive');
      }
    };
  });
