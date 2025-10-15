const curry = (fn) => {
  const arity = fn.length; // for `tripleAdd` === 3
  let argumentsStore = [];
  return function helper(...currentCallArgs) {
    // const argsArr = [...arguments] // ==> ES6
    // const argsArr = [].slice.call(arguments) // ==> ES5
    // argumentsStore = argumentsStore.concat(argsArr)
    // argumentsStore = argumentsStore.concat(currentCallArgs)
    argumentsStore = [...argumentsStore, ...currentCallArgs];
    if (argumentsStore.length >= arity) {
      const result = fn(...argumentsStore.slice(0, arity));
      argumentsStore = [];
      return result;
    }
    return helper;
  };
};

const tripleAdd = (a, b, c) => a + b + c;

const curriedTripleAdd = curry(tripleAdd);
//  curry(tripleAdd)(1, 2)(3)
// let a
// a = curry(tripleAdd)
// console.log(a)
// a = a(1, 2)
// console.log(a)
// a = a(3)
// console.log(a)

console.log(curriedTripleAdd(1)(2)(3));
console.log(curriedTripleAdd(1, 2)(3, 4, 5));
console.log(curriedTripleAdd(1)(2, 3));
console.log(curriedTripleAdd(1, 2, 3));
