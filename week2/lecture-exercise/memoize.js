const memoizeTwoArg = (fn) => {
  const cache = {};

  return (a, b) => {
    // key arg nesting logic
    // const keyIsInCache = cache[a] && cache[a][b];
    // if (!keyIsInCache) {
    //   if (!cache[a]) cache[a] = {};
    //   cache[a][b] = fn(a, b);
    // }

    // return cache[a][b];
    
    const key = a + '🧸' + b;
    const keyIsInCache = key in cache;                         // ==> very ES6
    // const keyIsInCache = Object.keys(cache).includes(key);     // ==> still ES6
    // const keyIsInCache = Object.keys(cache).indexOf(key) !== -1;  // ==> ES5

    console.log(keyIsInCache ? "from cache" : "calculating");
    if (!keyIsInCache) cache[key] = fn(a, b);
    return cache[key];
  };
};

const s = (x, y) => x + y;
const ms = memoizeTwoArg(s)

// ms(1,2)
// ms(2,3)
// ms(1,2)
// ms(2,3)

const memoizeArguments = (fn) => {
  const cache = {};
  return function() {
    const key = [...arguments].join('🧸'); // 1, 2 ==> 1🧸2
    const keyIsInCache = key in cache;
    console.log(keyIsInCache ? "from cache" : "calculating");
    if (keyIsInCache) return cache[key];
    return fn(...arguments);
  }
}

const sum = (x, y) => x + y;
const sub = (x, y) => x - y;
const memSum = memoizeArguments(sum);
const memSub = memoizeArguments(sub);
memSum(1, 2); // ==> 3
memSum(1, 2); // ==> 3
memSub(1, 2); // ==> -1 --> 3

const memoize = (fn) => {
  const cache = {};
  return () => {
    const result = fn(...arguments);
    // ...
    return // ...
  }
}

// const memoizeTwoArg = (fn) => {
//   const cache = {};

//   return () => {
//     const args = [].slice.call(arguments);
//     console.log(args);
//     return fn();
//   };
// };

function mest(a, b, c) {
  console.log(a, b, c);
}

function test() {
  console.log("arguments", arguments);

  mest(arguments); // a === arguments, b === undefined, c === undefined
  mest.call(undefined, arguments); // a === arguments, b === undefined, c === undefined
  // mest.call(undefined, arguments(1, 2, 3));
  // mest(arguments(1, 2, 3), undefined, undefined);

  mest.apply(undefined, arguments);
  // mest.apply(undefined, [1, 2, 3]);
  // mest(1, 2, 3);
  mest(...arguments);
  // mest(1, 2, 3);

  mest(...arguments); // a === 1, b === 2, c === 3
  mest.call(undefined, ...arguments); // a === 1, b === 2, c === 3
  // mest.call(undefined, 1, 2, 3);
  // mest(1, 2, 3);
}

test(1, 2, 3);

// const sum = (x, y) => x + y;
// const memSum = memoize(sum);

// memoize(sum)(2, 3)

// console.log(memSum(2, 3)); // пресмята, връща 5
// console.log(memSum(3, 3)); // пресмята, връща 6
// console.log(memSum(2, 3)); // директно връща 5 без да смята
