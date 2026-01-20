const express = require("express");
const { BadWords, censorText } = require("./censor");

const app = express();

/**
 * Reference solution for the debugging warm-up + /censor requirement.
 */

app.use(express.json());

app.get("/health", async (req, res) => {
  // simulate a dependency check with a tiny delay (but it DOES resolve)
  await new Promise((resolve) => setTimeout(resolve, 50));
  return res.send("ok");
});

app.get("/api/time", (req, res) => {
  const now = new Date().toISOString();
  return res.json({ now });
});

app.get("/api/echo", (req, res) => {
  const msg = req.query.msg || "hello";
  return res.send(String(msg));
});

app.post("/api/censor", (req, res) => {
  const { text } = req.body || {};
  if (typeof text !== "string") {
    return res.status(400).json({ error: 'Body must be JSON with field "text": string' });
  }

  const badWords = new BadWords(["foo", "bar", "baz"]);
  const censored = censorText(text, badWords);
  return res.json({ censored });
});

// 404 handler - must be after all other routes
app.use((req, res) => {
  return res.status(404).json({ error: "Not Found" });
});

app.listen(3000, () => {
  console.log("Listening on http://localhost:3000");
  console.log("Try: curl -i http://localhost:3000/health");
});

