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
      controller: 'SignupCtrl4'
    });

    $urlRouterProvider.otherwise('/product');
    $locationProvider.html5Mode(true);
}]);
