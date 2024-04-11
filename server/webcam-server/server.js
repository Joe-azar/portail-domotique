const express = require('express');
const WebSocket = require('ws');
const NodeWebcam = require('node-webcam');
const http = require('http');

// Initialize Express and HTTP server
const app = express();
const server = http.createServer(app);

// Initialize WebSocket Server
const wss = new WebSocket.Server({ server });

// Webcam options
const webcamOptions = {
    width: 1280,
    height: 720,
    quality: 100,
    frames: 60,
    delay: 0,
    saveShots: false,
    output: "jpeg",
    device: false,
    callbackReturn: "buffer",
    verbose: false
};

// Initialize webcam
const webcam = NodeWebcam.create(webcamOptions);

// Handle WebSocket connections
wss.on('connection', function connection(ws) {
    console.log('Client connected');

    const sendFrame = () => {
        webcam.capture("frame", function(err, data) {
            if (err) {
                console.log('Error capturing webcam frame:', err);
                return;
            }
            // Send the captured frame as a base64 encoded string
            ws.send(Buffer.from(data).toString('base64'));
        });
    };

    // Send a new frame every second (adjust as needed)
    const interval = setInterval(sendFrame, 1000);

    ws.on('close', function close() {
        clearInterval(interval);
        console.log('Client disconnected');
    });
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});
