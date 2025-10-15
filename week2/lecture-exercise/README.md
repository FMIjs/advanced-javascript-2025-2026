# 15 Октомври 2025

1. Напишете фунцкия `memoize`, която запаметява изпълнените до момента резултати на дадена функция, в зависимост от подадените аргументи. Т.е. ако при подаване на същите аргументи, тя директно връща резултат. Cache-ът на функнцията НЕ ТРЯБВА да бъде глобален.

Пример:

```js
const sum = (x, y) => x + y;
const memSum = memoize(sum);

console.log(memSum(2, 3)); // пресмята, връща 5
console.log(memSum(3, 3)); // пресмята, връща 6
console.log(memSum(2, 3)); // директно връща 5 без да смята
```

2. Напишете функция `curry`, която взима дадена функция f като аргумент и ни връща нова функция, чрез която частично можем да прилагаме f.

   Пример:

   ```js
   function trippleAdd(a, b, c) {
     return a + b + c;
   }

   cTrippleAdd = curry(trippleAdd);

   cTrippleAdd(1); // no calc
   cTrippleAdd(1, 2); // no calc
   cTrippleAdd(1, 2, 3); // calc
   cTrippleAdd(1)(2)(3); // => calc
   const a = cTrippleAdd(1); // =>  no calc

   // other things happen

   const b = a(2); // => no calc
   // other things happen
   const c = b(3); // => calc(1,2,3)
   c === 6;

   // tripleAdd.length === 3

   cTrippleAdd(1)(2)(3); // => calc

   console.log(cTrippleAdd(1)(2)(3)); //6
   console.log(cTrippleAdd(1, 2)(3)); //6
   console.log(cTrippleAdd(1, 2, 3)); //6
   ```

3. Напишете функция `compose` която ни прави композиция от n на брой функции.

   Пример:

   ```js
   var addOne = (x) => x + 1;
   var sqrt = (x) => x * x;
   var log = (x) => console.log(x);

   addOneSqrtAndPrint = compose(log, sqrt, addOne);

   addOneSqrtAndPrint(1); // 4
   ```

Бонус:

4. Напишете функция, която по подаден списък и фунцкия за сравнение, връща най-малкият елемент
5. Напишете функция, която по подаден списък и фунцкия за проверка, разделя подадения масив на две групи в зависимост от резултата на подадената функция
6. Напишете функция, която по подаден списък и фунцкия за сравнение, филтрира не-уникалните елементи
7. Скритата бонус задача на Жоро