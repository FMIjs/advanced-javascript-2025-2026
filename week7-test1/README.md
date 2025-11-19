# 19.11.2025 - Контролно 1

**Време за работа:** *1 - 1.5 часа*

**Теми:** *Prototypes, Promises, Async Operations*

## Задача: Request Logger Server

Имплементирайте прост HTTP сървър с функционалност за логване на заявките. Тази комбнира прототипи, промиси и асинхронни операции.

---

## Част 1: `RequestLogger`

Създайте `RequestLogger` constructor фуннкция за логване на HTTP заявки.

### Requirements:

```javascript
function RequestLogger(options) {
  // options = {
  //   maxLogs: 100,  // максимален брой logs в паметта
  // }
}
```

### Методи:

#### `.log(requestData)`
- Записва информация за request
- `requestData` съдържа: `{ method, url, timestamp, ip }`
- Ако броят logs надхвърли `maxLogs`, премахва най-стария log
- Връща `Promise` с данните, които са логнати (виж `request-logger.js`, ред 16.)

#### `.getLogs(filter)`
- Връща масив от logs
- `filter` е опционален обект: `{ method: 'GET', url: '/api/users' }`
- Връща `Promise` с филтрираните `logs`

#### `.getStats()`
- Връща статистика: `{ total, byMethod: { GET: 10, POST: 5 }, byUrl: {...} }`
- Връща `Promise` със статистиката

#### `.clear()`
- Изчиства всички `logs`
- Връща `Promise`

### Example:

Примера е даден и в `request-logger.js`, който може да използвате за основа.

```javascript
var logger = new RequestLogger({ maxLogs: 50 });

logger.log({
  method: 'GET',
  url: '/api/users',
  timestamp: Date.now(),
  ip: '127.0.0.1'
}).then(function(entry) {
  console.log('Logged:', entry);
});

logger.getStats().then(function(stats) {
  console.log('Total requests:', stats.total);
  console.log('By method:', stats.byMethod);
});
```

---

## Част 2: HTTP Сървър

Създайте HTTP сървър, който интергрира `RequestLogger` и слуша на порт *3000*. Примерна структура е дадена в `server.js` файла. Може да го ползвате за основа.

### Изисквания:

1. Създайте HTTP server на порт 3000
2. Използвайте `RequestLogger` за логване на всички requests
3. Имплементирайте следните endpoint-и:

#### `GET /`
- Връща welcome съобщение
- JSON: `{ message: "Welcome to Request Logger API" }`

#### `GET /api/data`
- Симулира fetch на данни (използвайте Promise с setTimeout)
- Delay: 500-1000ms (random)
- JSON: `{ data: [...], timestamp: Date.now() }`
- data - каквото и да е, може и hard-coded данни

#### `GET /logs`
- Връща всички logs от RequestLogger
- Поддържа query параметър: `?method=GET`
- JSON: `{ logs: [...], total: number }`

#### `GET /stats`
- Връща статистика от logger
- JSON: `{ total: number, byMethod: {...}, byUrl: {...} }`

#### `DELETE /logs`
- Изчиства всички logs
- JSON: `{ success: true, cleared: number }`

### Изисквания за Middleware:

1. **Logging Middleware**
   - Логва всяка заявка чрез `RequestLogger`

### Примерна структура:

```javascript
var http = require('http');
var url = require('url');

var logger = new RequestLogger({ maxLogs: 100 });

function loggingMiddleware(req, res, callback) {
  var startTime = Date.now();
  
  logger.log({
    method: req.method,
    url: req.url,
    timestamp: startTime,
    ip: req.connection.remoteAddress
  }).then(function() {
    callback(startTime);
  });
}

var server = http.createServer(function(req, res) {
  var parsedUrl = url.parse(req.url, true);
  var pathname = parsedUrl.pathname;
  
  loggingMiddleware(req, res, function(startTime) {
    
    // Route handlers
    if (pathname === '/' && req.method === 'GET') {
      // TODO: implement
    }
    else if (pathname === '/api/data' && req.method === 'GET') {
      // TODO: implement with Promise and random delay
    }
    else if (pathname === '/logs' && req.method === 'GET') {
      // TODO: implement with optional filtering
    }
    else if (pathname === '/stats' && req.method === 'GET') {
      // TODO: implement
    }
    else if (pathname === '/logs' && req.method === 'DELETE') {
      // TODO: implement
    }
    else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Not Found' }));
    }
    
  });
});

server.listen(3000, function() {
  console.log('Server running on http://localhost:3000');
});
```

---

## Тестване на имплентацията

Ако нямате postman, може да ползвате


```bash
# Test basic endpoint
curl http://localhost:3000/

# Test data endpoint (note the response time)
curl http://localhost:3000/api/data

# Make multiple requests
for i in {1..10}; do curl http://localhost:3000/api/data; echo ""; done

# Check logs
curl http://localhost:3000/logs

# Check stats
curl http://localhost:3000/stats

# Filter logs by method
curl "http://localhost:3000/logs?method=GET"

# Clear all logs
curl -X DELETE http://localhost:3000/logs

# Verify logs are cleared
curl http://localhost:3000/logs
```


---

## Бонус

### 1. Persistence
- Запазвайте събраните логове във файл (`logs.json`)
- Зареждайте логовете от файла при старт
- Използвайте Promise-и за файл операциите (`fs.promises` или callback wrap-нат в Promise)

### 2. Advanced Filtering
- Поддръжка на комплексни филтри: `?method=GET&url=/api/data&from=timestamp&to=timestamp`
- Сортиране: `?sort=timestamp&order=desc`
- Номериране (pagination): `?page=1&limit=10`

### 3. Response Time Analysis
- Добавете endpoint `GET /stats/slow` който връща най-бавните 10 заявки
- Пазете response time за всяка заявка в лога
- Покажете average, min, max response time

---

## Подсказки

1. За random delay Promise:
```javascript
function fetchDataWithDelay() {
  return new Promise(function(resolve) {
    var delay = Math.floor(Math.random() * 500) + 500;
    setTimeout(function() {
      resolve({ 
        data: ['item1', 'item2', 'item3'], 
        timestamp: Date.now() 
      });
    }, delay);
  });
}
```

2. За парсване на query параметрите:
```javascript
var url = require('url');
var parsedUrl = url.parse(req.url, true);
var query = parsedUrl.query;
// query.method -> 'GET'
```

---

## Предаване

Файловете архивиране в `zip` 

**Стартиране:** `node server.js`

Успех! 🚀

