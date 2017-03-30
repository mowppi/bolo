import React, { Component } from 'react';

export default class Menu extends Component {

	render() {
		return (
			<div className="menu">
				<ul className="link-arrow">
					<li><a className="list-item" href="http://eu.battle.net/d3/en/?-" target="_blank">Battle Net</a></li>
					<li><a className="list-item" href="https://www.reddit.com/r/Diablo/" target="_blank">Reddit</a></li>
					<li><a className="list-item" href="http://www.diablofans.com/" target="_blank">Diablo Fans</a></li>
				</ul>
		  	</div>
		);
	}
}
