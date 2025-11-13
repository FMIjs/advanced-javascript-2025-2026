const http = require("http");

const port = 8080;
const server = http.createServer((req, res) => {
  // Идеята тук е да симулираме голям файл, който се генерира на части и се праща на клиента на части
  const chars = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
  let count = 0
  const interval = setInterval(() => {
    const dataToSend = chars[count].repeat(10_000)
    res.write(dataToSend);
    count++;
    if (count === chars.length) {
      clearInterval(interval);
      res.end();
    }
  }, 1_000)
});

server.listen(port, () => console.log(`server is listening on ${port}`));

/**
 * За домашно
 * да пренапишем 1. задача с безкрайно голям template файл
 */
