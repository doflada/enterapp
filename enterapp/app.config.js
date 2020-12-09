'use strict';

angular.
  module('enterpriseAngApp').
  config(['$locationProvider', '$routeProvider',
    function config($locationProvider, $routeProvider) {
      $locationProvider.hashPrefix('!');

      $routeProvider.
        when('/login-view', {
          template: '<login-view></login-view>'
        }).
        when('/register-view', {
          template: '<register-view></register-view>'
        }).
        when('/office-view', {
          template: '<office-view></office-view>'
        }).
        when('/depart-view', {
          template: '<depart-view></depart-view>'
        }).
        when('/angajat-view', {
          template: '<angajat-view></angajat-view>'
        }).
        when('/salar-view', {
          template: '<salar-view></salar-view>'
        }).
        otherwise({redirectTo: '/login-view'});
    }
  ]);
