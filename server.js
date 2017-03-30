var express = require('express');
var app = express();
var path = require('path');
app.use(express.static(path.resolve(__dirname, 'public')));
var http = require('http').Server(app);
var io = require('socket.io')(http);
var environment = process.env.NODE_ENV || 'development';

var allClients = [];

function findClientByName(name) {
	var idx;
	allClients.some((client, i) => {
		if (client.name === name) {
			idx = i;
			return true
		}
	});
	return allClients[idx];
}

io.on('connection', (socket) => { 
	console.log('new socket connection'); 

	let randomUser = 'User' + Math.floor((Math.random() * 99999) + 1);
	allClients.push({name: randomUser, socket: socket});

	let nameArr = allClients.map(function(sObj){
		return sObj.name;
	});

	socket.emit('this socket connected', randomUser, nameArr);
	socket.broadcast.emit('user connected', randomUser, nameArr);

	socket.on('disconnect', () => {
		console.log('user disconnected')

		var idx;
		allClients.some((client, i) => {
			if (client.socket === socket) {
				idx = i;
				return true
			}
		});
		disconnectedUser = allClients[idx].name;
		allClients.splice(idx, 1);

		let nameArr = allClients.map(function(sObj){
			return sObj.name;
		});

		socket.broadcast.emit('user disconnected', disconnectedUser, nameArr);
	});
	socket.on('chat message', (msg) => {
		socket.broadcast.emit('chat message', msg);
	});
	socket.on('user joined', (user) => {
		socket.broadcast.emit('user joined', user);
	});
	socket.on('name changed', (oldName, newName) => {
		let client = findClientByName(oldName);
		client.name = newName;
		let nameArr = allClients.map(function(sObj){
			return sObj.name;
		});
		io.emit('name changed', oldName, newName, nameArr);
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

