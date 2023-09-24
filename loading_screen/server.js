var http = require('http');
var fs = require('fs');
const { createServer } = require('http');
var path = require('path');
var ext = /[\w\d_-]+\.[\w\d]+$/;

createServer(function(req, res){
    if (req.url === '/') {
        console.log(req.url + ": req 1")
        res.writeHead(200, {'Content-Type': 'text/html'});
        fs.createReadStream('loading.html').pipe(res);
    } else if (ext.test(req.url)) {
        console.log(req.url + ": req 2")
        fs.exists(path.join(__dirname, req.url), function (exists) {
            if (exists) {
              res.writeHead(200, {"Content-Type": "text/css"});
                fs.createReadStream('style.css', 'utf-8').pipe(res);
            } else {
                res.writeHead(404, {'Content-Type': 'text/html'});
                fs.createReadStream('404.html').pipe(res);
        }});
    } else{

    }
}).listen(8000);

