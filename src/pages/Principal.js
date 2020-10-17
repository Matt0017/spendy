import React from 'react';
import Dashboard from '../components/Dashboard';
import NavBar from '../components/NavBar';

import "../styles/App.css"
import "../styles/Principal.css"

class Principal extends React.Component {

	render() {
		return (
			<div className='fill principal'>
				<NavBar></NavBar>
				<Dashboard></Dashboard>
			</div>
		);
	}
}

export default Principal;