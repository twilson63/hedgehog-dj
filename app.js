var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var request = require('request');

app.configure(function() {
  app.use(express.bodyParser({ uploadDir: __dirname + '/uploads', keepExtensions: true}));
  app.use(express.static(__dirname + '/public'));
});

app.get('/', function(req, res) {
  res.sendfile(__dirname + '/public/index.html');
});

app.get(/(?!\.)/, function(req, res) {
  res.sendfile('./public/index.html');
});

server.listen(3000);

var apiKey = process.env.GROOVESHARK;
var currentSong = null;
var dj = null;

io.sockets.on('connection', function (socket) {
  socket.on('search', function (q, fn) {
    request('http://tinysong.com/s/' + 
      encodeURIComponent(q) +
      '?key=' + apiKey +
      '&format=json', {json: true}, function (e,r,b) {
        fn(b);
    });
  });
});

// var request = require('request');
// var es = require('event-stream');
// 
// io.sockets.on('connection', function (socket) {
// });

// es.pipeline(
//   request.get(url, { json: true}),
//   es.map(function(data, cb) {
//     var hog = JSON.stringify(JSON.parse(data).entities.urls);
//     io.sockets.emit('hog', hog);
//     cb(null, hog);
//   }),
//   process.stdout
// );


