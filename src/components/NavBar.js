import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import '../styles/NavBar.css';
import Logo from '../images/logo.png';

class NavBar extends React.Component {

	constructor() {
		super();
		this.state = {
			fondoActual: 'Personal',
			categoriaOpen: false
		}
	}

	openNavBar() {
		const navbar = document.getElementById('navbar');
		navbar.classList.remove('closed');
		navbar.classList.add('open');
	}

	closeNavBar() {
		const navbar = document.getElementById('navbar');
		navbar.classList.add('closed');
		navbar.classList.remove('open');
	}

	openFondo(fondo) {
		this.setState({fondoActual: fondo});
		alert('Cargar las cosas para el fondo: ' + fondo);
	}

	openCategorias() {
		this.setState({categoriaOpen: true});
	}
	closeCategorias() {
		this.setState({categoriaOpen: false});
	}

	render() {

		return (
			<div className='navbar-container'>
				<div className='header'>
					<div className='open-icon' onClick={this.openNavBar}>
						<FontAwesomeIcon size='2x' icon='bars'/>
					</div>
					<div className='spendy-icon'>
						<img src={Logo} alt='logo-spendy' className='logo'></img>
					</div>
				</div>
				<div id='navbar' className='spendy-navbar closed'>
					<div className='logo-container'>
						<img src={Logo} alt='logo-spendy' className='logo'></img>
					</div>
					<div className='cerrar' onClick={this.closeNavBar}>
						Cerrar
					</div>
					<div className='fondo-actual'>
						<FontAwesomeIcon className='back' size='1x' icon='arrow-left'/>
						<span>Fondo Actual</span>
					</div>
					<div className='links-list noselect'>
						<div className='organizer'>
							<FontAwesomeIcon className='icon' size='2x' icon='wallet'/>
							<div className='text'>movimientos</div>
						</div>
						<div className='organizer'>
							<FontAwesomeIcon className='icon' size='2x' icon={['far','chart-bar']}/>
							<div className='text'>Estadísticas</div>
						</div>
						<div className='organizer'>
							<FontAwesomeIcon className='icon' size='2x' icon='money-bill-wave'/>
							<div className='text'>limites y objetivos</div>
						</div>
					</div>
					<button className='button-alt cerrar-sesion'>Cerrar Sesión</button>
				</div>
			</div>
		);
	}
}

export default NavBar;