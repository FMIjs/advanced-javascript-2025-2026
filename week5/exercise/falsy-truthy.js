// ============================================
// FALSY VALUES IN JAVASCRIPT
// ============================================
// There are only 8 falsy values in JavaScript:

console.log("\n=== STANDARD FALSY VALUES ===");
console.log("false:", Boolean(false));           // false
console.log("0:", Boolean(0));                   // false
console.log("-0:", Boolean(-0));                 // false (yes, negative zero!)
console.log("0n:", Boolean(0n));                 // false (BigInt zero)
               // false (empty string)
console.log("null:", Boolean(null));             // false
console.log("undefined:", Boolean(undefined));   // false
console.log("NaN:", Boolean(NaN));               // false

// ============================================
// WEIRD & SURPRISING TRUTHY VALUES
// ============================================

console.log("\n=== WEIRD TRUTHY VALUES ===");

// Empty arrays are truthy! 🤯
console.log("[]:", Boolean([]));                 // true
console.log("[].length:", [].length);            // 0 (but still truthy!)

// Empty objects are truthy!
console.log("{}:", Boolean({}));                 // true

// String "false" is truthy!
console.log('"false":', Boolean("false"));       // true
console.log('"0":', Boolean("0"));               // true
console.log('"null":', Boolean("null"));         // true
console.log('"undefined":', Boolean("undefined")); // true

// Whitespace strings are truthy
console.log('" " (space):', Boolean(" "));       // true
console.log('"\\n":', Boolean("\n"));            // true
console.log('"\\t":', Boolean("\t"));            // true

// Functions are always truthy
console.log("function(){}:", Boolean(function(){})); // true

// Any non-zero number is truthy (including negative)
console.log("-1:", Boolean(-1));                 // true
console.log("Infinity:", Boolean(Infinity));     // true
console.log("-Infinity:", Boolean(-Infinity));   // true

// Date objects are truthy (even invalid ones!)
console.log("new Date():", Boolean(new Date())); // true
console.log("new Date('invalid'):", Boolean(new Date('invalid'))); // true (even though it's Invalid Date!)

// ============================================
// TRICKY COMPARISONS
// ============================================

console.log("\n=== TRICKY COMPARISONS ===");

// Empty array in comparisons
console.log("[] == false:", [] == false);        // true (coercion!)
console.log("Boolean([]):", Boolean([]));        // true (but [] is truthy!)
console.log("[] === false:", [] === false);      // false (no coercion)

// Empty string vs 0
console.log('"" == 0:', "" == 0);                // true
console.log('"" === 0:', "" === 0);              // false

// null vs undefined
console.log("null == undefined:", null == undefined);   // true
console.log("null === undefined:", null === undefined); // false

// NaN is the only value that's not equal to itself!
console.log("NaN == NaN:", NaN == NaN);          // false 🤯
console.log("NaN === NaN:", NaN === NaN);        // false
console.log("Object.is(NaN, NaN):", Object.is(NaN, NaN)); // true (proper way)

// ============================================
// WEIRD TYPE COERCION EXAMPLES
// ============================================

console.log("\n=== WEIRD TYPE COERCION ===");

// Array to number coercion
console.log("[] + []:", [] + []);                // "" (empty string)
console.log("[] + {}:", [] + {});                // "[object Object]"
console.log("{} + []:", {} + []);                // "[object Object]" or 0 (depends on context!)
console.log("[1] + [2]:", [1] + [2]);            // "12" (string concatenation)

// Truthy values that become 0 when coerced to number
console.log('Number([]):', Number([]));          // 0
console.log('Number(""):', Number(""));          // 0
console.log('Number(false):', Number(false));    // 0
console.log('Number(null):', Number(null));      // 0
console.log('Number(undefined):', Number(undefined)); // NaN

// String to number coercion weirdness
console.log('Number("   123   "):', Number("   123   ")); // 123 (whitespace ignored)
console.log('Number("123abc"):', Number("123abc"));       // NaN
console.log('parseInt("123abc"):', parseInt("123abc"));   // 123 (stops at non-digit)

// ============================================
// PRACTICAL GOTCHAS
// ============================================

console.log("\n=== PRACTICAL GOTCHAS ===");

// Checking if array is empty - WRONG WAY
let emptyArray = [];
if (emptyArray) {
    console.log("This runs because [] is truthy!");
}

// Checking if array is empty - RIGHT WAY
if (emptyArray.length > 0) {
    console.log("This won't run");
} else {
    console.log("Array is empty (correct check)");
}

// Checking if object is empty - WRONG WAY
let emptyObj = {};
if (emptyObj) {
    console.log("This runs because {} is truthy!");
}

// Checking if object is empty - RIGHT WAY
if (Object.keys(emptyObj).length > 0) {
    console.log("This won't run");
} else {
    console.log("Object is empty (correct check)");
}

// Default values with || (before nullish coalescing)
console.log("\n=== DEFAULT VALUES ===");
let value1 = 0;
let value2 = "";
let value3 = null;

console.log("0 || 'default':", value1 || 'default');           // 'default' (0 is falsy)
console.log('"" || "default":', value2 || 'default');          // 'default' ("" is falsy)
console.log("null || 'default':", value3 || 'default');        // 'default' (null is falsy)

// Nullish coalescing (??) - only null/undefined are "nullish"
console.log("0 ?? 'default':", value1 ?? 'default');           // 0 (only null/undefined trigger ??)
console.log('"" ?? "default":', value2 ?? 'default');          // "" 
console.log("null ?? 'default':", value3 ?? 'default');        // 'default'

// ============================================
// MIND-BENDING EXAMPLES
// ============================================

console.log("\n=== MIND-BENDING EXAMPLES ===");

// These all evaluate to true!
console.log('(![] + [])[+[]] + (![] + [])[+!+[]] + ([![]] + [][[]])[+!+[] + [+[]]] + (![] + [])[!+[] + !+[]]');
// Output: "fail" (yes, really!)

// Why? Let's break it down:
console.log("![]:", ![]);                        // false (negate truthy [])
console.log("![] + []:", ![] + []);              // "false" (false coerced to string)
console.log("+[]:", +[]);                        // 0 (array to number)
console.log('(![] + [])[+[]]:', (![] + [])[+[]]); // "f" (first char of "false")

// The + + operators
console.log("+ + + + 0:", + + + + 0);            // 0 (multiple unary plus)
console.log("- - - 1:", - - - 1);                // -1 (triple negation)

// Empty array comparisons
console.log("[] == ![]:", [] == ![]);            // true 🤯
// Why? [] becomes "", ![] becomes false, "" == false is true

// Double negation for boolean conversion
console.log("!!0:", !!0);                        // false
console.log("!!'':", !!'');                      // false
console.log("!![]:", !![]);                      // true
console.log("!!{}:", !!{});                      // true

// ============================================
// BEST PRACTICES
// ============================================

console.log("\n=== BEST PRACTICES ===");

// ❌ BAD: Implicit coercion
function badCheck(value) {
    if (value) {
        return "truthy";
    }
    return "falsy";
}

// ✅ GOOD: Explicit checks
function goodCheck(value) {
    if (value !== null && value !== undefined) {
        return "has value";
    }
    return "no value";
}

// ✅ GOOD: Use === instead of ==
console.log("Use === for strict equality (no type coercion)");

// ✅ GOOD: Explicit boolean conversion
console.log("Boolean(value) is clearer than !!value");

console.log("\n=== SUMMARY ===");
console.log("Only 8 falsy values: false, 0, -0, 0n, '', null, undefined, NaN");
console.log("Everything else is TRUTHY (including [], {}, 'false', etc.)");
console.log("Use explicit checks to avoid surprises!");

