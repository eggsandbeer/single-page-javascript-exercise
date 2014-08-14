'use strict';

angular.module('singlePageJavascriptExerciseApp')
  .service('MainService',['$http', '$q', function($http, $q) {
  this.getUserInfo = function(username){
    var defer = $q.defer();

    $http.get('https://api.github.com/users/' + username, { cache: true})
      .success(function (data) {
        defer.resolve(data);
      }).
      error(function (data) {
        if (data.message === 'Not Found'){
          defer.resolve(false);
        }
      });

    return defer.promise;
  };
  this.getUserRepos = function(username){
    var defer = $q.defer();

    $http.get('https://api.github.com/users/' + username + '/repos', { cache: true})
      .success(function (data) {
        defer.resolve(data);
      }).
      error(function (data) {
        defer.resolve(data);
      });

    return defer.promise;
  };
}]);
