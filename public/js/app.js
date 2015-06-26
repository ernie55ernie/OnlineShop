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
    state('/view1', {
      url:'/view1',
      templateUrl: 'partials/product',
      controller: 'MyCtrl1'
    }).
    state('/view2', {
      url:'/view2',
      templateUrl: 'partials/createhistory',
      controller: 'MyCtrl2'
    }).
    state('/view3', {
      url:'/view3',
      templateUrl: 'partials/loadhistory',
      controller: 'MyCtrl3'
    }).
    state('/view4', {
      url:'/view4',
      templateUrl: 'partials/signup',
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
    });

    $urlRouterProvider.otherwise('/view1');
    $locationProvider.html5Mode(true);
}]);
