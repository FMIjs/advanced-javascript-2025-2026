# WebSocket Chat Client

A simple real-time chat application demonstrating Native WebSocket communication.

## Files

- `index.html` - Chat client (open in browser)
- `server.js` - WebSocket server (Node.js)

## Getting Started

### 1. Install dependencies

```bash
npm install ws
```

### 2. Start the server

```bash
node server.js
```

You should see:
```
╔═══════════════════════════════════════════════════╗
║         WebSocket Chat Server                      ║
╠═══════════════════════════════════════════════════╣
║  Server running on: ws://localhost:8080           ║
║                                                    ║
║  Open index.html in your browser to connect        ║
║  Open multiple tabs to test multi-user chat        ║
╚═══════════════════════════════════════════════════╝
```

### 3. Open the client

Open `index.html` in your browser. You can open multiple browser tabs or windows to simulate multiple users chatting.

## Features

- Real-time messaging
- User join/leave notifications  
- Auto-reconnection with exponential backoff
- Modern dark theme UI
- Responsive design

## Protocol

Messages are JSON objects with a `type` field:

### Client → Server

```javascript
// Send chat message
{ type: 'chat', message: 'Hello!' }

// Change username
{ type: 'setName', username: 'NewName' }
```

### Server → Client

```javascript
// System message (join/leave notifications)
{ type: 'system', message: 'User_abc123 joined', users: ['User_abc123', 'User_def456'] }

// Chat message
{ type: 'chat', user: 'User_abc123', message: 'Hello!', timestamp: 1704657600000 }
```

## Exercises

Try extending this chat application:

1. **Username Selection**: Add a form to let users choose their username when joining
2. **Typing Indicator**: Show "User is typing..." when someone is typing
3. **Message History**: Store recent messages and send them to new users
4. **Private Messages**: Implement direct messages between users
5. **Emoji Support**: Add an emoji picker


