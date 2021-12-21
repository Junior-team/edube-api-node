var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var debug = require('debug')('edube-api-node:server');

var logger = require('morgan');
var port = normalizePort(process.env.PORT || '3000');


var indexRouter = require('./src/index');
var usersRouter = require('./src/User/users');
const http = require("http");


var index = express();

index.use(logger('dev'));
index.use(express.json());
index.use(express.urlencoded({ extended: false }));
index.use(cookieParser());
index.use(express.static(path.join(__dirname, 'public')));

index.use('/', indexRouter);
index.use('/users', usersRouter);



/**
 * Create HTTP server.
 */



/**
 * Listen on provided port, on all network interfaces.
 */
index.set('port', port);

var server = http.createServer(index);


server.listen(port);
server.on('error', onError);
server.on('listening', onListening);



function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    debug('Listening on ' + bind);
}


module.exports = index;


