'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('AppCtrl', function ($rootScope, $window, $scope, $http) {

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

    $scope.saveCsv = function(csvurl){
      var data = {
        "csvurl": csvurl
      };
      $http({method:"POST", url:"/api/savecsv", data:data}).success(function(post){
          console.log(post);
      });
    };
    /*
data-fp-apikey="AfDUcO2yfT4yVBX9p2t4Xz" 
data-fp-mimetypes="text/comma-separated-values, text/csv, application/csv, application/excel, application/vnd.ms-excel, application/vnd.msexcel, text/anytext" 
data-fp-container="modal" 
onchange="alert(event.fpfile.url);angular.element(this).scope().saveCsv();angular.element(this).scope().data.csvurl = event.fpfile.url"
    */

  }).
  controller('MyCtrl1', function ($scope) {
    // write Ctrl here

  }).
  controller('MyCtrl2', function ($scope) {
    // write Ctrl here

  });
