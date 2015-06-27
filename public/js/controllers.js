'use strict';

/* Controllers */

angular.module('myApp.controllers', ['ngRoute']).
  controller('AppCtrl', function ($rootScope, $window, $scope, $http, $state, $location) {

    $rootScope.isLogin = $window.isLogin;

    if (typeof(Storage) != "undefined") {
      var lang = localStorage.getItem("lang");
      // console.log(lang);
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
      userPhoto: $window.userPhoto,
      userEmail: $window.userEmail
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
      $http({method:"POST", url:"/login", data:data}).success(function(post){
          // console.log(post);
          if(post.msg!="success"){ 
            alert(post.msg);
          }else{
            alert(post.msg);
          }
          // console.log("success");
          window.location.reload();
          $location.path('/')
        });
    }

  }).
  controller('LoadHistoryCtrl', function ($scope, $http) {
    $scope.csvcontent = [];

    $scope.saveCsv = function(csvurl){
      var data = {
        "csvurl": csvurl
      };
      $http({method:"POST", url:"/api/csvtojson", data:data}).success(function(result){
          $scope.csvcontent = result;
          console.log(JSON.stringify(result));
      });
      $http({method:"POST", url:"/api/savecsv", data:data}).success(function(post){
          console.log(post);
      });
    };
  }).
  controller('CreateHistoryCtrl', function ($scope , $http) {
    // write Ctrl here
    $scope.exceed=false;
    $scope.products=[];
    $http({method:"GET", url:"/getproducts"}).success(function(products){
          $scope.products = products;
          // console.log(products);
      });

    $scope.$watch('kinds', function(){
      $scope.exceed=false;
      var len = parseInt($scope.kinds) || 0;
      if($scope.products.length < len) {
        len = $scope.products.length;
        $scope.exceed=true;
      }
      var i = 0;
      $scope.product = new Array(len||0);
      $scope.productprob = _.range(len).map(function () {
        return {'pid': $scope.products[i++].pid, 'prob': ''};
      });
    },true);

    $scope.submit=function(){
      var jsonData=angular.toJson($scope.productprob);
      var objectToSerialize={'object':jsonData};
      $http({
          url: '/generatelist',
          method: "POST",
          data: $.param(objectToSerialize),
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
          }
      }).success(function(post){
          console.log(post);
      });
      // console.log($scope.productprob);
    }

  }).
  controller('ProductCtrl', function ($scope , $http) {
    // write Ctrl here
    $scope.pagenum = 0;
    $http({method:"GET", url:"/getproducts"}).success(function(products){
          $scope.products = products;
          $scope.pagenum = (products.length-4)/6;
          console.log(products);
      });
  }).
  controller('SignupCtrl', function ($scope) {
    // write Ctrl here

  }).
  controller('ProfileMyCtrl', function ($scope) {
    // write Ctrl here

  }).
  controller('SearchMyCtrl', function ($scope) {
    // write Ctrl here

  }).
  controller('HistoryMyCtrl', function ($scope) {
    // write Ctrl here

  });
