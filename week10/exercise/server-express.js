const express = require('express');

const app = express();
app.use(express.json());

// In-memory data store
let items = [
  { id: 1, name: 'Item 1', description: 'First item' },
  { id: 2, name: 'Item 2', description: 'Second item' },
];
let nextId = 3;

// GET /items - List all items
app.get('/items', (req, res) => {
  res.json(items);
});

// GET /items/:id - Get single item
app.get('/items/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const item = items.find(i => i.id === id);
  
  if (!item) {
    return res.status(404).json({ error: 'Item not found' });
  }
  res.json(item);
});

// POST /items - Create new item
app.post('/items', (req, res) => {
  const newItem = {
    id: nextId++,
    name: req.body.name || 'Unnamed',
    description: req.body.description || ''
  };
  items.push(newItem);
  res.status(201).json(newItem);
});

// PUT /items/:id - Update item
app.put('/items/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const index = items.findIndex(i => i.id === id);
  
  if (index === -1) {
    return res.status(404).json({ error: 'Item not found' });
  }
  
  items[index] = {
    ...items[index],
    name: req.body.name ?? items[index].name,
    description: req.body.description ?? items[index].description
  };
  res.json(items[index]);
});

// DELETE /items/:id - Delete item
app.delete('/items/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const index = items.findIndex(i => i.id === id);
  
  if (index === -1) {
    return res.status(404).json({ error: 'Item not found' });
  }
  
  const deleted = items.splice(index, 1)[0];
  res.json(deleted);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Express server running at http://localhost:${PORT}`);
  console.log('Available endpoints:');
  console.log('  GET    /items      - List all items');
  console.log('  GET    /items/:id  - Get single item');
  console.log('  POST   /items      - Create new item');
  console.log('  PUT    /items/:id  - Update item');
  console.log('  DELETE /items/:id  - Delete item');
});

