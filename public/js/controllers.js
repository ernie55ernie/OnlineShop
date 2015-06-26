'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('AppCtrl', function ($rootScope, $window, $scope, $http) {

    $rootScope.isLogin = $window.isLogin;

    if (typeof(Storage) != "undefined") {
      var lang = localStorage.getItem("lang");
      console.log(lang);
      if( lang!=null) $rootScope.lang = lang;
      else{
        $rootScope.lang = "zh-TW";
      } 
    } 
    else {
      alert("Sorry, your browser does not support Web Storage...");
    }

    $rootScope.user = {
      userId: $window.userId,
      userName: $window.userName,
      userGender: $window.userGender,
      userBirthday: $window.userBirthday,
      userAccount: $window.userAccount,
      userPhoto: $window.userPhoto
    };
/*
    $rootScope.$watch('lang',function(newValue, oldValue){   

      if(newValue!=oldValue){
        localStorage.setItem("lang", newValue);
        $http({method:"POST", url:'/api/setLocale', data:{locale:newValue}}).success(function(result){
          // $state.transitionTo('index', null, {'reload':true});
          location.reload();
        });
      }
    });
*/
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

    $scope.username = "";
    $scope.password = "";
    $scope.Login = function(){
      var data = {
        username:$scope.username,
        password:$scope.password
      }
      $http({method:"POST", url:"/api/login", data:data}).success(function(post){
          console.log(post);
          if(post.msg!="success"){ 
            alert(post.msg);
          }
          // console.log("success");
          window.location.reload();
          $location.path('/')
        });
    }

  }).
  controller('MyCtrl1', function ($scope) {
    // write Ctrl here

  }).
  controller('MyCtrl2', function ($scope) {
    // write Ctrl here

  });
