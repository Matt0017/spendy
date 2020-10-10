import React from 'react';

import '../styles/NavBar.css'
import white_plus from '../images/white_plus.png'

import FontAwesome from 'react-fontawesome'

import '../styles/Transacciones.css'


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
			<div>
				<div className='header'>
					<div className='open-icon' onClick={this.openNavBar}>
						<FontAwesome size='2x' name='bars'/>
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