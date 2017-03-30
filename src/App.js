import React, { Component } from 'react';

import Menu from './components/Menu';
import Timer from './components/Timer';
import Chat from './components/Chat';
// import io from 'socket.io-client';

/*const socketIo = io.connect(window.location.host, { reconnect: true });
socketIo.on('connect', () => {
  console.log('socket connected');
});*/

export default class App extends Component {

	constructor(props) {
		super(props);
		this.state = {
			info: []
		};
	}

	render() {
		let endDate = new Date('2017-03-31T16:00:00Z');
		return (
			<div className="row m40-no-xs h100">
				<div className="col-md-3 col-sm-4 hide-xs">
					<Menu />
				</div>
				<div className="col-md-4 col-md-offset-1 col-sm-4 col-xs-12 select-none" style={{position: 'relative'}}>
					<Timer endTime={endDate}/>
				</div>
				<div className="col-md-4 col-sm-4 col-xs-12 h100">
					<Chat />
				</div>
			</div>
		);
	}
}
