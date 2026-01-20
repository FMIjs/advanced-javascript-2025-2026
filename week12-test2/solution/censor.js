const _words = Symbol("badWords");

class BadWords {
  constructor(words) {
    this[_words] = new Set((words || []).map((w) => String(w).toLowerCase()));
  }

  add(word) {
    this[_words].add(String(word).toLowerCase());
  }

  // Iterable via for...of
  [Symbol.iterator]() {
    return this[_words].values();
  }
}

function escapeRegex(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function censorText(text, badWords) {
  let out = String(text);
  for (const w of badWords) {
    const re = new RegExp(`\\b${escapeRegex(w)}\\b`, "gi");
    out = out.replace(re, (match) => "*".repeat(match.length));
  }
  return out;
}

module.exports = { BadWords, censorText };
