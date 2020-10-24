const express = require('express');
const http = require('http');
const dotenv = require('dotenv');
const path = require('path');
const httpStatusCodes = require('http-status-codes');
const router = require('./common/app.router');

const app = express();
const server = http.createServer(app);

global.appRoot = path.resolve(__dirname);
dotenv.config({ path: appRoot + '/../.env' })
global.HttpStatus = httpStatusCodes;
global.server = server;

const PORT = process.env.PORT || 3010;
const exitTimeout = 15000;

//dependacies
const socketio = require('./common/socket/socket.io');


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));



//custom res functions
app.use(function(req, res, next) {
    res.bhejdo = function(status, body = {}) {
        if (status == HttpStatus.INTERNAL_SERVER_ERROR) {
            const msg = '<p>Oops! Something went wrong 😞</p>';
            if (body && body.stack) {
                return res.status(status).send({ success: false, msg: msg, err: body.stack });
            } else if (body) {
                return res.status(status).send(body);
            } else {
                return res.status(status).send({ success: false, msg: msg });
            }
        } else if (status == HttpStatus.REQUEST_TOO_LONG) {
            return res.status(status).send({ success: false });
        } else {
            if (body && body.msg && req.method == 'DELETE') {}
            return res.status(status).send(body);
        }
    };
    res.fileBhejdo = function(filePath, fileName) {
        const exists = fs.existsSync(filePath);
        if (exists) {
            res.download(filePath, fileName);
        } else {
            body = { success: false, msg: 'File not found' };
            const status = HttpStatus.NOT_FOUND;
            log.logResponse(req, res, body, status);
            res.status(status).send(body);
        }
    };
    res.bufferBhejdo = function(buffer, fileName) {
        res.setHeader('Content-Disposition', contentDisposition(fileName));
        const status = HttpStatus.OK;
        return res.status(status).send(buffer);
    };
    res.binaryBhejdo = function(data, content_type) {
        res.writeHead(200, { 'Content-Type': content_type });
        res.end(data, 'binary');

    };
    res.compressedBhejdo = function(status, body) {
        zlib.deflate(body, { level: 9, memLevel: 9 }, function(err, buffer) {
            console.log(buffer.length + ' bytes of data sent after compression');
            if (err) throw err;
            res.writeHead(status, {
                'Content-Encoding': 'deflate',
                'Content-Type': 'text/javascript'
            });
            return res.end(buffer);
        });
    };
    next();
});


//base router
app.use('/chat/api/v1', router);

app.use(function(req, res, next) {
    // next(createError(404));
    res.bhejdo(HttpStatus.NOT_FOUND, { success: false, msg: 'Failed to find the resource ' + req.url });

});

let connections = [];
server.listen(PORT, () => {
    server.on('connection', connection => {
        connections.push(connection);
        connection.on('close', () => connections = connections.filter(curr => curr !== connection));
    });

    process.send = process.send || function() {};
    process.send('ready');
    console.log(`[Chat : ${process.pid}] Express server listening on port ${server.address().port}`);
});

process.on('SIGINT', () => {
    console.log(`[Chat : ${process.pid}] Received SIGINT`);
    console.log(`[Chat : ${process.pid}] Shutting down server gracefully on port ${server.address().port}`);

    server.close(() => {
        console.log(`[Chat : ${process.pid}] Server closed for incoming connections`);
        setTimeout(() => {
            console.log(`[Chat : ${process.pid}] Current connections being processed = ${connections.length}`);
            if (connections.length === 0) {
                console.log(`[Chat : ${process.pid}] Exiting process`);
                process.exit(0);
            }
        }, exitTimeout);
    });
});


module.exports = app;