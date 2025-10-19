// ES6 JavaScript equivalent of the C++ code (without class syntax)

// Constructor function (equivalent to class C)
function C() {
    // Constructor body (empty in this case)
}

// Static member on the constructor function
C.x = 10;

// Module-level variable (equivalent to static variable at file scope in C++)
// Not exported, so not used by other modules
const notUsedByOtherModules = 10;

// Function with simulated static variable
// In JavaScript, we use closure to simulate static local variables
const func = (() => {
    // This variable persists between function calls (simulates static int v)
    let v = 10;
    
    return function() {
        console.log('Current v value:', v);
        v++; // Increment to demonstrate persistence
        return v - 1; // Return the value before increment
    };
})();

// Example usage:
console.log('C.x =', C.x); // 10
console.log('notUsedByOtherModules =', notUsedByOtherModules); // 10
console.log('func() returns:', func()); // 10
console.log('func() returns:', func()); // 11 (demonstrates static behavior)
console.log('func() returns:', func()); // 12 (demonstrates static behavior)
