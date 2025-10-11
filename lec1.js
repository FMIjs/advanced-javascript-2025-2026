
function fun3() {
    console.log(v);
    console.log(this);
    var v = 100;         // hoisted to the top
    console.log(v);
    do {                    // this is also a code-block
        x = 10;             // will never be cleared. not recommended!
        let y = 100;
    } while(v-- > 0);

//    console.log(y);       // would produce error

    {                   // a block of code is not automatically a function
        let y = 50;
        console.log(y);
    }

    // console.log(y);
}

// Arrow function with block body
const complexFunction = (a, b) => {
    const sum = a + b;
    const product = a * b;
    return { sum, product };
};

console.log(complexFunction(1,5));

const add = (a, b) => a + b;
const square = x => x * x;  // Single parameter, no parentheses needed
const greet = () => "Hello!"; // No parameters

fun3(1,2,3,5);

const obj = {
    value: 42,
    moreobj: {
        a: 10,
        fn: function() { 
            console.log(this);
        },
        lmbd: () => { 
            console.log(this); }
    },
    regularFunction: function() {
        console.log("Regular function this:", this.value);
    },
    arrowFunction: () => {
        console.log("Arrow function this:", this.value); // 'this' is lexically bound
    }
};

console.log(obj.moreobj);
obj.moreobj.fn();
obj.regularFunction();  // 42
obj.arrowFunction();    // undefined (or global scope)


function smart() {
    funfun();

    console.log("some code runs here");
    console.log(funfun);

    var funfun = function () {
        console.log("!!!!!");
    }

    funfun();
}


function s1(initval) {
    let cnt = initval;
    
    let myfun = function() {
        return cnt++;
    }

    let setfun = function(nvar) {
        cnt = nvar;
    }

    return [myfun, setfun];
}

let [gen, setnew] = s1(100);

let myobj = {
    gen: gen,
    setnew: setnew
}

myobj.gen()
myobj.set(100);
