# 03.12.25 - Generators & Iterators


## Exercise 1: Simple Forward Pagination Generator

Create a generator function called `paginate` that splits data into pages and yields them one at a time.

### Requirements:

1. The generator should accept:
   - An array of items
   - Page size (number of items per page)

2. The generator should:
   - Yield one page at a time (as an array)
   - Automatically move forward through pages with each `.next()` call
   - Include metadata with each yielded page: `{ page: currentPageNumber, totalPages: X, data: [...], hasMore: boolean }`
   - Handle edge cases (empty arrays, last page with fewer items)

### Example Usage:

```javascript
const items = Array.from({ length: 13 }, (_, i) => `Item ${i + 1}`);
const pages = paginate(items, 5);

console.log(pages.next().value);  
// { page: 0, totalPages: 3, data: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'], hasMore: true }

console.log(pages.next().value);  
// { page: 1, totalPages: 3, data: ['Item 6', 'Item 7', 'Item 8', 'Item 9', 'Item 10'], hasMore: true }

console.log(pages.next().value);  
// { page: 2, totalPages: 3, data: ['Item 11', 'Item 12', 'Item 13'], hasMore: false }

console.log(pages.next().value);  
// undefined (done)
```

### Test Cases to Handle:

```javascript
// Empty array
const empty = paginate([], 5);
console.log(empty.next().value);  
// { page: 0, totalPages: 0, data: [], hasMore: false }

// Array smaller than page size
const small = paginate([1, 2, 3], 10);
console.log(small.next().value);  
// { page: 0, totalPages: 1, data: [1, 2, 3], hasMore: false }

// Iterate through all pages
for (const page of paginate([1, 2, 3, 4, 5, 6, 7], 3)) {
  console.log(page.data);  // [1,2,3], then [4,5,6], then [7]
}
```

### Bonus Challenges:

- Add input validation (check if items is an array, pageSize is positive)
- Support starting from a specific page offset
- Add a `.toArray()` helper that returns all pages as an array

---

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

### Example Usage:

```javascript
// Example 1: Basic usage with for...of
const range1 = new Range(1, 5);
for (const num of range1) {
  console.log(num);  // 1, 2, 3, 4, 5
}

// Example 2: Spread operator
const range2 = new Range(10, 15);
console.log([...range2]);  // [10, 11, 12, 13, 14, 15]

// Example 3: Custom step
const range3 = new Range(0, 10, 2);
console.log([...range3]);  // [0, 2, 4, 6, 8, 10]

// Example 4: Negative step (countdown)
const range4 = new Range(5, 1, -1);
console.log([...range4]);  // [5, 4, 3, 2, 1]

// Example 5: toArray method
const range5 = new Range(1, 3);
console.log(range5.toArray());  // [1, 2, 3]

// Example 6: reverse method
const range6 = new Range(1, 5);
console.log([...range6.reverse()]);  // [5, 4, 3, 2, 1]

// Example 7: includes method
const range7 = new Range(10, 20, 2);
console.log(range7.includes(14));  // true
console.log(range7.includes(15));  // false

// Example 8: Static fromArray
const numbers = [3, 7, 1, 9, 4];
const range8 = Range.fromArray(numbers);
console.log([...range8]);  // [1, 2, 3, 4, 5, 6, 7, 8, 9]

// Example 9: Destructuring
const [first, second, ...rest] = new Range(1, 5);
console.log(first, second, rest);  // 1, 2, [3, 4, 5]
```

### Bonus Challenges:

- Add a `.filter(fn)` method that returns a new iterable with only matching values
- Add a `.map(fn)` method that returns a new iterable with transformed values
- Implement error handling for invalid ranges (e.g., positive step with start > end)
- Add a `.sum()` method that calculates the sum of all numbers in the range
- Make the Range work with `Array.from()` efficiently

### Tips:

- The iterator protocol requires implementing `Symbol.iterator` which returns an object with a `next()` method
- You can use a generator function (`*[Symbol.iterator]()`) for simpler implementation
- Remember that `next()` must return `{ value: any, done: boolean }`
- Consider edge cases: what if start === end? What if step is 0?



## Exercise 3: Bidirectional Pagination Generator

Building on Exercise 1, create an advanced pagination generator that supports navigation commands through bidirectional communication.

### Requirements:

1. The generator should accept the same parameters as Exercise 1

2. The generator should support bidirectional communication:
   - When `.next()` is called without arguments: return the next page
   - When `.next('prev')` is passed: return the previous page
   - When `.next('first')` is passed: return to the first page
   - When `.next('last')` is passed: jump to the last page
   - When `.next(pageNumber)` is passed: jump to a specific page (0-indexed)

3. Include enhanced metadata:
   - `{ page, totalPages, data, hasNext, hasPrev }`

### Example Usage:

```javascript
const items = Array.from({ length: 25 }, (_, i) => `Item ${i + 1}`);
const pages = paginateBidirectional(items, 5);

console.log(pages.next().value);        
// { page: 0, totalPages: 5, data: ['Item 1', ..., 'Item 5'], hasNext: true, hasPrev: false }

console.log(pages.next().value);        
// { page: 1, totalPages: 5, data: ['Item 6', ..., 'Item 10'], hasNext: true, hasPrev: true }

console.log(pages.next('prev').value);  
// { page: 0, totalPages: 5, data: ['Item 1', ..., 'Item 5'], hasNext: true, hasPrev: false }

console.log(pages.next('last').value);  
// { page: 4, totalPages: 5, data: ['Item 21', ..., 'Item 25'], hasNext: false, hasPrev: true }

console.log(pages.next(2).value);       
// { page: 2, totalPages: 5, data: ['Item 11', ..., 'Item 15'], hasNext: true, hasPrev: true }
```

### Bonus Challenges:

- Add circular navigation mode (going past the last page wraps to the first)
- Support relative jumps: `.next('+2')` or `.next('-3')`
- Add history tracking to support "back" and "forward" like a browser

