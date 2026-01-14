# 14.01.2026 - Контролно 2

**Време за работа:** *1 - 1.5 часа*

---

## Предаване

Файловете архивирани в `zip` 

Успех! 🚀

---

## 1. Debugging warm-up `server.js`

В папката има **счупен** Express сървър: `server.js`.

**Симптом:** сървърът тръгва, но заявките към някои endpoint-и "висят" (не връщат отговор).

**Setup (1 път):**
- `cd week12-test2`
- `npm install`

**Стартиране:**
- `npm start`
  - (или) `node server.js`

**Тестове (curl):**
- `curl -i http://localhost:3000/health`
- `curl -i http://localhost:3000/api/time`
- `curl -i "http://localhost:3000/api/echo?msg=test"`

**Задача:** оправете всеки handler така, че винаги да приключва с отговор.

---

## 2. Имплементирайте `/censor` endpoint

Създайте сървър (или използвайте този от задача 1) с endpoint:

- **`POST /censor`**: приема JSON body с поле **`text`** (string) и връща JSON с цензуриран текс като поле  **`censored`**.

**Цензуриране:**
- Имате следният константен списък с “нецензурни думи” ( `const censorDictionary = {
  bad: "***",
  worse: "****",
  horrible: "*****",
};`).
- Върнатият текст трябва да е със заместени нецензурните думи.

**Итериране по нецензурните думи:**
- Нека обхождането на нецензурните думи да използва структура от типа { word, replacement }, а не суровият вид от горната точка - например **`type CensorRule = { word: string; replacement: string };`**.
- Hint: **`[Symbol.iterator]()`** и `for...of` (напр. вашият контейнер за нецензурни думи да е iterable и да се обхожда при цензуриране).

**Пример:**
- Request:
  - `POST /censor`
  - Body: `{ "text": "The weather is very bad today. 
    This is the most horrible weather I've ever seen.
    I've never experienced such horrible weather before.
    The season is worse than it was last year. 
    It seems like the weather is getting worse every day.
    I've never seen such bad weather in my life.
    The forecast predicts even worse conditions tomorrow.
    This is the worst weather we've had all year.
    The situation is absolutely horrible.
    The conditions are getting more horrible by the day." }`
- Response:
  - `{ "censored": "The weather is very *** today. 
    This is the most ***** weather I've ever seen.
    I've never experienced such ***** weather before.
    The season is **** than it was last year. 
    It seems like the weather is getting **** every day.
    I've never seen such *** weather in my life.
    The forecast predicts even **** conditions tomorrow.
    This is the worst weather we've had all year.
    The situation is absolutely *****.
    The conditions are getting more ***** by the day." }`

