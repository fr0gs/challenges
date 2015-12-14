var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);


io.on('connection', function(socket) {
	console.log('New User');
	socket.on('disconnect', function() {
		console.log('User Disconnection');	
	});
});

io.on('justarrived', function(data) {
	console.log(data.msg);
});

http.listen(3000, function(){
	  console.log('listening on *:3000');
});
