/**
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
*/

function* paginateBidirectional(items, pageSize) {
  if (!Array.isArray(items)) throw new Error("Items must be an array");
  if (!Number.isInteger(pageSize) || pageSize <= 0)
    throw new Error("Page size must be a positive integer");

  const totalPages = Math.ceil(items.length / pageSize);
  let currentPage = 0;

  // Handle empty array case
  if (items.length === 0) {
    yield {
      page: 0,
      totalPages: 0,
      data: [],
      hasNext: false,
      hasPrev: false,
    };
    return;
  }

  while (currentPage >= 0 && currentPage < totalPages) {
    const start = currentPage * pageSize;
    const end = start + pageSize;
    const data = items.slice(start, end);

    const hasNext = currentPage < totalPages - 1;
    const hasPrev = currentPage > 0;

    const command = yield {
      page: currentPage,
      totalPages,
      data,
      hasNext,
      hasPrev,
    };

    if (command === "prev") {
      if (hasPrev) currentPage--;
    } else if (command === "first") {
      currentPage = 0;
    } else if (command === "last") {
      currentPage = totalPages - 1;
    } else if (typeof command === "number") {
      if (command >= 0 && command < totalPages) {
        currentPage = command;
      }
    } else {
      // Default behavior: next page
      // Only advance if we are not just peeking or staying?
      // The requirement says: "When .next() is called without arguments: return the next page"
      // So we advance.
      currentPage++;
    }
  }
}

// Example Usage
const items = Array.from({ length: 25 }, (_, i) => `Item ${i + 1}`);
const pages = paginateBidirectional(items, 5);

let data;
// data = pages.next().value;
// console.log(data, ...data.data);
// data = pages.next().value;
// console.log(data, ...data.data);
data = pages.next().value;
console.log(data, ...data.data);
data = pages.next("last").value;
console.log(data, ...data.data);
data = pages.next("first").value;
console.log(data, ...data.data);
data = pages.next("first").value;
console.log(data, ...data.data);
// data = pages.next().value
// console.log(data, ...data.data);
// // { page: 0, totalPages: 5, data: ['Item 1', ..., 'Item 5'], hasNext: true, hasPrev: false }

// data = pages.next().value
// console.log(data, ...data.data);
// // { page: 1, totalPages: 5, data: ['Item 6', ..., 'Item 10'], hasNext: true, hasPrev: true }

// data = pages.next('prev').value
// console.log(data, ...data.data);
// // { page: 0, totalPages: 5, data: ['Item 1', ..., 'Item 5'], hasNext: true, hasPrev: false }

// data = pages.next('last').value
// console.log(data, ...data.data);
// // { page: 4, totalPages: 5, data: ['Item 21', ..., 'Item 25'], hasNext: false, hasPrev: true }

// data = pages.next(2).value
// console.log(data, ...data.data);
// // { page: 2, totalPages: 5, data: ['Item 11', ..., 'Item 15'], hasNext: true, hasPrev: true }
