const express = require('express');
const app     = express();
const http    = require('http').Server(app);
const io      = require('socket.io')(http);
const path    = require('path');

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/client/index.html');
});

app.use(express.static(path.join(__dirname + '/client')));

const port = process.env.PORT || 2000;
http.listen(port,function(){
	console.log('Server started: http://localhost:2000/');
});


io.on('connection', function(socket){
	console.log('user connected: ', socket.id);
});

