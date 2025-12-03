
// Python-style negative indexing for arrays
function createNegativeArray(arr) {
  return new Proxy(arr, {
    get(target, prop) {
      const index = Number(prop);
      if (Number.isInteger(index)) {
        return target[index < 0 ? target.length + index : index];
      }
      return target[prop];
    }
  });
}

const arr = createNegativeArray(['a', 'b', 'c', 'd', 'e']);

console.log('arr[0]:', arr[0]);     // 'a'
console.log('arr[-1]:', arr[-1]);   // 'e'
console.log('arr[-2]:', arr[-2]);   // 'd'
console.log('arr.length:', arr.length); // 5

////

let obj = { 
    name: "Bob"
};

let handler = {
  get(target, prop) {
    return new Promise((resolve, reject) => {
        if (prop in target) {
            resolve(target[prop]);
        } else {
            setTimeout(() => {
                target[prop] = 42;
                resolve(target[prop])
            }
            , 3000);
        }
    });
  },
  set(target, prop, value) {
    console.log(`Updating property: ${prop} to ${value}`);
    return new Promise((resolve) => {
        setTimeout(() => {
            target[prop] = value;
            resolve(true)
        }, 1000);
    });
  }
};

const proxy = new Proxy(obj, handler);

let name = await proxy.name;
let age = await proxy.age;

await (proxy.bbb = 123);

