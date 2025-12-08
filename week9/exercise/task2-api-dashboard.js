// Task 2: Build an API Dashboard
// Covers: Fetch API, async/await, DOM rendering, error handling

// Use public API: https://jsonplaceholder.typicode.com/
// Example endpoints:
// - /posts
// - /users
// - /comments
// - /todos

// HTML structure:
// <div id="app">
//   <h1>API Dashboard</h1>
//   <div id="controls">
//     <button data-endpoint="posts">Posts</button>
//     <button data-endpoint="users">Users</button>
//     <button data-endpoint="todos">Todos</button>
//   </div>
//   <div id="loading" style="display: none;">Loading...</div>
//   <div id="error" style="display: none;"></div>
//   <ul id="data-list"></ul>
// </div>

const APIClient = (() => {
  const BASE_URL = 'https://jsonplaceholder.typicode.com';

  const fetch = async (endpoint) => {
    const res = await global.fetch(`${BASE_URL}/${endpoint}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
  };

  const getPosts = () => fetch('posts?_limit=10');
  const getUsers = () => fetch('users');
  const getTodos = () => fetch('todos?_limit=10');

  return { getPosts, getUsers, getTodos };
})();

const Dashboard = (() => {
  const showLoading = (show) => {
    const el = document.getElementById('loading');
    el.style.display = show ? 'block' : 'none';
  };

  const showError = (msg) => {
    const el = document.getElementById('error');
    el.style.display = msg ? 'block' : 'none';
    el.textContent = msg || '';
  };

  const renderPosts = (posts) => {
    const list = document.getElementById('data-list');
    list.innerHTML = '';

    posts.forEach(post => {
      const li = document.createElement('li');
      li.innerHTML = `
        <h3>${post.title}</h3>
        <p>${post.body}</p>
      `;
      list.appendChild(li);
    });
  };

  const renderUsers = (users) => {
    const list = document.getElementById('data-list');
    list.innerHTML = '';

    users.forEach(user => {
      const li = document.createElement('li');
      li.innerHTML = `
        <h3>${user.name}</h3>
        <p>Email: ${user.email}</p>
        <p>Phone: ${user.phone}</p>
      `;
      list.appendChild(li);
    });
  };

  const renderTodos = (todos) => {
    const list = document.getElementById('data-list');
    list.innerHTML = '';

    todos.forEach(todo => {
      const li = document.createElement('li');
      const status = todo.completed ? '✓' : '○';
      li.innerHTML = `${status} ${todo.title}`;
      li.className = todo.completed ? 'completed' : '';
      list.appendChild(li);
    });
  };

  const loadData = async (endpoint) => {
    try {
      showLoading(true);
      showError('');

      let data;
      switch (endpoint) {
        case 'posts':
          data = await APIClient.getPosts();
          renderPosts(data);
          break;
        case 'users':
          data = await APIClient.getUsers();
          renderUsers(data);
          break;
        case 'todos':
          data = await APIClient.getTodos();
          renderTodos(data);
          break;
      }
    } catch (err) {
      showError('Failed to load data: ' + err.message);
    } finally {
      showLoading(false);
    }
  };

  const handleButtonClick = (e) => {
    const endpoint = e.target.dataset.endpoint;
    if (endpoint) loadData(endpoint);
  };

  const init = () => {
    const controls = document.getElementById('controls');
    controls.addEventListener('click', handleButtonClick);

    // Load posts by default
    loadData('posts');
  };

  return { init };
})();

// Usage in HTML:
// <script>
//   Dashboard.init();
// </script>

console.log('Task 2: API Dashboard');
console.log('- Fetch: GET requests, error handling, checking res.ok');
console.log('- Async/Await: try/catch/finally (review from Week 4-5)');
console.log('- DOM: innerHTML with template literals for rendering lists');
console.log('- Events: event delegation with data attributes');
console.log('- Patterns: module pattern with IIFE (Week 2 review)');
