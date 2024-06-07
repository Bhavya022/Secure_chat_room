const WebSocket = require('ws');
const broadcastMessage = (message) => {
    WebSocket.getWss().clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(message);
        }
    });
};
module.exports = {
    broadcastMessage
};
