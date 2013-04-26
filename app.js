var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
io.set('log level', 0);
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

app.get(/(?!\.)/, function(req, res) {
  res.sendfile('./public/index.html');
});

server.listen(3000);

var leaders = {};

io.sockets.on('connection', function (socket) {
  // insert search code here
  socket.on('search', function (q, fn) {
    request('https://ajax.googleapis.com/ajax/services/search/images?v=1.0&' +
     'q=HedgeHog+' + q,
      {json: true},
      function(e,r,b) { fn(b); }
    );
  });
  // server submit code here
  socket.on('submit', function(url) {
    // add to database
    db.put(uuid.v1(), JSON.stringify({url: url, votes: 0}));
    // broadcast to listeners
    io.sockets.emit('addHog', url);
  });
  socket.on('hogs', function() {
    db.createReadStream().on('data', function(data) { 
      var obj = JSON.parse(data.value);
      var hog = {id: data.key, url: obj.url, votes:  obj.votes };
      socket.emit('addHog', hog);
    });
  });
  socket.on('vote', function(hog) {
    db.put(hog.id, JSON.stringify({
      url: hog.url, 
      votes: hog.votes + 1
    }));
  });
});
