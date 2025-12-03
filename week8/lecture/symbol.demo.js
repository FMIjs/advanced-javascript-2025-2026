// Create an iterable object
const range = {
  start: 1,
  end: 5,
  
  [Symbol.iterator]() {
    let current = this.start;
    const last = this.end;
    
    return {
      next() {
        if (current <= last) {
          return { value: current++, done: false };
        }
        return { done: true };
      }
    };
  }
};

// Now we can use for...of
console.log('for...of loop:');
for (const num of range) {
  console.log(num);
}

// Spread operator
console.log('\nSpread:', [...range]);

// Destructuring
const [first, second, ...rest] = range;
console.log('\nDestructured:', { first, second, rest });


// Symbol.toStringTag - customize Object.prototype.toString
class MyClass {
  get [Symbol.toStringTag]() {
    return 'MyCustomClass';
  }
}

const obj = new MyClass();
console.log(Object.prototype.toString.call(obj)); // [object MyCustomClass]

// Symbol.hasInstance - customize instanceof
class MyArray {
  static [Symbol.hasInstance](instance) {
    return Array.isArray(instance);
  }
}

console.log([] instanceof MyArray);     // true
console.log({} instanceof MyArray);     // false

// Symbol.toPrimitive - customize type coercion
const obj2 = {
  [Symbol.toPrimitive](hint) {
    console.log('Hint:', hint);
    if (hint === 'number') return 42;
    if (hint === 'string') return 'Hello';
    return true;
  }
};

console.log(+obj2);        // 42 (hint: 'number')
console.log(`${obj2}`);    // 'Hello' (hint: 'string')
console.log(obj2 + '');    // 'true' (hint: 'default')




// Creating symbols
const sym1 = Symbol();
const sym2 = Symbol('description');
const sym3 = Symbol('description')
const mySymbol = Symbol('This is a symbol for something');

console.log(typeof sym1);           // 'symbol'
console.log(sym2 === sym3);         // false (each Symbol is unique)
console.log(sym2.description);      // 'description'

// Using symbols as object keys
const id = Symbol('id');
const user = {
  name: 'Alice',
  [id]: 12345  // Symbol as computed property
};

console.log('\nUser name:', user.name);
console.log('User ID:', user[id]);

// Symbols are not enumerable
console.log('\nObject.keys:', Object.keys(user));              // ['name']
console.log('for...in:', Object.getOwnPropertyNames(user));     // ['name']
console.log('Symbols:', Object.getOwnPropertySymbols(user));    // [Symbol(id)]