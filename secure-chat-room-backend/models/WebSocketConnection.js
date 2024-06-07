
class WebSocketConnection {
    constructor(ws, userId) {
        this.ws = ws; // WebSocket instance
        this.userId = userId; // User associated with the WebSocket connection
        this.connectedAt = new Date(); // Timestamp for when the connection was established
    }

    sendMessage(message) {
        this.ws.send(message);
    }

    closeConnection() {
        this.ws.close();
    }
}

module.exports = WebSocketConnection;
