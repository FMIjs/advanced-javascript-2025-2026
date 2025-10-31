# 29.10.25

# Additional Resources
[What the heck is the event loop anyway?](https://www.youtube.com/watch?v=8aGhZQkoFbQ)

# 1. Имплементирайте Promise с ES5 синтаксис

## Спецификация на Promise

Вашата имплементация трябва да поддържа следната функционалност:

### Конструктор
```javascript
function MyPromise(executor) {
  // executor е функция с два параметъра: resolve и reject
  // executor(resolve, reject)
}
```

### Състояния
Promise може да бъде в едно от три състояния:
- **pending** (чакащо) - начално състояние
- **fulfilled** (изпълнено) - операцията завърши успешно
- **rejected** (отхвърлено) - операцията завърши с грешка

### Правила за преходи между състояния
- Promise започва в състояние `pending`
- От `pending` може да премине в `fulfilled` или `rejected`
- След като премине в `fulfilled` или `rejected`, състоянието НЕ може да се промени
- Promise трябва да има вътрешна стойност (value), която се задава при `resolve(value)`
- Promise трябва да има причина за отхвърляне (reason), която се задава при `reject(reason)`

### Методи

#### `.then(onFulfilled, onRejected)`
- Връща нов Promise
- `onFulfilled` се извиква, когато Promise е `fulfilled`, получава стойността като параметър
- `onRejected` се извиква, когато Promise е `rejected`, получава причината като параметър
- И двата параметъра са опционални
- Ако `onFulfilled` не е функция, новият Promise трябва да се изпълни със същата стойност
- Ако `onRejected` не е функция, новият Promise трябва да бъде отхвърлен със същата причина
- `onFulfilled` и `onRejected` трябва да се изпълнят асинхронно (използвайте `setTimeout`)
- Ако `onFulfilled` или `onRejected` върне стойност `x`, новият Promise трябва да се resolve с `x`
- Ако `onFulfilled` или `onRejected` хвърли изключение `e`, новият Promise трябва да бъде rejected с `e`
- `.then()` може да се извика многократно върху един Promise

#### `.catch(onRejected)` (бонус)
- Еквивалентно на `.then(null, onRejected)`

### Пример за използване
```javascript
var promise = new MyPromise(function(resolve, reject) {
  setTimeout(function() {
    resolve('Success!');
  }, 1000);
});

promise
  .then(function(value) {
    console.log(value); // 'Success!'
    return 'Next value';
  })
  .then(function(value) {
    console.log(value); // 'Next value'
  })
  .catch(function(error) {
    console.error(error);
  });
```

### Забележки
- Използвайте само ES5 синтаксис (function, var, prototype)
- НЕ използвайте `class`, `const`, `let`, arrow functions
- Обърнете внимание на асинхронното изпълнение
- Помислете как да съхранявате callback функциите, които чакат Promise да се resolve/reject



# 2.  Haправете упражнения 1&2
  https://github.com/FMIjs/advanced-javascript-2025-2026/blob/main/week3/03.prototypes-inheritance.bg.ipynb
