import React from 'react';

import '../styles/NavBar.css'

import white_plus from '../images/white_plus.png'

class NavBar extends React.Component {

	render() {

		return (
			<div className='navbar'>
				<div>
					IMAGEN
				</div>
				<div className='button-p moving-button nuevo-fondo'>
					<img src={white_plus} className='image'></img>
					<div className='text-container'><div className='text'>Crear Nuevo Fondo</div></div>
				</div>
				<div className='fondos-list'>

				</div>
				<div className='button-alt moving-button cerrar-sesion'>
					<img src={white_plus} className='image'></img>
					<div className='text-container'><div className='text'>Cerrar Sesion</div></div>
				</div>
			</div>
		);
	}
}

export default NavBar;