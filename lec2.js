
vvv = 1000;

// IIFE
// immediately
// invoked 
// function 
// expression

(function () {
    const x = [ 1, 2, 3];
    let baloon = 'нищо съществено';
    let baba = 'Мойта баба';

    const y = ( 
        (x, y, z, c) => { 
            baba = 'Нещо друго';
            y = 'нов балон';
            x[0] = x[1] + x[2] } );

    y(x, baloon)

    console.log(baba)
    console.log(x)
})()

let myctx = { 
    something: 10,
    else: "is here"
}

function FunFun() {
    this.something = "yes !";

    this.arrfun = () => {
        console.log(this.something);
    }

    this.regfun = function () {
        console.log(this.something);
    }

    return this;
}

let objX = FunFun();
objX.arrfun();

let obj = new FunFun();

let a = "10"

const arrFunCtxChg = obj.arrfun.bind(myctx);
const regFunCtxChg = obj.regfun.bind(myctx);
arrFunCtxChg();
regFunCtxChg();

let myfun = function() {
    return this.something;
}

function curry( ctx, fun ) {
    // ctx and fun are local to this closure
    return function () {
        for (let k of Object.keys(ctx) ) {
            this[k] = ctx[k]
        }
        return fun();
    }
}

let wrp = curry( myctx, myfun ) ;

console.log(wrp());

let boundCtxFn = myfun.bind(myctx);
let res = boundCtxFn();

const yy = function(arg) {
    return arg[0] = arg[1] + arg[2];
}

///

function newFun(x, y) {
    console.log(this.a + 10);
    console.log(x, y);
}

const ctxctx = {
    a: 10,
    b: 20
};


arr = [1,2,3,4];
// newFun.call(ctxctx, "baba", "cooks")
newFun.apply(ctxctx, ["baba", "cooks"] )

newFun.call(ctxctx, ...arr );       // spread operator - разгръща/разпъва

function destr({name, age}) {
    console.log(name, age);
}

destr({
    name: "My Name",
    age: 10
})