const http = require('http');
const fs = require('fs');

const requestListener = function (req, res) {
    let data = fs.readFileSync('./logs/log.txt', {encoding:'utf8', flag:'r'});
    res.writeHead(200);
    res.end(data);
};

const server = http.createServer(requestListener);
server.listen(8978);
