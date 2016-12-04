'use strict';

/**
 * @ngdoc overview
 * @name epsSharedWebApp
 * @description
 * # epsSharedWebApp
 *
 * Main module of the application.
 */
angular
  .module('epsSharedWebApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
