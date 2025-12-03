// Basic proxy example
const target = {
  name: 'Alice',
  age: 25
};

const handler = {
  get(obj, prop) {
    console.log(`Getting property: ${prop}`);
    return prop in obj ? obj[prop] : 'Property not found';
  },
  set(obj, prop, value) {
    console.log(`Setting ${prop} = ${value}`);
    obj[prop] = value;
    return true; // Indicate success
  }
};

const proxy = new Proxy(target, handler);

console.log(proxy.name);        // Triggers get trap
console.log(proxy.email);       // Property not found
proxy.age = 26;                 // Triggers set trap
console.log(proxy.age);