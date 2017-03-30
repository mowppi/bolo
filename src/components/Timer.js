import React, { Component } from 'react';

import Digit from './Digit';

export default class Timer extends Component {

	constructor(props) {
		super(props);
		this.state = {
			currentTime: new Date(),
			digits: {}
		};
	}

	componentDidMount() {
		this.timerID = setInterval(
			() => this.tick(), 
			1000
		);
		this.tick();
	}

	tick() {
		let diff = this.props.endTime.getTime() - this.state.currentTime.getTime();
		// var diff = this.props.endTime - this.state.currentTime;
		// console.log(this.props.endTime)

		let values = {
			seconds: Math.floor( (diff/1000) % 60 ),
			minutes: Math.floor( (diff/1000/60) % 60 ),
			hours: Math.floor( (diff/(1000*60*60)) % 24 ),
			days: Math.floor( diff/(1000*60*60*24) )
		}

		this.setState({
			currentTime: new Date(),
			digits: values
		});

		// console.log(this.state);
	}

	render() {

		return (
			<div id="timer">
				<Digit digits={this.state.digits.days}/>
				<Digit digits={this.state.digits.hours}/>
				<Digit digits={this.state.digits.minutes}/>
				<Digit digits={this.state.digits.seconds}/>
			</div>
		);
	}
}
