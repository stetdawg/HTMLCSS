const http = require('http');
const url = require('url');
const fs = require('fs');
const { createServer } = require('http');
const path = require('path');
//you can pass the parameter in the command line. e.g node static_server.js 8080
const port = process.argv[2] || 8080;

/* 

var ext = /[\w\d_-]+\.[\w\d]+$/;
createServer(function(req, res){
    if (req.url === '/') {
        console.log(req.url + ": req 1")
        res.writeHead(200, {'Content-Type': 'text/html'});
        fs.createReadStream('calculator.html').pipe(res);
    } else if (ext.test(req.url)) {
        console.log(req.url + ": req 2")
        fs.exists(path.join(__dirname, req.url), function (exists) {
            if (exists) {
              res.writeHead(200, {"Content-Type": "text/css"});
                fs.createReadStream('style.css', 'utf-8').pipe(res);
            } else {
                res.writeHead(200, {'Content-Type': 'text/javascript'});
                fs.createReadStream('calculator.js').pipe(res);
        }});
    } else{

    }
}).listen(8080); */

// maps file extention to MIME types
// full list can be found here: https://www.freeformatter.com/mime-types-list.html
const mimeType = {
    '.ico': 'image/x-icon',
    '.html': 'text/html',
    '.json': 'application/json',
    '.css': 'text/css',
    //'.js': 'text/javascript',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.wav': 'audio/wav',
    '.mp3': 'audio/mpeg',
    '.svg': 'image/svg+xml',
    '.pdf': 'application/pdf',
    '.zip': 'application/zip',
    '.doc': 'application/msword',
    '.eot': 'application/vnd.ms-fontobject',
    '.ttf': 'application/x-font-ttf',

  };

createServer(function (req, res) {
    console.log(`${req.method} ${req.url}`);

    //parse URL
    const parsedURL = url.parse(req.url);
    
    // extract URL path
    // Avoid https://en.wikipedia.org/wiki/Directory_traversal_attack
    // e.g curl --path-as-is http://localhost:9000/../fileInDanger.txt
    // by limiting the path to current directory only
    const sanitizePath = path.normalize(parsedURL.pathname).replace(/^(\.\.[\/\\])+/, '');
    let pathname = path.join(__dirname, sanitizePath);

    console.log(pathname);

    fs.exists(pathname, function (exists) {
        if(!exists){
            //if the file is not found, return 404
            res.statusCode = 404;
            res.end(`File ${pathname} not found!`);
        }

    // if is a directory, then look for index.html
    if (fs.statSync(pathname).isDirectory()) {
        pathname += '/index.html';
      }

    //read file frome file syste.
    fs.readFile(pathname, function (err, data) {
        if(err){
            res.statusCode = 500;
            res.end(`Error getting the file: ${err}.`);
        } else {
            //based ont he URL path, extract hte file extention. 
            const ext =  path.parse(pathname).ext;
            
            // if the file is found, set Content-type and send data
            res.setHeader('Content-type', mimeType[ext] || 'text/plain');
            
            res.end(data);
            }  
        })
    });
 }).listen(parseInt(port));
