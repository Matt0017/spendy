import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom'

import '../styles/NavBar.css';
import Logo from '../images/logo.png';
import { copyToClipboard } from '../App';

export default class NavBar extends React.Component {

	constructor() {
		super();
		this.state = {
			fondoActual: { name: 'Personal', codigo: "28d94j24b"},
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
						<div className='back'>
							<FontAwesomeIcon style={{margin: 'auto'}} size='1x' icon='arrow-left'/>
						</div>
						<div className='text'>{this.state.fondoActual.name}</div>
					</div>
					<div className='fondo-options'>
						<div className='fondo-codigo'>
							<span>codigo: </span><span>{this.state.fondoActual.codigo}</span>
							<FontAwesomeIcon className='icon' size='1x' icon={['far','copy']}
								onClick={
									() => {
										copyToClipboard(this.state.fondoActual.codigo);
										alert("Se copió el código del fondo con exito.");
									}
								}/>
						</div>
						<div className='moneda-selection'>

						</div>
					</div>
					<div className='links-list noselect'>
						<Link to='/Movimientos'>
							<div className='organizer'>
								<FontAwesomeIcon className='icon' size='2x' icon='wallet'/>
								<div className='text'>movimientos</div>
							</div>
						</Link>
						<Link to='/Estadisticas'>
							<div className='organizer'>
								<FontAwesomeIcon className='icon' size='2x' icon={['far','chart-bar']}/>
								<div className='text'>Estadísticas</div>
							</div>
						</Link>
						<Link to='/Limites'>
							<div className='organizer'>
								<FontAwesomeIcon className='icon' size='2x' icon='money-bill-wave'/>
								<div className='text'>limites y objetivos</div>
							</div>
						</Link>
					</div>
					<Link to='/' className='cerrar-sesion'><button className='button-alt fill'>Cerrar Sesión</button></Link>
				</div>
			</div>
		);
	}
}