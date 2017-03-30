import React, { Component } from 'react';

import Digit from './Digit';

export default class DigitGroup extends Component {

	render() {
		return (
			<div className="col-md-3 digit-group">
				<Digit/>
				<Digit/>
			</div>
		);
	}
}
