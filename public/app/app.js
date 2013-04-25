var app = angular.module('App', ['ui.bootstrap'])
  .config(function($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', { controller: 'IndexCtrl', templateUrl: '/app/tpls/index.html'})
      ;
    $locationProvider.html5Mode(true);
  })
  ;