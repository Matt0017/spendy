import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Popup from 'reactjs-popup';

import Categorias from './Categorias.js';

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

		let fondos = ['Personal', 'Viajardo a Nombre Larguisimo', 'Test de Altura', 'Test de Altura', 'Test de Altura', 'Test de Altura', 'Test de Altura',
						'Test de Altura','Test de Altura','Test de Altura','Test de Altura', 'Test de Altura', 'Test de Altura', 'Test de Altura', 'Test de Altura Final'];

		return (
			<div className='navbar-container'>
				<div className='header'>
					<div className='open-icon' onClick={this.openNavBar}>
						<FontAwesomeIcon size='2x' icon='bars'/>
					</div>
					<div className='spendy-icon'>
						<img src={Logo} className='logo'></img>
					</div>
				</div>
				<div id='navbar' className='spendy-navbar closed'>
					<div className='logo-container'>
						<img src={Logo} className='logo'></img>
					</div>
					<div className='cerrar' onClick={this.closeNavBar}>
						Cerrar
					</div>
					<div className='button-p moving-button nuevo-fondo'>
						<FontAwesomeIcon size='2x' icon='plus' className='image'/>
						<div className='text-container'><div className='text'>Crear Nuevo Fondo</div></div>
					</div>
					<div className='fondos-list-container'>
						<div className='titulo'>
							{/* TODO este es una imagen en realidad */}
							<FontAwesomeIcon className='icono' icon='wallet' size='2x'/>
							<div className='texto'>Fondos</div>
						</div>
						<ul className='fondos-list'>
							{fondos.map(
								(fondo) => {
									return (
										<li key={fondo} className={fondo == this.state.fondoActual ? 'current' : ''} onClick={() => { this.openFondo(fondo); }}>
											{(fondo == this.state.fondoActual ? '> ' : '' ) + fondo}
										</li>
									);
								}
							)}
						</ul>
					</div>
					<div className='button-alt moving-button categorias' onClick={() => {this.openCategorias()}}>
						<FontAwesomeIcon size='2x' icon='list-ul' className='image'/>
						<div className='text-container'><div className='text'>Categorías</div></div>
					</div>
					<Popup open={this.state.categoriaOpen} closeOnDocumentClick onClose={() => {this.closeCategorias()}}>
						<Categorias
							closeFunc={() => {this.closeCategorias()}}/>
					</Popup>
					<div className='button-alt moving-button cerrar-sesion'>
						<FontAwesomeIcon size='2x' icon='sign-out-alt' className='image'/>
						<div className='text-container'><div className='text'>Cerrar Sesión</div></div>
					</div>
				</div>
			</div>
		);
	}
}

export default NavBar;