var app = angular.module('App', ['ui.bootstrap'])
  .config(function($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', { controller: 'IndexCtrl', templateUrl: '/app/tpls/index.html'})
      .when('/vote', { controller: 'VoteCtrl', templateUrl: '/app/tpls/vote.html'})
      .when('/leaders', { controller: 'LeadersCtrl', templateUrl: '/app/tpls/leaders.html'})
      ;
    $locationProvider.html5Mode(true);
  })
  ;