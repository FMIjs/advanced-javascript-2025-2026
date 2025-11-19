var http = require('http');
var url = require('url');
var RequestLogger = require('./request-logger');

var logger = new RequestLogger({ maxLogs: 100 });

function loggingMiddleware(req, res, callback) {
  
  logger.log({
    method: req.method,
    url: req.url,
    timestamp: startTime,
    ip: req.connection.remoteAddress
  }).then(function() {
    callback();
  });
}

var server = http.createServer(function(req, res) {
  var parsedUrl = url.parse(req.url, true);
  var pathname = parsedUrl.pathname;
  
  loggingMiddleware(req, res, function() {
    
    // Route handlers
    if (pathname === '/' && req.method === 'GET') {
      // TODO: implement
    }
    else if (pathname === '/api/data' && req.method === 'GET') {
      // TODO: implement with Promise and random delay
    }
    else if (pathname === '/logs' && req.method === 'GET') {
      // TODO: implement with optional filtering
    }
    else if (pathname === '/stats' && req.method === 'GET') {
      // TODO: implement
    }
    else if (pathname === '/logs' && req.method === 'DELETE') {
      // TODO: implement
    }
    else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Not Found' }));
    }
    
  });
});
