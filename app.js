var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var request = require('request');
var levelup = require('levelup');
var db = levelup('./mydb');
var uuid = require('node-uuid');

app.configure(function() {
  app.use(express.bodyParser({ uploadDir: __dirname + '/uploads', keepExtensions: true}));
  app.use(express.static(__dirname + '/public'));
});

app.get('/', function(req, res) {
  res.sendfile(__dirname + '/public/index.html');
});

// app.get('/api/hogs', function(req, res) {
//   db.createReadStream().pipe(process.stdout);
//   res.send(200);
// });

app.get(/(?!\.)/, function(req, res) {
  res.sendfile('./public/index.html');
});

server.listen(3000);

var leaders = {};

io.sockets.on('connection', function (socket) {
  socket.on('search', function (q, fn) {
    request('https://ajax.googleapis.com/ajax/services/search/images?v=1.0&' +
     'q=HedgeHog+' + q,
      {json: true},
      function(e,r,b) { fn(b); }
    );
  });
  socket.on('submit', function(url) {
    // add to database
    db.put(uuid.v1(), url);
    // broadcast to listeners
    io.sockets.emit('addHog', url);
  });
  socket.on('hogs', function() {
    db.createReadStream().on('data', function(data) { 
      socket.emit('addHog', data);
    });
  });
  socket.on('vote', function(hog) {
    console.log(leaders);
    leaders[hog.key] = leaders[hog.key] ? leaders[hog.key] + 1 : 0;
    console.log(leaders);
  });
});
