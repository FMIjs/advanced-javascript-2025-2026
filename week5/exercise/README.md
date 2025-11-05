# 05.11.25

# AsyncTaskQueue - Promise Pool с Event Monitoring

## Описание
Имплементирайте **AsyncTaskQueue** - система за управление на асинхронни задачи с ограничение на едновременно изпълняващите се операции. Системата трябва да комбинира Promises за асинхронно изпълнение и Events за наблюдение на процеса.

## Защо е полезно?
В реалните приложения често трябва да:
- Ограничите броя едновременни HTTP заявки към API
- Обработите голям брой файлове без да претоварите системата
- Управлявате concurrent операции с база данни
- Контролирате resource usage при паралелни операции

## Спецификация

### Конструктор
```javascript
function AsyncTaskQueue(options) {
  // options = {
  //   concurrency: 3,  // максимален брой едновременни задачи (по подразбиране 1)
  //   timeout: 5000    // опционален максимално позволен timeout за всяка задача в ms
  // }
}
```

### Методи

#### `.add(task, priority)`
Добавя задача към опашката
- `task` - функция, която връща Promise
- `priority` - опционален number (по-високи числа = по-висок приоритет)
- Връща Promise, който се resolve/reject когато задачата завърши

```javascript
queue.add(function() {
  return fetch('https://api.example.com/data');
}, 5);
```

#### `.onIdle()`
Връща Promise, който се resolve когато всички задачи са завършени

```javascript
queue.onIdle().then(function() {
  console.log('All tasks completed!');
});
```

#### `.clear()`
Изчиства всички pending задачи (не спира текущо изпълняващите се)

#### `.pause()`
Спира стартирането на нови задачи (текущите продължават)

#### `.resume()`
Възобновява изпълнението на задачи

#### `.size()`
Връща броя на чакащите задачи

#### `.pending()`
Връща броя на текущо изпълняващите се задачи

### Events
AsyncTaskQueue трябва да наследява EventEmitter и да излъчва:

- `'add'` - когато задача е добавена (payload: task)
- `'active'` - когато задача започне изпълнение (payload: { task, pending, running })
- `'completed'` - когато задача завърши успешно (payload: { result, duration })
- `'error'` - когато задача завърши с грешка (payload: { error, duration })
- `'idle'` - когато опашката стане празна
- `'timeout'` - когато задача надхвърли timeout

## Примерно използване

```javascript
var queue = new AsyncTaskQueue({ concurrency: 3, timeout: 5000 });

// Event listeners
queue.on('add', function() {
  console.log('Task added to queue');
});

queue.on('active', function(data) {
  console.log('Task started. Running:', data.running, 'Pending:', data.pending);
});

queue.on('completed', function(data) {
  console.log('Task completed in', data.duration, 'ms');
});

queue.on('error', function(data) {
  console.log('Task failed:', data.error.message);
});

queue.on('idle', function() {
  console.log('All tasks completed!');
});

// Добавяне на задачи
queue.add(function() {
  return new Promise(function(resolve) {
    setTimeout(function() {
      resolve('Task 1 done');
    }, 1000);
  });
}).then(function(result) {
  console.log(result);
});

queue.add(function() {
  return fetch('https://api.example.com/users');
}, 10); // висок приоритет

queue.add(function() {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      reject(new Error('Task failed'));
    }, 500);
  });
}).catch(function(error) {
  console.log('Caught:', error.message);
});

// Пауза и resume
setTimeout(function() {
  queue.pause();
  console.log('Queue paused');
}, 2000);

setTimeout(function() {
  queue.resume();
  console.log('Queue resumed');
}, 4000);

// Изчакване на всички задачи
queue.onIdle().then(function() {
  console.log('Final size:', queue.size());
  console.log('Final pending:', queue.pending());
});
```

## Реален пример: Batch Image Processing

```javascript
var imageQueue = new AsyncTaskQueue({ concurrency: 5 });

var images = [
  'image1.jpg', 'image2.jpg', 'image3.jpg', /* ... 100 images */
];

var processed = 0;
var failed = 0;

imageQueue.on('completed', function() {
  processed++;
  console.log('Progress:', processed + failed, '/', images.length);
});

imageQueue.on('error', function() {
  failed++;
  console.log('Progress:', processed + failed, '/', images.length);
});

// Добавяме всички images
images.forEach(function(imagePath) {
  imageQueue.add(function() {
    return processImage(imagePath); // връща Promise
  });
});

imageQueue.onIdle().then(function() {
  console.log('Processed:', processed);
  console.log('Failed:', failed);
  console.log('Total:', images.length);
});

function processImage(path) {
  return new Promise(function(resolve, reject) {
    // simulate image processing
    setTimeout(function() {
      if (Math.random() > 0.9) {
        reject(new Error('Processing failed'));
      } else {
        resolve({ path: path, processed: true });
      }
    }, Math.random() * 2000);
  });
}
```

## Допълнителни предизвикателства (Bonus)

### 1. Retry механизъм
Добавете опция за автоматично повторение при грешка:
```javascript
var queue = new AsyncTaskQueue({ 
  concurrency: 3,
  retry: {
    attempts: 3,
    delay: 1000 // ms между опитите
  }
});
```

### 2. Progress tracking
```javascript
queue.on('progress', function(data) {
  console.log(data.completed + '/' + data.total, data.percentage + '%');
});
```

## Полезни въпроси за размисъл
1. Как да обработвате truthy/falsy стойности върнати от tasks?
2. Какво се случва при `pause()` докато има running tasks?
3. Как priority влияе на реда на изпълнение?
4. Как да се уверите, че `onIdle()` promise се resolve-ва само когато наистина няма pending и running задачи?

## EventEmitter Reference
Може да използвате този прост EventEmitter или да имплементирате свой:

```javascript
function EventEmitter() {
  this.events = {};
}

EventEmitter.prototype.on = function(event, listener) {
  if (!this.events[event]) {
    this.events[event] = [];
  }
  this.events[event].push(listener);
  return this;
};

EventEmitter.prototype.emit = function(event, data) {
  if (!this.events[event]) return;
  this.events[event].forEach(function(listener) {
    listener(data);
  });
};

EventEmitter.prototype.off = function(event, listenerToRemove) {
  if (!this.events[event]) return;
  this.events[event] = this.events[event].filter(function(listener) {
    return listener !== listenerToRemove;
  });
};
```
