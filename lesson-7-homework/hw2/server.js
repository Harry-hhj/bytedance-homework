const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

http
    .createServer((req, resp) => {
        const { pathname } = url.pathToFileURL(req.url);
        const filename = path.resolve(__dirname, pathname.replace(/^\//, ''));
        //console.log(filename);
        if (!fs.existsSync(filename)) {
            //console.log(404);
            resp.statusCode = 404;
            resp.end();
            return;
        }
        fs.createReadStream(filename).pipe(resp);
        resp.writeHead(200, "OK", {"Cache-Control":"max-age=9999999"});
    })
    .listen(3000, () => {
        console.log('listening 3000 port');
    });
