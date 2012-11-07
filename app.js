var express = require('express');
var ejs     = require('ejs');
var io      = require('socket.io');
var app     = express();
var port    = 3000;
var host    = "example.com";

app.configure(function(){
    app.use(express.static(__dirname + '/static'));
});

app.set('view engine', 'ejs');
app.set('view options', {layout: false});

app.get('/', function(req, res) {
    console.log('GET /');
    res.render('index', { locals: { port: port } });
});

var socket = io.listen(app.listen(port));

socket.on('connection', function(client) {
    client.send("someone login now.");
    client.broadcast.send("someone login now.");
    client.on('message', function(msg) {
        client.send(msg);
        client.broadcast.send(msg);
    });
    client.on('disconnect', function() {
        console.log('disconnect');
    });
});

console.log('Server running at http://' + host + ':' + port + '/');
