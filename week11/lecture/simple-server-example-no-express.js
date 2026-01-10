const http = require('http');

// In-memory data store
let items = [
  { id: 1, name: 'Item 1', description: 'First item' },
  { id: 2, name: 'Item 2', description: 'Second item' },
];
let nextId = 3;

// Helper to parse JSON body
function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (e) {
        reject(new Error('Invalid JSON'));
      }
    });
    req.on('error', reject);
  });
}

// Helper to send JSON response
function sendJson(res, statusCode, data) {
  res.writeHead(statusCode, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data));
}

// Parse URL to extract path and id
function parseUrl(url) {
  const parts = url.split('/').filter(Boolean);
  return {
    resource: parts[0],
    id: parts[1] ? parseInt(parts[1], 10) : null
  };
}

const server = http.createServer(async (req, res) => {
  const { resource, id } = parseUrl(req.url);
  const method = req.method;

  // Only handle /items resource
  if (resource !== 'items') {
    return sendJson(res, 404, { error: 'Not Found' });
  }

  try {
    // GET /items - List all items
    if (method === 'GET' && id === null) {
      return sendJson(res, 200, items);
    }

    // GET /items/:id - Get single item
    if (method === 'GET' && id !== null) {
      const item = items.find(i => i.id === id);
      if (!item) {
        return sendJson(res, 404, { error: 'Item not found' });
      }
      return sendJson(res, 200, item);
    }

    // POST /items - Create new item
    if (method === 'POST') {
      const body = await parseBody(req);
      const newItem = {
        id: nextId++,
        name: body.name || 'Unnamed',
        description: body.description || ''
      };
      items.push(newItem);
      return sendJson(res, 201, newItem);
    }

    // PUT /items/:id - Update item
    if (method === 'PUT' && id !== null) {
      const index = items.findIndex(i => i.id === id);
      if (index === -1) {
        return sendJson(res, 404, { error: 'Item not found' });
      }
      const body = await parseBody(req);
      items[index] = {
        ...items[index],
        name: body.name ?? items[index].name,
        description: body.description ?? items[index].description
      };
      return sendJson(res, 200, items[index]);
    }

    // DELETE /items/:id - Delete item
    if (method === 'DELETE' && id !== null) {
      const index = items.findIndex(i => i.id === id);
      if (index === -1) {
        return sendJson(res, 404, { error: 'Item not found' });
      }
      const deleted = items.splice(index, 1)[0];
      return sendJson(res, 200, deleted);
    }

    // Method not allowed
    sendJson(res, 405, { error: 'Method Not Allowed' });

  } catch (err) {
    sendJson(res, 400, { error: err.message });
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log('Available endpoints:');
  console.log('  GET    /items      - List all items');
  console.log('  GET    /items/:id  - Get single item');
  console.log('  POST   /items      - Create new item');
  console.log('  PUT    /items/:id  - Update item');
  console.log('  DELETE /items/:id  - Delete item');
});

