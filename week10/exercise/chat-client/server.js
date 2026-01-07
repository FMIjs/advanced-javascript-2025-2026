// chat-server.js - Native WebSocket Chat Server
// 
// Setup:
//   npm install ws
//
// Run:
//   node server.js
//
// Then open index.html in your browser (or multiple browser tabs)

const { WebSocketServer } = require('ws');

const PORT = 8080;
const wss = new WebSocketServer({ port: PORT });

// Store connected clients: socket -> { id, username }
const clients = new Map();

/**
 * Broadcast a message to all connected clients
 * @param {Object} message - Message to broadcast
 * @param {WebSocket} exclude - Optional socket to exclude from broadcast
 */
function broadcast(message, exclude = null) {
  const data = JSON.stringify(message);
  wss.clients.forEach((client) => {
    if (client !== exclude && client.readyState === 1) {
      client.send(data);
    }
  });
}

/**
 * Get list of all connected usernames
 */
function getUserList() {
  return Array.from(clients.values()).map(c => c.username);
}

console.log(`
╔═══════════════════════════════════════════════════╗
║         WebSocket Chat Server                      ║
╠═══════════════════════════════════════════════════╣
║  Server running on: ws://localhost:${PORT}          ║
║                                                    ║
║  Open index.html in your browser to connect        ║
║  Open multiple tabs to test multi-user chat        ║
╚═══════════════════════════════════════════════════╝
`);

wss.on('connection', (ws, req) => {
  // Generate unique ID for this client
  const userId = Math.random().toString(36).substr(2, 9);
  const username = `User_${userId}`;
  
  // Store client info
  clients.set(ws, { id: userId, username });
  
  const clientIP = req.socket.remoteAddress;
  console.log(`✅ New connection: ${username} from ${clientIP}`);
  console.log(`   Total clients: ${clients.size}`);
  
  // Send welcome message to new client
  ws.send(JSON.stringify({
    type: 'system',
    message: `Welcome! Your ID: ${userId}`,
    users: getUserList()
  }));
  
  // Notify others about new user
  broadcast({
    type: 'system',
    message: `${username} joined the chat`
  }, ws);
  
  // Handle incoming messages
  ws.on('message', (data) => {
    try {
      const msg = JSON.parse(data);
      const user = clients.get(ws);
      
      console.log(`📨 Message from ${user.username}: ${msg.type}`);
      
      switch (msg.type) {
        case 'chat':
          // Broadcast chat message to all clients (including sender)
          broadcast({
            type: 'chat',
            user: user.username,
            message: msg.message,
            timestamp: Date.now()
          });
          break;
          
        case 'setName':
          // Handle username change
          const oldName = user.username;
          user.username = msg.username;
          console.log(`📝 ${oldName} changed name to ${msg.username}`);
          
          broadcast({
            type: 'system',
            message: `${oldName} is now ${msg.username}`
          });
          break;
          
        default:
          console.log(`❓ Unknown message type: ${msg.type}`);
      }
    } catch (error) {
      console.error('Error parsing message:', error);
    }
  });
  
  // Handle client disconnect
  ws.on('close', () => {
    const user = clients.get(ws);
    if (user) {
      console.log(`🔌 Disconnected: ${user.username}`);
      
      broadcast({
        type: 'system',
        message: `${user.username} left the chat`
      });
      
      clients.delete(ws);
      console.log(`   Total clients: ${clients.size}`);
    }
  });
  
  // Handle errors
  ws.on('error', (error) => {
    console.error(`❌ WebSocket error for ${clients.get(ws)?.username}:`, error.message);
  });
});

// Handle server shutdown gracefully
process.on('SIGINT', () => {
  console.log('\n👋 Shutting down server...');
  
  // Notify all clients
  broadcast({
    type: 'system',
    message: 'Server is shutting down'
  });
  
  // Close all connections
  wss.clients.forEach((client) => {
    client.close(1000, 'Server shutdown');
  });
  
  wss.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

