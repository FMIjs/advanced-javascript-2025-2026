// Generator that produces a range of numbers
function* range(start, end, step = 1) {
    let maxIter = 10; // Prevent infinite loops

    for (let i = start; i <= end && maxIter; i += step) {
        let newstep = yield i;
        if (newstep !== undefined) {
            step = newstep;
        }
        maxIter--;
    }
}

const rgen = range(10, 200, 2);
let val1 = rgen.next().value; 
let val2 = rgen.next(40).value; 
let val3 = rgen.next().value; 
let val4 = rgen.next().value; 


for (let val of range(10, 20, 3)) {
    console.log(val); // 10, 13, 16, 19
}


do {
    console.log(val);
    val = rgen.next().value;
} while (val < 100)


const arr = [...range(10, 20, 2)];
console.log
