const http = require('http');
const port = process.env.PORT || 3000;

const server = http.createServer((req, res) => {

  if (req.url === '/sse') {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      ...(req.httpVersionMajor === 1 && { 'Connection': 'keep-alive' })
    });

    const eventRate = 2000; // 2 seconds
    return setInterval(() => {
      const id = Date.now();
      const data = `Hello SSE ${id}`;
      const message =
          `retry: ${eventRate}\nid:${id}\ndata: ${data}\n\n`;
      res.write(message);
    }, eventRate);
  }

  // Client side
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end(`
    <!DOCTYPE html>
    <html lang="en" dir="ltr">
      <head>
        <meta charset="utf-8">
        <title>SSE</title>
      </head>
      <body>
        <pre id="events"></pre>
      </body>
      <script>
        const eventSource = new EventSource('/sse');
        eventSource.onmessage = function(event) {
          console.log(event);
          document.getElementById('events').innerHTML += event.data + '<br>';
        };
      </script>
    </html>
  `);
});

server.listen(port);

server.on('error', (err) => {
  console.log(err);
  process.exit(1);
});

server.on('listening', () => {
  console.log(`Listening on port ${port}`);
});