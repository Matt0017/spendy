import React from 'react';
import NavBar from '../components/NavBar';

import "../styles/LimitesYObjetivos.css"
import "../styles/Dashboard.css"

export default class LimitesYObjetivos extends React.Component {

	render() {
		return (
			<div className='fill limites-objetivos'>
				<NavBar></NavBar>
				<div className='dashboard fill'>
				</div>
			</div>
		);
	}
}