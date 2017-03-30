var express = require('express');
var app = express();
var path = require('path');
app.use(express.static(path.resolve(__dirname, 'public')));
var http = require('http').Server(app);
var io = require('socket.io')(http);
var environment = process.env.NODE_ENV || 'development';

io.on('connection', (socket) => { 
	console.log('new socket connection'); 
	socket.on('disconnect', () => {
		console.log('user disconnected')
	});
	socket.on('chat message', (msg) => {
		socket.broadcast.emit('chat message', msg);
	});
	socket.on('user joined', (user) => {
		socket.broadcast.emit('user joined', user);
	});
});

http.listen(3000, () => { 
	console.log('server listening on 3000'); 
});

if (environment !== 'production') {
	var webpack = require('webpack');
	var WebpackDevServer = require('webpack-dev-server');
	var config = require('./webpack.config');

	new WebpackDevServer(webpack(config), {
		publicPath: '/static/',
		hot: true,
		historyApiFallback: true,
    	proxy: { '*': 'http://localhost:3000' }
	}).listen(3001, 'localhost', function (err, result) {
		if (err) {
			return console.log(err);
		}
		console.log('Listening at http://localhost:3001/');
	});
}

