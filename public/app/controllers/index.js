app.controller('IndexCtrl', function($scope, socket, $window) {
  $scope.foo = "hostname=cowbell.grooveshark.com&songIDs=24577179&style=metal&p=0";
  
  $scope.search = function() {
    socket.emit('search', $scope.query, function(songs) {
      $scope.songs = songs;
    });
  };

  $scope.select = function(song) {
    //socket.emit('song', song);
    //console.log(song);
    play(song);
    return false;
  };

  function play (song) {
    angular.element('iframe').attr('src', song.Url);
    // if (!song) return;
    // $scope.playing = '<hr><b>Now Playing: </b>' + 
    //   song.ArtistName + ' ' +
    //   song.SongName + '<br />';
    // var iframe = angular.element('<iframe></iframe>');
    // iframe.frameborder = 0;
    // console.log(song);
    // iframe.src = song.Url;
    // angular.element('body').append(iframe);
  }
  
  //socket.on('song', play);

});

