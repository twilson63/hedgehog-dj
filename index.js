var request = require('request');
var es = require('event-stream');
var url = 'https://twilson63:tmac7782@stream.twitter.com/1.1/statuses/filter.json?track=' + encodeURIComponent('cat');

es.pipeline(
  request.get(url, { json: true}),
  es.map(function(data, cb) {
    cb(null, JSON.stringify(JSON.parse(data).entities.urls));
  }),
  process.stdout
);
