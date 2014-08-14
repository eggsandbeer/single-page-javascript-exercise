'use strict';

angular.module('singlePageJavascriptExerciseApp')

  .controller('MainCtrl', ['$scope', '$http', 'MainService', function($scope, $http, MainService){
    $scope.userNotFound = false;
    $scope.loaded = false;

    $scope.getGitInfo = function () {
      var userInfoPromise = MainService.getUserInfo($scope.username);
      var userReposPromise = MainService.getUserRepos($scope.username);

      userInfoPromise.then(function(data){
        if(data === false ){
          $scope.userNotFound = true;
          $scope.loaded = false;
        } else {
          $scope.userNotFound = false;
          $scope.user = data;
          $scope.loaded = true;
        }

      },function(reason){
        // some sort of error handling here.
      });

      userReposPromise.then(function(data){
        $scope.repos = data;
        $scope.reposFound = data.length > 0;
      },function(reason){
        // some sort of error handling here.
      });
    };

    $scope.alertGitInfo = function(repo){
      var alertmessage = 'id: '+repo.id+'. created at: '+repo.created_at;
      alert(alertmessage);
    };
  }]);

