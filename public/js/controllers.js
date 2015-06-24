'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('AppCtrl', function ($scope, $http) {

    $http({
      method: 'GET',
      url: '/api/name'
    }).
    success(function (data, status, headers, config) {
      $scope.name = data.name;
    }).
    error(function (data, status, headers, config) {
      $scope.name = 'Error!';
    });

    $scope.upload = function(){
      filepicker.setKey("AfDUcO2yfT4yVBX9p2t4Xz");
      filepicker.pickAndStore({mimetype:"image/*"},{},
        function(InkBlobs){
          console.log(JSON.stringify(InkBlobs));
      });
    }

  }).
  controller('MyCtrl1', function ($scope) {
    // write Ctrl here

  }).
  controller('MyCtrl2', function ($scope) {
    // write Ctrl here

  });
