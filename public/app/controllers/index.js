app.controller('IndexCtrl', function($scope, socket, $location) {
  // insert search code here
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
    $location.path('/vote');
  };

});

