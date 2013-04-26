app.controller('LeadersCtrl', function($scope, socket) {
  $scope.hogs = [];
  socket.on('addHog', function(hog) {
    $scope.hogs.push(hog);
  });
  socket.emit('hogs');
});