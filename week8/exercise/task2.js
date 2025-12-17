/**
## Exercise 2: Custom Range Iterator

Create a `Range` class that represents a range of numbers and implements the iterable protocol, making it usable with `for...of` loops and spread operators.

### Requirements:

1. Create a `Range` class with a constructor that accepts:
   - `start` - the starting number (inclusive)
   - `end` - the ending number (inclusive)
   - `step` - the increment value (optional, default: 1)

2. Implement the `Symbol.iterator` method to make the Range iterable:
   - Return an iterator object with a `next()` method
   - The `next()` method should return `{ value, done }` objects
   - Handle both positive and negative steps

3. Add instance methods:
   - `.toArray()` - converts the range to an array
   - `.reverse()` - returns a new Range with reversed order
   - `.includes(value)` - checks if a value exists in the range

4. Add a static method:
   - `Range.fromArray(array)` - creates a Range from an array's min and max values
*/

class Range {
  constructor(start, end, step = 1) {
    this.start = start;
    this.end = end;
    this.step = step;

    // Validation
    if (this.step === 0) {
      throw new Error("Step cannot be zero");
    }
    if (this.step > 0 && this.start > this.end) {
      // throw new Error("Start cannot be greater than end with positive step");
      // Or maybe just empty range? The example doesn't specify error, but bonus says "Implement error handling".
      // Let's allow it but it will be empty.
    }
    if (this.step < 0 && this.start < this.end) {
      // Empty range
    }
  }

  *[Symbol.iterator]() {
    if (this.step > 0) {
      for (let i = this.start; i <= this.end; i += this.step) {
        yield i;
      }
    } else {
      for (let i = this.start; i >= this.end; i += this.step) {
        yield i;
      }
    }
  }

  toArray() {
    return [...this];
  }

  reverse() {
    // If current is 1 to 5 step 1: [1, 2, 3, 4, 5]
    // Reverse should be 5 to 1 step -1: [5, 4, 3, 2, 1]

    // We need to calculate the actual last element of the sequence
    const arr = this.toArray();
    if (arr.length === 0) {
      return new Range(this.end, this.start, -this.step); // Or just empty
    }
    const last = arr[arr.length - 1];
    const first = arr[0];
    return new Range(last, first, -this.step);
  }

  includes(value) {
    return this.step > 0
      ? value >= this.start &&
          value <= this.end &&
          (value - this.start) % this.step === 0
      : value <= this.start &&
          value >= this.end &&
          (value - this.start) % this.step === 0;
  }

  static fromArray(array) {
    if (!Array.isArray(array) || array.length === 0) {
      throw new Error("Input must be a non-empty array");
    }
    const min = Math.min(...array);
    const max = Math.max(...array);
    return new Range(min, max);
  }
}

// Example Usage
console.log("--- Example 1 ---");
const range1 = new Range(1, 5);
for (const num of range1) {
  console.log(num); // 1, 2, 3, 4, 5
}

console.log("--- Example 2 ---");
const range2 = new Range(10, 15);
console.log([...range2]); // [10, 11, 12, 13, 14, 15]

console.log("--- Example 3 ---");
const range3 = new Range(0, 10, 2);
console.log([...range3]); // [0, 2, 4, 6, 8, 10]

console.log("--- Example 4 ---");
const range4 = new Range(5, 1, -1);
console.log([...range4]); // [5, 4, 3, 2, 1]

console.log("--- Example 5 ---");
const range5 = new Range(1, 3);
console.log(range5.toArray()); // [1, 2, 3]

console.log("--- Example 6 ---");
const range6 = new Range(1, 5);
console.log([...range6.reverse()]); // [5, 4, 3, 2, 1]

console.log("--- Example 7 ---");
const range7 = new Range(10, 20, 2);
console.log(range7.includes(14)); // true
console.log(range7.includes(15)); // false

console.log("--- Example 8 ---");
const numbers = [3, 7, 1, 9, 4];
const range8 = Range.fromArray(numbers);
console.log([...range8]); // [1, 2, 3, 4, 5, 6, 7, 8, 9]

console.log("--- Example 9 ---");
const [first, second, ...rest] = new Range(1, 5);
console.log(first, second, rest); // 1, 2, [3, 4, 5]
