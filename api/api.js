const http = require('http');

const requestListener = function (req, res) {
    if (req.url === '/' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('up');
    } else if  (req.url === '/messages' && req.method === 'GET') {
        http.get('http://httpserv:8978/', (resp) => {

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
            res.end('Backend error');
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Route not found');
    }
};

const server = http.createServer(requestListener);
server.listen(8083);
