import React from 'react';
import TransaccionesCard from '../components/TransaccionesCard';
import NavBar from '../components/NavBar';

import "../styles/App.css"
import "../styles/TransaccionesPage.css"
import "../styles/Dashboard.css"

class TransaccionesPage extends React.Component {

	render() {
		return (
			<div className='fill transacciones-page'>
				<NavBar></NavBar>
				<div className='dashboard fill'>
					<TransaccionesCard className='spendy-card trans-card'></TransaccionesCard>
				</div>
			</div>
		);
	}
}

export default TransaccionesPage;