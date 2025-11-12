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

  if (method !== "POST") {
    res.statusCode = 405;
    res.write("Method Not Allowed");
    res.end();
    return;
  }

  const [, rawTemplateName] = url.split("/fetchTemplate/");
  const templateName = rawTemplateName.split("?")[0];

  let bodyBuffer = "";
  req.on("data", (chunk) => {
    bodyBuffer += chunk;
  });
  req.on("end", () => {
    try {
      const body = JSON.parse(bodyBuffer);
      fs.readFile(
        `${templatesDir}/${templateName}.txt`,
        "utf8",
        (err, data) => {
          if (err) {
            res.statusCode = 404;
            res.write("Template Not Found");
            res.end();
            return;
          }

          Object.entries(body).forEach(([key, value]) => {
            data = data.replaceAll(`{{${key}}}`, value);
          });

          res.statusCode = 200;
          res.end(data);
        }
      );
    } catch (e) {
      res.statusCode = 400;
      res.write("Bad Request");
      res.end();
      return;
    }
  });
  req.on("error", () => {
    res.statusCode = 500;
    res.write("Internal Server Error");
    res.end();
    return;
  });
});

server.listen(port, () => console.log(`server is listening on ${port}`));
