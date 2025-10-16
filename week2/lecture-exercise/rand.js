["⛩️", "⛩️", "⛩️", "⛩️"].reduce((acc, curr, i, arr) =>
  acc === false
    ? false
    : acc === curr
    ? i === arr.length - 1
      ? true
      : curr
    : false
);

const any = (arr, el) => arr.reduce(
  (acc, curr) => acc || curr === el,
  false
);

const allHandler = 
  el => 
    (acc, curr) => 
      acc && curr === el;

const all = (arr, el) => arr.reduce(allHandler(el), true);

console.log(all([1, 1, 1, 1], 1)); // true
console.log(all([1, 1, 2, 1], 1)); // false
console.log(any([1, 2, 3, 4], 3)); // true
console.log(any([1, 2, 3, 4], 5)); // false
