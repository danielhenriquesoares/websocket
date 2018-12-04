let app = require('express')(),
http = require('http').Server(app),
io = require('socket.io')(http),
count = 0,
nickUsers = [];

const nickName = "GUEST";

/*app.get('/', function(req, res) {
    res.send('<h1>Hello world</h1>');
});*/

io.on("disconnection", function(socket) {
	console.log("disconnection");
	
});

io.on('connection', function(socket){
	console.log('a user connected');
	/* socket.on('disconnect', function() {
		console.log("user disconnected");
	}); */
	/* if (nickUsers.indexOf(nickName + count) < 0) {
		let msg = nickName + count;
		nickUsers.push(msg);
		socket.broadcast.emit('logged user', msg);

		count ++;
	} */

	socket.on('disconnect', function() {
		console.log("disconnect", count);
		
	});


	let msg = {
		"nickname": nickName + count,
		"id": count
	};
	//socket.broadcast.emit('logged user', msg);
	io.emit('logged user', JSON.stringify(msg));
	count ++;

	socket.on('chat message', function(msg) {
		// io.emit('chat message', msg); envia para todos os sockets
		socket.broadcast.emit('chat message', msg);
	});
});

http.listen(3000, function() {
    console.log('listening on *:3000');
});