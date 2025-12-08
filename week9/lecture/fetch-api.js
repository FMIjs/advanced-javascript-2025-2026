// Fetch API and Asynchronous Network Requests

// Basic Fetch Request (review from Week 4 Promises)

const basicFetch = () => {
  // const response = await fetch('https://api.example.com/data');
  // const data = await response.json();

  // fetch returns Promise<Response>
  // Response has .json(), .text(), .blob(), .arrayBuffer()

  console.log('fetch() returns Promise - familiar from Week 4');
};

// Response Object Properties

const responseObject = () => {
  // const res = await fetch(url);
  // res.status;           // 200, 404, 500
  // res.statusText;       // 'OK', 'Not Found'
  // res.ok;               // true if status 200-299
  // res.url;              // final URL after redirects
  // res.headers;          // Headers object
  // res.type;             // 'basic', 'cors', 'error'
};

// Getting Response Body

const responseBody = () => {
  // const res = await fetch(url);

  // JSON API response
  // const json = await res.json();

  // Plain text
  // const text = await res.text();

  // Binary data
  // const blob = await res.blob();

  // Stream (process large files)
  // const reader = res.body.getReader();

  console.log('Body can only be read once! Cache if needed');
};

// Handling Errors

const errorHandling = () => {
  // const fetchData = async (url) => {
  //   try {
  //     const res = await fetch(url);
  //     if (!res.ok) throw new Error(`HTTP ${res.status}`);
  //     return await res.json();
  //   } catch (err) {
  //     console.error('Fetch failed:', err.message);
  //     // Network error OR response error
  //   }
  // };

  console.log('fetch rejects on network error, NOT on HTTP status');
  console.log('Always check res.ok or res.status');
};

// Request Configuration

const requestOptions = () => {
  // GET request (default)
  // fetch(url);

  // POST with JSON
  // const res = await fetch(url, {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json'
  //   },
  //   body: JSON.stringify({ name: 'John', age: 30 })
  // });

  // PUT request
  // fetch(url, {
  //   method: 'PUT',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(updatedData)
  // });

  // DELETE request
  // fetch(url, { method: 'DELETE' });
};

// Headers

const headers = () => {
  // const res = await fetch(url, {
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'Authorization': 'Bearer token123',
  //     'X-Custom-Header': 'value'
  //   }
  // });

  // Access response headers
  // const contentType = res.headers.get('content-type');
  // const allHeaders = res.headers.getSetCookie(); // all Set-Cookie

  // Headers object has methods: get(), has(), set(), append(), delete()
};

// Credentials (Cookies)

const credentials = () => {
  // Include cookies in request
  // const res = await fetch(url, {
  //   credentials: 'include'  // always send cookies
  // });

  // credentials options:
  // 'omit' - don't send cookies (default for cross-origin)
  // 'same-origin' - send if same origin as page
  // 'include' - always send (need Access-Control-Allow-Credentials header)
};

// URL Parameters (Query Strings)

const urlParams = () => {
  // Manual construction
  // const url = new URL('https://api.example.com/users');
  // url.searchParams.set('page', '1');
  // url.searchParams.set('limit', '10');
  // await fetch(url); // https://api.example.com/users?page=1&limit=10

  // const res = await fetch(url);
  // const params = new URLSearchParams(res.url);
  // params.get('page');
};

// Building a Fetch Wrapper (like Week 4 patterns)

const fetchWrapper = () => {
  const api = {
    get: async (url, opts = {}) => {
      const res = await fetch(url, {
        method: 'GET',
        ...opts
      });
      if (!res.ok) throw new Error(`${res.status}: ${res.statusText}`);
      return res.json();
    },

    post: async (url, data, opts = {}) => {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...opts.headers },
        body: JSON.stringify(data),
        ...opts
      });
      if (!res.ok) throw new Error(`${res.status}`);
      return res.json();
    },

    put: async (url, data, opts = {}) => {
      const res = await fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', ...opts.headers },
        body: JSON.stringify(data),
        ...opts
      });
      if (!res.ok) throw new Error(`${res.status}`);
      return res.json();
    }
  };

  // Usage:
  // const user = await api.get('/api/user/123');
  // const created = await api.post('/api/users', { name: 'John' });
};

// Async/Await Pattern (Week 4-5 review)

const asyncAwaitPattern = () => {
  // const loadUserAndPosts = async (userId) => {
  //   const user = await fetch(`/api/users/${userId}`).then(r => r.json());
  //   const posts = await fetch(`/api/users/${userId}/posts`).then(r => r.json());
  //   return { user, posts };
  // };

  console.log('async/await makes async code look synchronous');
  console.log('await pauses execution until Promise resolves');
};

// Sequential vs Parallel Requests

const parallelRequests = () => {
  // Sequential (slow)
  // const u1 = await fetch('/api/users/1').then(r => r.json());
  // const u2 = await fetch('/api/users/2').then(r => r.json());
  // const u3 = await fetch('/api/users/3').then(r => r.json());

  // Parallel (fast) - requests fire simultaneously
  // const [u1, u2, u3] = await Promise.all([
  //   fetch('/api/users/1').then(r => r.json()),
  //   fetch('/api/users/2').then(r => r.json()),
  //   fetch('/api/users/3').then(r => r.json())
  // ]);

  console.log('Promise.all waits for all, fails if any rejects');
  console.log('Promise.allSettled waits for all, returns statuses');
  console.log('Promise.race returns first settled (fastest)');
};

// Abort Controller (Cancellation)

const abortController = () => {
  // const ctrl = new AbortController();
  // const timeout = setTimeout(() => ctrl.abort(), 5000); // 5s timeout

  // const res = await fetch(url, {
  //   signal: ctrl.signal
  // });

  // clearTimeout(timeout);

  // // Or abort manually
  // // ctrl.abort(); // rejects fetch with AbortError

  console.log('AbortController cancels in-flight requests');
};

// FormData (File Upload)

const formDataUpload = () => {
  // const form = document.querySelector('form');
  // const formData = new FormData(form);
  // formData.append('file', fileInputElement.files[0]);

  // const res = await fetch('/api/upload', {
  //   method: 'POST',
  //   body: formData
  //   // DON'T set Content-Type, browser does it with boundary
  // });

  console.log('FormData for file uploads and multipart/form-data');
};

// Streaming Response Body

const streamingResponse = () => {
  // const res = await fetch(url);
  // const reader = res.body.getReader();
  // const decoder = new TextDecoder();

  // while (true) {
  //   const { done, value } = await reader.read();
  //   if (done) break;
  //   console.log('Chunk:', decoder.decode(value));
  // }

  console.log('Streaming processes large responses without loading all into memory');
};

// CORS (Cross-Origin Resource Sharing)

const corsPattern = () => {
  // Browser restricts cross-origin requests
  // Server must send CORS headers:
  // Access-Control-Allow-Origin: *
  // Access-Control-Allow-Methods: GET, POST
  // Access-Control-Allow-Headers: Content-Type

  // Simple requests: GET, HEAD, POST with certain headers
  // Complex requests: DELETE, PUT, custom headers -> browser sends OPTIONS first

  // CORS request with credentials
  // const res = await fetch(url, {
  //   credentials: 'include',
  //   headers: { ... }
  // });

  console.log('CORS: server controls who can access resources');
};

console.log('Fetch API Patterns:');
console.log('- fetch(url, options) returns Promise<Response>');
console.log('- Always check res.ok or res.status');
console.log('- Response methods: .json(), .text(), .blob(), .arrayBuffer()');
console.log('- Options: method, headers, body, credentials, signal, mode');
console.log('- Async/await for clean control flow');
console.log('- Promise.all() for parallel requests');
console.log('- AbortController for cancellation');
console.log('- FormData for file uploads');
