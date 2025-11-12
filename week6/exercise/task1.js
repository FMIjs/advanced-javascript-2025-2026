const http = require("http");
const fs = require("fs");
const path = require("path");

const templatesDir = path.join(__dirname, "templates");

const port = 8080;
const server = http.createServer((req, res) => {
  const { url, method } = req;

  if (!url.startsWith("/fetchTemplate/")) {
    res.statusCode = 404;
    res.write("Not Found");
    res.end();
    return;
  }

  if (method !== "GET") {
    res.statusCode = 405;
    res.write("Method Not Allowed");
    res.end();
    return;
  }

  // url => /fetchTemplate/templateName?key1=value1&key2=value2

  const urlParts = url.split("/");
  // ['', 'fetchTemplate', 'templateName?key1=value1&key2=value2']
  // split('/fetchTemplate/') => ['','templateName?key1=value1&key2=value2']
  if (urlParts.length !== 3 || !urlParts[2]) {
    res.statusCode = 400;
    res.write("Bad Request");
    res.end();
    return;
  }
  const [, , templateData] = urlParts; // 'templateName?key1=value1&key2=value2'
  const [templateName, rawQueryParams] = templateData.split("?");

  const queryParams = rawQueryParams.split("&").reduce((acc, param) => {
    const [key, value] = param.split("=");
    acc[key] = value;
    return acc;
  }, {});

  fs.readFile(`${templatesDir}/${templateName}.txt`, "utf8", (err, data) => {
    if (err) {
      res.statusCode = 404;
      res.write("Template Not Found");
      res.end();
      return;
    }

    Object.entries(queryParams).forEach(([key, value]) => {
      data = data.replaceAll(`{{${key}}}`, value);
    });

    res.statusCode = 200;
    res.end(data);
  });
});

server.listen(port, () => console.log(`server is listening on ${port}`));
