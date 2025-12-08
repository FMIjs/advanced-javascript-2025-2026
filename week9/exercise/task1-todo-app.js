// Task 1: Build a Todo Application
// Covers: DOM manipulation, localStorage, event handling, event delegation

// HTML structure to use:
// <div id="app">
//   <h1>My Todo List</h1>
//   <div id="input-area">
//     <input type="text" id="todo-input" placeholder="Add a task..." />
//     <button id="add-btn">Add</button>
//   </div>
//   <ul id="todo-list"></ul>
// </div>

const TodoApp = (() => {
  const STORAGE_KEY = 'todos';
  let todos = [];

  // Load todos from localStorage
  const load = () => {
    const stored = localStorage.getItem(STORAGE_KEY);
    todos = stored ? JSON.parse(stored) : [];
  };

  // Save todos to localStorage
  const save = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  };

  // Add new todo
  const add = (text) => {
    if (!text.trim()) return;
    const todo = {
      id: Date.now(),
      text: text.trim(),
      done: false
    };
    todos.push(todo);
    save();
  };

  // Toggle todo completion
  const toggle = (id) => {
    const todo = todos.find(t => t.id === id);
    if (todo) {
      todo.done = !todo.done;
      save();
    }
  };

  // Remove todo
  const remove = (id) => {
    todos = todos.filter(t => t.id !== id);
    save();
  };

  // Render all todos
  const render = () => {
    const list = document.getElementById('todo-list');
    list.innerHTML = '';

    const frag = document.createDocumentFragment();
    todos.forEach(todo => {
      const li = document.createElement('li');
      li.dataset.id = todo.id;
      li.className = todo.done ? 'done' : '';

      const text = document.createElement('span');
      text.textContent = todo.text;

      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = '✕';
      deleteBtn.className = 'delete-btn';

      li.appendChild(text);
      li.appendChild(deleteBtn);
      frag.appendChild(li);
    });

    list.appendChild(frag);
  };

  // Event handlers
  const handleAddClick = () => {
    const input = document.getElementById('todo-input');
    add(input.value);
    input.value = '';
    input.focus();
    render();
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleAddClick();
  };

  // Event delegation for todo item clicks
  const handleListClick = (e) => {
    const li = e.target.closest('li');
    if (!li) return;

    const id = parseInt(li.dataset.id);

    if (e.target.classList.contains('delete-btn')) {
      remove(id);
    } else {
      toggle(id);
    }

    render();
  };

  // Initialize
  const init = () => {
    load();
    render();

    document.getElementById('add-btn').addEventListener('click', handleAddClick);
    document.getElementById('todo-input').addEventListener('keypress', handleKeyPress);
    document.getElementById('todo-list').addEventListener('click', handleListClick);
  };

  return { init };
})();

// Usage in HTML:
// <script>
//   TodoApp.init();
// </script>

console.log('Task 1: Todo App');
console.log('- DOM: createElement, appendChild, textContent, dataset');
console.log('- Storage: localStorage.setItem/getItem with JSON serialization');
console.log('- Events: addEventListener, keypress, event delegation');
console.log('- Concepts: IIFE pattern (review from Week 2), closure for module');
