const http = require('http');

const jsonParser = function (data) {
  return JSON.parse(data);
}

const server = http.createServer((req, res) => {
  let data = '';
  req.on('data', (chunk) => {
    data += chunk
  })

  req.on('end', () => {
    const isJSON = req.headers['content-type'] === 'application/json'
    const parsedData = isJSON ? jsonParser(data) : null;
    console.log(parsedData);
  })

  res.write('HELLO!');
  res.end();
})

server.listen(8080, () => {
  console.log('Server is listening on 8080')
});