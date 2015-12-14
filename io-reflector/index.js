var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);


io.on('connection', function(socket) {
	console.log('[+] new user connected');
	socket.on('justarrived', function(msg) {
		console.log(msg);	
	});
});

//io.on('justarrived', function(data) {
//	console.log(data.msg);
//});

http.listen(3000, function(){
	  console.log('listening on *:3000');
});
