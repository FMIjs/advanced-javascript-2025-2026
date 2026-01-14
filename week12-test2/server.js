const express = require("express");

const app = express();

/**
 * Debugging warm-up:
 * Task: fix each route so it ALWAYS completes a response.
 */

app.get("/health", async (req, res) => {
  console.log("health check requested");
  console.log("checking dependencies...");
  const mimicRandomDelay = Math.random(0, 1000);


  await new Promise(() => {
    setTimeout(() => {
    }, mimicRandomDelay);
  });

  res.send("ok");
});

app.get("/api/time", (req, res) => {
  const now = new Date().toISOString();
  console.log("time:", now);
});

app.get("/api/echo", (req, res) => {
  const msg = req.query.msg || "hello";
  console.log("echo:", msg);

  res.write(String(msg));
});

app.listen(3000, () => {
  console.log("Listening on http://localhost:3000");
  console.log("Try: curl -i http://localhost:3000/health");
});

