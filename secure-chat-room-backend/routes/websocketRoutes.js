
const WebSocket = require('ws');
const { handleWebSocketConnection } = require('./controllers/chatController');
const wss = new WebSocket.Server({ /* WebSocket server options */ });
wss.on('connection', (ws, req) => {
       const userId = req.userId;
    handleWebSocketConnection(ws, req);
});

module.exports = wss;
