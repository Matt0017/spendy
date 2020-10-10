import React from 'react';

import '../styles/Dashboard.css'
import Transacciones from './Transacciones';

class Dashboard extends React.Component {

	render() {

		return (
			<div style={{overflowY: 'auto'}} className='fill'>
				<div className='dashboard'>
					<Transacciones className='card trans-card'></Transacciones>
					<div className='card estadistica-card'>
						estadistica
					</div>
				</div>
			</div>
		);
	}
}

export default Dashboard;