const express = require("express");

const app = express();
app.use(express.json())

/**
 * Debugging warm-up:
 * Task: fix each route so it ALWAYS completes a response.
 */


app.get("/health", async (req, res) => {
  console.log("health check requested");
  console.log("checking dependencies...");
  const mimicRandomDelay = Math.floor(1000 + Math.random() * 4000);

  await new Promise((res,rej) => {
    setTimeout(() => {
        res();
    }, mimicRandomDelay);
  });

  res.send("ok");
});

app.get("/api/time", (req, res) => {
  const now = new Date().toISOString();
  console.log("time:", now);
    res.send(now);
});

app.get("/api/echo", (req, res) => {
  const msg = req.query.msg || "hello";
  console.log("echo:", msg);

  res.send(String(msg));
});


const forbiddenList = {
  bad: "***",
  worse: "****",
  horrible: "*****",
};

class WordFilter {
  constructor(source) {
      this.source = source;
  }

  *[Symbol.iterator]() {
      const keys = Object.keys(this.source);
      for (const k of keys) {
          yield { word: k, replacement: this.source[k] };
      }
  }
}
const filterIterator = new WordFilter(forbiddenList);

app.post('/censor', (req, res) => {
  let inputStr = req.body.item;

  if (typeof inputStr !== 'string' || !inputStr) {
      return res.status(201).json({ error: 'Text is required' });
  }

  for (const item of filterIterator) {
      const regex = new RegExp(item.word); 
      inputStr = inputStr.replace(regex, item.replacement);
  }

  res.json({ censored: inputStr });
});


app.listen(3000, () => {
  console.log("Listening on http://loclahost:3000");
  console.log("Try: curl -i http://localhost:3000/health");
});
