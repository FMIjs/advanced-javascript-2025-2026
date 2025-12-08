# Week 9 Exercises: JavaScript in the Browser

This folder contains three practical exercises for building interactive web applications. Each exercise builds on previous weeks' concepts while introducing essential browser APIs.

## Task 1: Todo Application

**File:** `task1-todo-app.js`

A complete todo list application covering DOM manipulation, localStorage, and event handling.

### Concepts Covered:
- DOM manipulation: `createElement`, `appendChild`, `classList`, `dataset`
- localStorage: persistent client-side storage with JSON serialization
- Event handling: `addEventListener`, event delegation with closest
- Closure: IIFE module pattern (review from Week 2)
- Control flow: if/else, loops, array methods (filter, find)

### Features:
- Add todos with input validation
- Mark todos as complete/incomplete
- Delete todos
- Persist todos in localStorage
- Keyboard support (Enter to add)

### How to Run:
Open `task1-todo-app.html` in your browser, or:
1. Use `npm run serve` to serve on localhost:31337
2. Navigate to `week9/exercise/task1-todo-app.html`

### Extensions:
- Add filter buttons (All, Active, Completed)
- Add search/filter by text
- Add priority levels
- Add due dates

---

## Task 2: API Dashboard

**File:** `task2-api-dashboard.js`

A dashboard that fetches and displays data from a public API (JSONPlaceholder) with proper error handling.

### Concepts Covered:
- Fetch API: GET requests, response handling
- Async/await: try/catch/finally error handling (review from Week 4-5)
- Promise chaining and parallel requests (review from Week 4)
- DOM rendering: innerHTML with template literals
- Event delegation: data attributes for button routing
- Module pattern: IIFE with private state

### Features:
- Load different data types (posts, users, todos)
- Proper error handling with user feedback
- Loading state indicator
- Responsive data rendering
- Uses public API with no authentication required

### How to Run:
Open `task2-api-dashboard.html` in your browser, or:
1. Use `npm run serve` to serve on localhost:31337
2. Navigate to `week9/exercise/task2-api-dashboard.html`

### API Endpoints Used:
- `https://jsonplaceholder.typicode.com/posts`
- `https://jsonplaceholder.typicode.com/users`
- `https://jsonplaceholder.typicode.com/todos`

### Extensions:
- Add pagination (previous/next buttons)
- Add search within loaded data
- Add filtering by category/status
- Fetch related data (posts with comments)
- Add caching to avoid repeated requests

---

## Task 3: Lazy Loading Image Gallery

**File:** `task3-lazy-loading.js`

An infinite-scroll image gallery with lazy loading using Intersection Observer for optimal performance.

### Concepts Covered:
- Intersection Observer: efficient lazy loading (no scroll events)
- Performance optimization: only load visible images
- Infinite scroll: detect when user nears bottom
- Debouncing: reduce frequency of expensive handlers (review from Week 9)
- Module pattern: IIFE with state management
- CSS Grid: responsive image layout

### Features:
- Lazy load images only when visible
- Infinite scroll: auto-load more images
- Placeholder during loading
- Debounced resize handler
- No scroll event listeners (uses Intersection Observer)

### How to Run:
Open `task3-lazy-loading.html` in your browser, or:
1. Use `npm run serve` to serve on localhost:31337
2. Navigate to `week9/exercise/task3-lazy-loading.html`

### Performance Benefits:
- **Lazy loading:** Only images in viewport are loaded
- **Intersection Observer:** No scroll listener overhead
- **Debounced resize:** Not every pixel resize triggers handler
- **Fragment batching:** Multiple images added in single DOM operation

### Extensions:
- Add lightbox modal on image click
- Add loading spinner for each image
- Add image metadata (title, description)
- Add infinite scroll with real API (Unsplash, Pexels, etc.)
- Add virtual scrolling for huge image counts

---

## Learning Path

These exercises build on each other:

1. **Task 1 → Task 2:** Apply DOM skills to API data
2. **Task 1 → Task 3:** Use events and performance patterns together
3. **All tasks:** Review closure, module pattern, event handling

## Connection to Previous Weeks

- **Week 2 (Functional Programming):** Closures, IIFE, higher-order functions (debounce)
- **Week 4 (Async Patterns):** Promises, async/await, error handling
- **Week 8 (Advanced Patterns):** Could use Proxy for reactive state in Task 1

## Best Practices Demonstrated

1. **Module Pattern:** Encapsulation with IIFE (review from Week 2)
2. **Error Handling:** Try/catch/finally for async operations
3. **Performance:** Batch DOM updates, use Intersection Observer
4. **Events:** Event delegation, data attributes for routing
5. **Storage:** JSON serialization, validation before use
6. **Async:** Proper loading states, user feedback

## Testing Tips

- Open browser DevTools (F12) to test localStorage and network requests
- Use Network tab to verify images are lazy loaded
- Check performance with throttled connections (slow 3G)
- Test keyboard navigation in Task 1
- Test error handling (disconnect network, use invalid API endpoint)

## Debugging

Each exercise has console logs describing key patterns:
- Run `console.log()` statements to see what was learned
- Use debugger: `debugger;` statement or breakpoints in DevTools
- Check Application > Storage tabs for localStorage inspection

---

## Expected Learning Outcomes

After completing these exercises, students should be able to:

1. ✓ Manipulate DOM with modern API (`querySelector`, `createElement`, etc.)
2. ✓ Handle browser events with `addEventListener` and event delegation
3. ✓ Fetch data from APIs with proper error handling
4. ✓ Persist data in localStorage
5. ✓ Optimize performance with Intersection Observer
6. ✓ Use async/await for network operations
7. ✓ Apply closure and module patterns for encapsulation
8. ✓ Debug browser JavaScript using DevTools
