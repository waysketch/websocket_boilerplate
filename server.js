// ======================== //
// === Make a WebSocket === //
// ======================== //
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const WebSocket = require('ws');
const wss = new WebSocket.Server({ server: server });
const PORT = process.env.PORT || 8080

// ================================ //
// === Connect to the WebSocket === //
// ================================ //
const connectToWebSocket = () => {
    console.log("Starting WebSocket");

    // === Someone Connected === //
    wss.addListener('connection', function connection(ws){

        ws.send("You are now connected to the web socket!");

        // Set isAlive to true on our WebSocket
        ws.isAlive = true;

        // Log on the Server that someone has connected.
        console.log("Someone has connected to this socket.");

        // Log a message from a client to the server.
        ws.on("message", function incoming(message) {
            console.log("Data: ", message);

            if (message === "off") {
                console.log("Stop Everything!!!!!");
                ws.terminate();
                return;
            };

            wss.clients.forEach(function each(client) {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(message);
                };
            });
        });
    });

    // === Close WebSocket === //
    wss.on("close", function close() {
        console.log("Closed this WebSocket.");
    });
};

// ======================= //
// === Make Connection === //
// ======================= //
connectToWebSocket();

// ================ //
// === the page === //
// ================ //
app.get("/", ( _ , res) => {
    res.send("hello world");
});

// ====================== //
// === Listen on PORT === //
// ====================== //
server.listen(PORT, () => {
    console.log(`WebSocket is LIVE on PORT: ${PORT}`);
});