import React, { Component } from 'react';

export default class Digit extends Component {

	constructor(props) {
		super(props);
		this.state = {};
	}

	handleDigits() {
		let str;
		if (this.props.digits >= 0 && this.props.digits < 10) {
			str = '0' + this.props.digits; 
		} else {
			str = '' + this.props.digits;
		}
		return str;
	}

	render() {
		let handledDigits = this.handleDigits();
		return (
			<div className="digit col-md-3 col-sm-3 col-xs-3">
				<span className="center">{handledDigits}</span>
			</div>
		);
	}
}
