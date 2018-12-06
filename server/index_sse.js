let http = require('http');

let interval = null;

function getIds(request, response) {
    let id = 1;
    interval = setInterval(() => {
        response.write(
            'event: myEvent\nid: ${id}\ndata:' + id
        );
        response.write("\n\n");
        id++;
    }, 3000);
}

http.createServer((request, response) => {

    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Request-Method', '*');
    response.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
    response.setHeader('Access-Control-Allow-Headers', '*');

    request.on('close', () => {
        clearInterval(interval);
        response.end();
        console.log("Stopped sending events");
        
    });

    response.writeHead(200, {
        'Connection': 'keep-alive',
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache'
    });

    switch (request.url) {
        case '/getids':
          getIds(request, response);
          break;
        case '/':
            console.log("test");
            break;
        default:
          // Unknown URL
          response.writeHead(404);
          response.end();
      }

}).listen(3000, () => {
    console.log("Listening on port 3000");
});
