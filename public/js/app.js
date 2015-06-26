'use strict';

// Declare app level module which depends on filters, and services

angular.module('myApp', [
  'myApp.controllers',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'ui.router'
]).
config(['$routeProvider', '$locationProvider', '$stateProvider', '$urlRouterProvider', function($routeProvider, $locationProvider, $stateProvider, $urlRouterProvider) {
  $stateProvider.
    state('/product', {
      url:'/product',
      templateUrl: 'partials/product',
      controller: 'ProductCtrl'
    }).
    state('/createhistory', {
      url:'/createhistory',
      templateUrl: 'partials/createhistory',
      controller: 'CreateHistoryCtrl'
    }).
    state('/loadhistory', {
      url:'/loadhistory',
      templateUrl: 'partials/loadhistory',
      controller: 'LoadHistoryCtrl'
    }).
    state('/signup', {
      url:'/signup',
      templateUrl: 'partials/signup',
<<<<<<< HEAD
      controller: 'MyCtrl4'
    }).
    state('/view5', {
      url:'/view5',
      templateUrl: 'partials/profile',
      controller: 'MyCtrl5'
    }).
    state('/view6', {
      url:'/view6',
      templateUrl: 'partials/history',
      controller: 'MyCtrl6'
=======
      controller: 'SignupCtrl4'
>>>>>>> 2679452335f90803516601afb08b568ddd2d32e1
    });

    $urlRouterProvider.otherwise('/product');
    $locationProvider.html5Mode(true);
}]);
