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

