const http = require('http');
const amqp = require("amqplib");

async function sendState(message) {
    const connection = await amqp.connect(process.env.RABBITURL);
    const exchange = 'topic_exchange';
    const type = 'topic';
    const key = 'state.s';
    let channel = await connection.createChannel();
    await channel.assertExchange(exchange, type, {});
    channel.publish(exchange, key, Buffer.from(JSON.stringify(message)), {});
}

const requestListener = function (req, res) {
    if (req.url === '/' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('up');
    } else if (req.url === '/state' && req.method === 'PUT') {
        req.on('data', function(chunk) {
            if (chunk.toString()) { state = chunk.toString(); }
            if (['INIT', 'RUNNING', 'PAUSED', 'SHUTDOWN'].includes(state)) {

                if (state === 'SHUTDOWN') {
                    process.exit(0);
                }

                console.log('Received state change ' + state);
                sendState(state);
                res.writeHead(201, { 'Content-Type': 'text/plain' });
                res.end(state);
            } else {
                res.writeHead(400, { 'Content-Type': 'text/plain' });
                res.end('Invalid state');
            }
        });
    } else if ((req.url === '/messages' || req.url === '/state' || req.url === '/run-log' ) && req.method === 'GET') {
        http.get('http://httpserv:8978' + req.url, (resp) => {

        let data = '';
        resp.on('data', (chunk) => {
            data += chunk;
        });

        resp.on('end', () => {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end(data);
        });

        }).on('error', (err) => {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end(err);
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Route not found');
    }
};

const server = http.createServer(requestListener);
server.listen(8083);
