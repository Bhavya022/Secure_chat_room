const WebSocket = require('ws');

const handleWebSocketConnection = (ws, req) => {
    const userId = req.userId;

    ws.on('message', (message) => {
        broadcastMessage(message);
    });

    ws.on('close', () => {
        
        console.log(`WebSocket connection closed for user ${userId}`);
        
        
    });
};

const broadcastMessage = (message) => {
    WebSocket.getWss().clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(message);
        }
    });
};

module.exports = {
    handleWebSocketConnection
};
