import React from 'react';

import '../styles/Dashboard.css'
import TransaccionesCard from './TransaccionesCard';

class Dashboard extends React.Component {

	render() {

		return (
			<div style={{overflowY: 'auto'}} className='fill'>
				<div className='dashboard'>
					<TransaccionesCard className='spendy-card trans-card'></TransaccionesCard>
					<div className='spendy-card estadistica-card'>
						estadistica
					</div>
				</div>
			</div>
		);
	}
}

export default Dashboard;