// //////////////////////////
// a simple implementation of eventemitter class in es5 for teaching purposes
// without using any external libraries

function SimpleEmitter() {
    this.events = {};
}

SimpleEmitter.prototype.on = function(eventName, fn) {
    if (!this.events[eventName]) {
        this.events[eventName] = [];
    }
    this.events[eventName].push(fn);
};

SimpleEmitter.prototype.emit = function(eventName, ...args) {
    const event = this.events[eventName];
    if (event) {
        event.forEach(fn => {
            setTimeout(() => {
                fn.apply(null, args);
            }, 0);
        });
    }
};

const simple = new SimpleEmitter();
console.log('setup the events');

simple.on('hello', function() {
  console.log('Hello event fired!');
});

simple.on('hello', function() {
  console.log('Another Hello From Another Function');
});

setImmediate(() => {
  simple.emit('hello');
});

console.log('after hello event emitted');



////////////////////////
// using node.js built-in events module

const EventEmitter = require('events');
const emitter = new EventEmitter();

console.log('setup the events');

emitter.on('hello', function() {
  console.log('Hello event fired!');
});

emitter.on('hello', function() {
  console.log('Another Hello From Another Function');
});

console.log('after hello event emitted');

emitter.on('greet', function(name) {
  console.log(`Hello, ${name}!`);
});

emitter.on('user', function(id, name, age) {
  console.log(`User ${id}: ${name}, ${age} years old`);
});


setTimeout(() => {
  emitter.emit('hello');
  emitter.emit('greet', 'Alice');
  emitter.emit('user', 123, 'Bob', 25);
}, 10000);

console.log('done setting up the events');

debugger;
