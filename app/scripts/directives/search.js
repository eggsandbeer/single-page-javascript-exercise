'use strict';

angular.module('singlePageJavascriptExerciseApp')
  .directive('search', function () {
    return {
      restrict: 'E',
      template: '<div class="form-group"><input class="form-control" type="text" ng-model="username" placeholder="Github username..." ng-keypress="keydown($event)" /></div><button class="btn btn-primary" ng-click="getGitInfo()">Pull User Data</button>'
    };
  });
