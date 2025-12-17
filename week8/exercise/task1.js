/**
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
 */

function* paginate(items, pageSize, extra = { pageOffset: 0, offset: 0 }) {
  const { pageOffset, offset } = extra;
  // Input validation
  if (!Array.isArray(items)) {
    throw new Error("Items must be an array");
  }
  if (!Number.isInteger(pageSize) || pageSize <= 0) {
    throw new Error("Page size must be a positive integer");
  }

  const offsetItems = items.slice(offset);

  const totalPages = Math.ceil(offsetItems.length / pageSize);

  // Handle empty array case
  if (offsetItems.length === 0) {
    yield {
      page: 0,
      totalPages: 0,
      data: [],
      hasMore: false,
    };
    return;
  }

  if (pageOffset < 0 || pageOffset >= totalPages) {
    throw new Error("Page offset out of bounds");
  }

  for (let i = pageOffset ?? 0; i < totalPages; i++) {
    const start = i * pageSize;
    const end = start + pageSize;
    const data = offsetItems.slice(start, end);
    const hasMore = i < totalPages - 1;

    yield {
      page: i,
      totalPages,
      data,
      hasMore,
    };
  }
}

// Example Usage
const items = Array.from({ length: 13 }, (_, i) => `Item ${i + 1}`);
const pages = paginate(items, 5);

console.log(pages.next().value);
console.log(pages.next().value);
console.log(pages.next().value);
console.log(pages.next().value);

// Empty array
const empty = paginate([], 5);
console.log(empty.next().value);

// Array smaller than page size
const small = paginate([1, 2, 3], 10);
console.log(small.next().value);

const toArray = (gen) => {
  const result = [];
  let isDone = false;
  while (!isDone) {
    const { value, done } = gen.next();
    if (done) {
      isDone = true;
    } else {
      result.push(...value.data);
    }
  }
  return result;
};

const iter = (gen) => {
  for (const page of gen) console.log(page.data);
}

console.log("toArray", toArray(paginate([1, 2, 3, 4, 5, 6, 7], 3)));
console.log(
  "toArray",
  toArray(paginate([1, 2, 3, 4, 5, 6], 2, { pageOffset: 2 }))
);
console.log(iter(paginate([1, 2, 3, 4, 5, 6], 2, { offset: 1 })));
console.log(
  iter(paginate([1, 2, 3, 4, 5, 6, 7, 8], 2, { offset: 1, pageOffset: 2 }))
);