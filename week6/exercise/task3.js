const http = require("http");
const https = require("https");

const server = http.createServer((req, res) => {
  // url like `/read?url=https://www.reddit.com/.rss`

  if (req.url.includes('/sw.js')) {
    res.end()
    return 
  }

  const [, rawQueryParams] = req.url.split("?");
  const queryParams = rawQueryParams.split("&").reduce((acc, param) => {
    const [key, value] = param.split("=");
    acc[key] = value;
    return acc;
  }, {});

  const { url } = queryParams

  // Вариант 1
  // https.get(url, (externalRes) => {
  //   let buffer = ''
  //   externalRes.on("data", (chunk) => buffer += chunk);
    
  //   externalRes.on("end", () => {
  //     res.statusCode = 200;
  //     res.write(buffer);
  //     res.end()
  //   });
  // })

  // Вариант 2
  // https.get(url, (externalRes) => {
  //   externalRes.on("data", (chunk) => res.write(chunk))
    
  //   externalRes.on("end", () => {
  //     res.statusCode = 200;
  //     res.end()
  //   });
  // })

  // Вариант 3
  https.get(url, (externalRes) => externalRes.pipe(res))
});

const port = 8080;
server.listen(port, () =>
  console.log(`Server is listening on http://localhost:${port}`)
);
