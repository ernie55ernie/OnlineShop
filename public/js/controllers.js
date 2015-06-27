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
          $scope.csvcontent = result.slice(0, 5);
          $http({method:"POST", url:"/api/savejson", data:{jsoncontent:result}}).success(function(post){
              //console.log(post);
          });
      });
      $http({method:"POST", url:"/api/savecsv", data:data}).success(function(post){
          console.log(post);
      });
    };
  }).
  controller('CreateHistoryCtrl', function ($scope , $http, $rootScope) {
    // write Ctrl here
    $scope.exceed=false;
    $scope.products=[];
    $http({method:"GET", url:"/getproducts"}).success(function(products){
          $scope.products = products;
          // console.log(products);
      });

    $scope.$watch('kinds', function(){
      $scope.exceed=false;
      $scope.showResult = false;
      $scope.results=[];
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
      $http({
          url: '/generatelist',
          method: "POST",
          data: {'products': $scope.productprob, 'total': $scope.total, 'CID': $rootScope.user.userId},
      }).success(function(post){
        alert('success');
          console.log(post);
        $scope.results = post;
        $scope.showResult = true;
      });
      // console.log($scope.productprob);
    }

  }).
  controller('ProductCtrl', function ($rootScope, $scope , $http) {
    // write Ctrl here
    $scope.pagenum = 0;
    $http({method:"GET", url:"/getproducts"}).success(function(products){
          $scope.products = products;
          $scope.pagenum = (products.length-4)/6;
          console.log(products);
      });

    if($rootScope.user.userId){
      $http({method:"POST", url:"/recommend", data:{
        uid: $rootScope.user.userId
      }}).success(function(products){
          
      });
    }
  }).
  controller('SignupCtrl', function ($scope , $http, $location) {
    // write Ctrl here
    $scope.username = "";
    $scope.password = "";
    $scope.email = "";
    $scope.birthday = "";
    $scope.gender = "";
    $scope.photo = "";
    $scope.Signup = function(){
      console.log($scope.password);
      var data = {
        username:$scope.username,
        password:$scope.password,
        email:$scope.email,
        birthday:$scope.birthday,
        gender:$scope.gender,
        photo:$scope.photo
      }
      console.log(data);
      $http({
        method:"POST", 
        url:"/createuser", 
        data:data
      })
      .success(function(post){
        console.log(post);
        alert("Sign success ! Now you can login");
        window.location.reload();
        $location.path('/')
      });
    }

  }).
  controller('ProfileMyCtrl', function ($rootScope, $scope, $http) {
    // write Ctrl here
    $scope.name = "";
    $scope.email = "";
    $scope.birthday = "";
    $scope.gender = "";
    $scope.photo = "";
    $scope.init = function(){
      var uid = $rootScope.user.userId;
      $http({method:"GET", url:"/getcustomer/" + uid}).success(function(customer){
        console.log(customer);
        $scope.name = customer.cusername;
        $scope.email = customer.cemail;
        $scope.birthday = customer.cbirthday;
        $scope.gender = customer.cgender;
        $scope.photo = customer.cphoto;
      });
    }
  }).
  controller('SearchMyCtrl', function ($scope) {
    // write Ctrl here

  }).
  controller('HistoryMyCtrl', function ($scope) {
    // write Ctrl here

  });
