import React from 'react';

import '../styles/NavBar.css'
import white_plus from '../images/white_plus.png'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class NavBar extends React.Component {

	openNavBar() {
		const navbar = document.getElementById('navbar');
		navbar.classList.remove('close');
		navbar.classList.add('open');
	}

	closeNavBar() {
		const navbar = document.getElementById('navbar');
		navbar.classList.add('close');
		navbar.classList.remove('open');
	}

	render() {

		return (
			<div style={{ zIndex: 1 }}>
				<div className='header'>
					<div className='open-icon' onClick={this.openNavBar}>
						<FontAwesomeIcon size='2x' icon='bars'/>
					</div>
					<div className='spendy-icon'>

					</div>
				</div>
				<div id='navbar' className='navbar close'>
					<div className='icono'>
						IMAGEN
					</div>
					<div className='cerrar' onClick={this.closeNavBar}>
						Cerrar
					</div>
					<div className='button-p moving-button nuevo-fondo'>
						<img src={white_plus} className='image'></img>
						<div className='text-container'><div className='text'>Crear Nuevo Fondo</div></div>
					</div>
					<div className='fondos-list'>
						<div className='titulo'>
							{/* TODO este es una imagen en realidad */}
							<FontAwesomeIcon className='icono' icon='wallet' size='2x'/>
							<div className='texto'>Fondos</div>
						</div>
					</div>
					<div className='button-alt moving-button cerrar-sesion'>
						<img src={white_plus} className='image'></img>
						<div className='text-container'><div className='text'>Cerrar Sesion</div></div>
					</div>
				</div>
			</div>
		);
	}
}

export default NavBar;