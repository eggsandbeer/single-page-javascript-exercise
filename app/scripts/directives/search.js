'use strict';

angular.module('singlePageJavascriptExerciseApp')
  .directive('search', function () {
    return {
      restrict: 'E',
      template: '<input type="text" ng-model="username" placeholder="Github username..." /><button ng-click="getGitInfo()">Pull User Data</button>'
    };
  });
