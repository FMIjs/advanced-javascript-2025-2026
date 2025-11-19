
function RequestLogger(options) {
  // options = {
  //   maxLogs: 100,  // максимален брой logs в паметта
  // }
}

var logger = new RequestLogger({ maxLogs: 50 });

logger.log({
  method: 'GET',
  url: '/api/users',
  timestamp: Date.now(),
  ip: '127.0.0.1'
}).then(function(entry) {
  console.log('Logged:', entry);
});

logger.getStats().then(function(stats) {
  console.log('Total requests:', stats.total);
  console.log('By method:', stats.byMethod);
});