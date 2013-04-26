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