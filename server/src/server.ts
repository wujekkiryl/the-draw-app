import express from 'express';
import http from 'http';
import WebSocket from 'ws';
import { config } from 'dotenv';
import { json } from 'body-parser';

config();

const app = express();
app.use(json());
//initialize a simple http server
const server = http.createServer();

//initialize the WebSocket server instance
const wss = new WebSocket.Server({ server });

interface ExtWebSocket extends WebSocket {
    isAlive: boolean;
}

app.use('/api/createRoom', require('./routes/createRoom'));
app.use('/api/addPersons', require('./routes/addPersons'));
app.use('/api/drawPairs', require('./routes/drawPairs'));

app.get('*', function (req, res) {
    res.send(404);
    res.end();
});

wss.on('connection', (ws: ExtWebSocket) => {

    ws.isAlive = true;

    ws.on('pong', () => {
        ws.isAlive = true;
    });

    //connection is up, let's add a simple simple event
    ws.on('message', (message: string) => {

        //log the received message and send it back to the client
        console.log('received: %s', message);

        const broadcastRegex = /^broadcast\:/;

        if (broadcastRegex.test(message)) {
            message = message.replace(broadcastRegex, '');

            //send back the message to the other clients
            wss.clients
                .forEach(client => {
                    if (client != ws) {
                        client.send(`Hello, broadcast message -> ${message}`);
                    }
                });

        } else {
            ws.send(`Hello, you sent -> ${message}`);
        }
    });

    //send immediatly a feedback to the incoming connection    
    ws.send('Hi there, I am a WebSocket server');
});

setInterval(() => {
    wss.clients.forEach((ws: WebSocket) => {

        const extWs = ws as ExtWebSocket;

        if (!extWs.isAlive) return ws.terminate();

        extWs.isAlive = false;
        ws.ping(null, undefined);
    });
}, 10000);

//start our server
server.listen(process.env.WS_PORT || 8999, () => {
    console.log(`ws server is listening at`, process.env.WS_PORT);
});
app.listen(process.env.HTTP_PORT, () => {
    console.log(`http server is listening at`, process.env.HTTP_PORT)
})