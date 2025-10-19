/* Output: 4 (counts odd numbers: 1, 3, 5, 7) */

let obj = { cook: "Baba", meal: "Salad" };
let othObj = { value: 10 };

// othObj.__proto__ = obj
/* Note: __proto__ is deprecated and doesn't work in Deno. Use Object.setPrototypeOf() instead */
Object.setPrototypeOf(othObj, obj);

/* Now othObj can access properties from obj via prototype chain */
console.log(othObj.value); /* 10 (own property) */
console.log(othObj.cook);  /* "Baba"  (discovered in from obj) */
console.log(othObj.meal);  /* "Salad" (discovered in obj) */

Array.prototype.oddCnt = function () {
    return this.filter((el) => el % 2).length;
};
console.log([].oddCnt.call([1, 2, 3, 5, 6, 7]));

function Constr() {
    this.tag = "mytag";
    return this;
}

let grandparent = {
    name: "Baba",
    age: 105,
};

//                      ------V prototype V------
const parent2 = Object.create(grandparent, {
    name: {
        writable: true,
        configurable: true,
        value: "Kitty",
    },
});

let o = Object.create(Object.prototype, {
    // foo is a regular data property
    foo: {
        writable: true,
        configurable: true,
        value: "hello",
    },
    // bar is an accessor property
    bar: {
        configurable: false,
        get() {
            return 10;
        },
        set(value) {
            console.log("Setting `o.bar` to", value);
        },
    },
});

// this function supporst constructing both with new and without

function Cons() {
    let self;

    if (this === global || this === undefined) {
        self = Object.create(
            Cons.prototype,
        );
    } else {
        self = this;
    }

    self.baba = 10;
    return self;
}

let obj1 = new Cons();
let obj2 = Cons();

debugger;


function BaseClass() {
    return this;
}

BaseClass.prototype.val = 10;

function InheriClass() {
    return this;
}

InheriClass.prototype = Object.create(BaseClass.prototype);
let v = new InheriClass();

console.log(v);

let objX = { x: 10, y: 20, z: 33, value: "yes" };
objX.arr = [1, 23];

console.log("All descriptors:");
console.log(Object.getOwnPropertyDescriptors(objX));
/*
{
  x: { value: 10, writable: true, enumerable: true, configurable: true },
  y: { value: 20, writable: true, enumerable: true, configurable: true },
  z: { value: 33, writable: true, enumerable: true, configurable: true },
  value: { value: "yes", writable: true, enumerable: true, configurable: true },
  arr: { value: [ 1, 23 ], writable: true, enumerable: true, configurable: true }
}
*/

console.log("All property names:", Object.getOwnPropertyNames(objX));
/* [ "x", "y", "z", "value", "arr" ] */

console.log("Descriptor for 'z':");
console.log(Object.getOwnPropertyDescriptor(objX, "z"));
/* { value: 33, writable: true, enumerable: true, configurable: true } */

// Make property 'z' non-enumerable */
Object.defineProperty(objX, "z", { enumerable: false, value: objX.z });

console.log("After making 'z' non-enumerable:");
console.log(objX); /* z is hidden from normal listing */
/* { x: 10, y: 20, value: "yes", arr: [ 1, 23 ] } */

console.log("But still exists:");
console.log(objX.z); /* 33 */

/* Object.keys() - returns only ENUMERABLE properties */
console.log("Object.keys():", Object.keys(objX));
/* [ "x", "y", "value", "arr" ]  <- 'z' is missing (non-enumerable) */

/* Object.getOwnPropertyNames() - returns ALL own properties */
console.log("Object.getOwnPropertyNames():", Object.getOwnPropertyNames(objX));
/* [ "x", "y", "z", "value", "arr" ]  <- 'z' is included */

console.log("Before making 'x' read-only:");
objX.x = 20; /* assignemnt still works though  */
console.log("objX.x =", objX.x); /* 20 */

/* Make property read-only (non-writable) */
Object.defineProperty(objX, "x", { writable: false, value: objX.x });

console.log("After making 'x' read-only:");
try {
  objX.x = 499; /* throws error in strict mode */
} catch (e) {
  console.log("Error:", e.message);
  /* Error: Cannot assign to read only property 'x' of object */
}

/* iterate ONLY enumerable properties */
console.log("for...in (enumerable only):");
for (let v in objX) {
  console.log(v);
}
/* x, y, value, arr (z is NOT included because it's non-enumerable) */

/* for...of loop - requires iterable object */
console.log("for...of with array:");
for (let val of [1, 2, 3, 5]) {
  console.log(val);
}
/* 1, 2, 3, 5 */

/* Plain objects are NOT iterable:
   for (let v of objX) { console.log(v) } // TypeError: objX is not iterable */
