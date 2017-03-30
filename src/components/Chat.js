import React, { Component } from 'react';
import io from 'socket.io-client';

export default class Chat extends Component {

	constructor(props) {
		super(props);
		this.state = {
			message: '',
			author: '',
			connectedUsers: []
		};
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.checkCommand = this.checkCommand.bind(this);
		this.execCommand = this.execCommand.bind(this);
	}

	componentDidMount() {

		this.socket = io();
		this.socket.on('chat message', (msg) => {
			$('.message-area').prepend(msg);
		});
		this.socket.on('user joined', (user) => {

			let connectedUsers = this.state.connectedUsers;
			connectedUsers.push(user);
			this.setState({connectedUsers: connectedUsers});
			console.log(this.state)

			let html = [
				'<div class="message info">',
				'<span class="message-author">',
				'Console',
				'</span>',
				':&nbsp;',
				'<span class="message-content">',
				user,
				' has joined the chat.',
				'</span>',
				'</div>'
			].join('');
			$('.message-area').prepend(html);
		});

		this.socket.on('this socket connected', (user, allUsers) => {
			console.log(allUsers)
			let connectedUsers = this.state.connectedUsers;
			connectedUsers.push(user);
			this.setState({
				author: user,
				connectedUsers: connectedUsers
			});
		});

		this.socket.on('user connected', (user, allUsers) => {
			let connectedUsers = this.state.connectedUsers;
			connectedUsers.push(user);
			this.setState({connectedUsers: connectedUsers});
			console.log(this.state)

			let html = [
				'<div class="message info">',
				'<span class="message-author">',
				'Console',
				'</span>',
				':&nbsp;',
				'<span class="message-content">',
				user,
				' has joined the chat.',
				'</span>',
				'</div>'
			].join('');
			$('.message-area').prepend(html);
		});

		this.socket.on('user disconnected', (user, allUsers) => {
			this.setState({connectedUsers: allUsers});

			let html = [
				'<div class="message info">',
				'<span class="message-author">',
				'Console',
				'</span>',
				':&nbsp;',
				'<span class="message-content">',
				user,
				' has disconnected from the chat.',
				'</span>',
				'</div>'
			].join('');
			$('.message-area').prepend(html);
		});

		this.socket.on('name changed', (oldName, newName, allUsers) => {
			this.setState({connectedUsers: allUsers});

			let html = [
				'<div class="message info">',
				'<span class="message-author">',
				'Console',
				'</span>',
				':&nbsp;',
				'<span class="message-content">',
				oldName,
				' has changed name to: ',
				newName,
				'.</span>',
				'</div>'
			].join('');
			$('.message-area').prepend(html);
		});

		// let randomUser = 'User' + Math.floor((Math.random() * 99999) + 1);
		// set random name
		/*let connectedUsers = this.state.connectedUsers;
		connectedUsers.push(randomUser);
		this.setState({
			author: randomUser,
			connectedUsers: connectedUsers
		},
		() => {
			this.socket.emit('user joined', this.state.author);
			console.log(this.state)
		});*/

	}

	checkCommand() {
		let commandList = ['name'];
		let re = new RegExp('^\/(' + commandList.join('|') + ') {1}(.*)', 'g');

		let command = re.exec(this.state.message);

		if (!command) {
			return false
		} else {
			this.execCommand.apply(this, [command[1], command[2]]);
			this.setState({message: ''});
			return true;
		}
	}

	execCommand() {
		let action = arguments[0];
		switch(action) {
			case 'name':
				let oldName = this.state.author;
				this.setState({author: arguments[1]});
				console.log(oldName, arguments[1])
				this.socket.emit('name changed', oldName, arguments[1]);
				break;
			case 'help':
				console.log('help')
				break;
		}
	}

	handleSubmit(e) {
		e.preventDefault();
		if ($.trim(this.state.message) === '')
			return false;

		if (this.checkCommand()) 
			return false;

		let html = [
			'<div class="message">',
			'<span class="message-author">',
			this.state.author,
			'</span>',
			':&nbsp;',
			'<span class="message-content">',
			this.state.message,
			'</span>',
			'</div>'
		].join('');

		$('.message-area').prepend(html);

		this.socket.emit('chat message', html);

		this.setState({message: ''});
	}

	handleChange(e) {
		this.setState({message: e.target.value});
	}

	render() {

		return (
			<div id="chat" className="chat">
				<div className="message-area">
					<div className="message">
						<p>
							<span className="message-author">Moppi</span>
							:&nbsp;
							<span className="message-content">Hello world!</span>
						</p>
					</div>
				</div>
				<div className="col-xs-12">
					<form className="message-form input-group message-input-container" onSubmit={this.handleSubmit}>
						<input type="text" className="message-input form-control" placeholder="Write message..." value={this.state.message} onChange={this.handleChange}/>
						<span className="input-group-btn">
							<button type="submit" className="input-submit-btn btn btn-default">Send</button>
						</span>
					</form>
				</div>
			</div>
		);
	}
}
