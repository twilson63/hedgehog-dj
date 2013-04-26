app.controller('VoteCtrl', function($scope, socket, $location) {
  $scope.hogs = [];
  socket.on('addHog', function(hog) {
    $scope.hogs.push(hog);
  });
  socket.emit('hogs');
  $scope.vote = function(hog) {
    socket.emit('vote', hog);
    $location.path('/leaders');
  };
});