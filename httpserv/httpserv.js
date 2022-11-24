const http = require('http');
const fs = require('fs');

const requestListener = function (req, res) {
    if (req.url === '/messages') {
        let data = fs.readFileSync('./logs/log.txt', {encoding:'utf8', flag:'r'});
        res.writeHead(200);
        res.end(data);
    } else if (req.url === '/state') {
        let data = fs.readFileSync('./logs/state-curr.txt', {encoding:'utf8', flag:'r'});
        res.writeHead(200);
        res.end(data);
    } else if (req.url === '/run-log') {
        let data = fs.readFileSync('./logs/state-log.txt', {encoding:'utf8', flag:'r'});
        res.writeHead(200);
        res.end(data);
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Route not found');
    }
};

const server = http.createServer(requestListener);
server.listen(8978);
