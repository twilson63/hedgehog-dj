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
/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
app.factory('socket', function ($rootScope) {
    var socket = io.connect();
    return {
      on: function (eventName, callback) {
        socket.on(eventName, function () {  
          var args = arguments;
          $rootScope.$apply(function () {
            callback.apply(socket, args);
          });
        });
      },
      emit: function (eventName, data, callback) {
        socket.emit(eventName, data, function () {
          var args = arguments;
          $rootScope.$apply(function () {
            if (callback) {
              callback.apply(socket, args);
            }
          });
        });
      }
    };
  });
app.controller('IndexCtrl', function($scope, socket) {
  $scope.foo = "hostname=cowbell.grooveshark.com&songIDs=24577179&style=metal&p=0";
  
  $scope.search = function() {
    socket.emit('search', $scope.query, function(res) {
      $scope.hogs = res.responseData.results;
    });
  };

  $scope.select = function(hog) {
    $scope.selected = hog.url;
  };
  
  $scope.submit = function() {
    socket.emit('submit', $scope.selected);
    $scope.selected = "http://placehold.it/200x300";
    $scope.hogs = null;
    $scope.query = null;
    //console.log($scope.selected);
  };

});


app.controller('LeadersCtrl', function($scope, socket) {

});
app.controller('VoteCtrl', function($scope, socket, $location) {
  $scope.voted = false;
  $scope.hogs = [];
  socket.on('addHog', function(hog) {
    $scope.hogs.push(hog);
  });
  socket.emit('hogs');
  $scope.vote = function(hog) {
    if ($scope.voted) { return alert('only one vote per session'); }
    socket.emit('vote', hog);
    $scope.voted = true;
    $location.path('/leaders');
  };
});