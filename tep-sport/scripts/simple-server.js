const http = require('http');
const port = process.env.PORT || 3000;
const server = http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end('<!doctype html><html><body><h1>Static test OK</h1></body></html>');
});
server.listen(port, () => console.log('Simple server listening on', port));
process.on('SIGTERM', () => server.close());
