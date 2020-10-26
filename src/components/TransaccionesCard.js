import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Popup from 'reactjs-popup';

import TransaccionItem from './TransaccionItem.js';
import TransaccionDetalle from './TransaccionDetalle.js';

// TODO volaria de aca
import Transaccion from '../classes/Transaccion.js';
import Categoria from '../classes/Categoria.js';

import '../styles/TransaccionesCard.css'
import CargaGastos from './CargaGastos.js';
import { getTransacciones } from '../services/apiRoutes.js';
import CargaIngresos from './CargaIngresos.js';

class TransaccionesCard extends React.Component {
	constructor() {
		super();

		this.state = {
			detailOpen: false,
			transaccionSeleccionada: null,
			gastosOpen: false,
			transacciones: [],
			ingresosOpen: false
		}
	}

	openDetalleTransaccion(transaccion) {
		this.setState({
			detailOpen: true,
			transaccionSeleccionada: transaccion
		})
	}
	closeDetalleTransaccion() {
		this.setState({
			detailOpen: false
		});
	}

	openAgregarGasto() {
		this.setState({
			gastosOpen: true
		});
	}
	closeAgregarGasto() {
		this.setState({
			gastosOpen: false
		});
	}


	async componentDidMount(){
		const trans = await getTransacciones(22,'pesos');
		var transObjetos = trans[0].map(
			(index) => {
				return (
					new Transaccion(index.idTransaccion, index.fecha, index.nombre_categoria, index.dinero)
					
				);
			}
		);
		this.setState({
			transacciones: transObjetos
		})
	}
	
	openAgregarIngreso() {
		this.setState({
			ingresosOpen: true
		});
	}
	closeAgregarIngreso() {
		this.setState({
			ingresosOpen: false
		});
	}

	render() {

		let supermercado = new Categoria("Supermercado", "shopping-cart", "#F8C29E");
		let mascotas = new Categoria("Mascotas", "paw", "#D6976D");
		let otros = new Categoria("Otros", "question", "#B4BCC2");
		let sueldo = new Categoria("Sueldo", "hand-holding-usd", "#98ECDE");

		// let transaccionesList = [
		// 	new Transaccion(0, new Date(2020, 7, 21), supermercado, -550, "AR$"),
		// 	new Transaccion(1, new Date(2020, 7, 22), supermercado, -150, "AR$"),
		// 	new Transaccion(2, new Date(2020, 7, 23), mascotas, -1200, "AR$"),
		// 	new Transaccion(3, new Date(2020, 7, 25), otros, -300, "AR$"),
		// 	new Transaccion(4, new Date(2020, 7, 27), supermercado, -200, "AR$"),
		// 	new Transaccion(5, new Date(2020, 8, 2), sueldo, 55000, "AR$"),
		// 	new Transaccion(6, new Date(2020, 8, 4), mascotas, -2500, "AR$"),
		// 	new Transaccion(7, new Date(2020, 8, 5), mascotas, -450, "AR$"),
		// 	new Transaccion(8, new Date(2020, 8, 6), otros, -500, "AR$"),
		// 	new Transaccion(9, new Date(2020, 8, 8), otros, -1300, "AR$"),
		// 	new Transaccion(10, new Date(2020, 8, 12), supermercado, -750, "AR$"),
		// 	new Transaccion(5, new Date(2020, 8, 2), sueldo, 55000, "AR$"),
		// ]

		return (
			<div className={this.props.className + ' transacciones-container'}>
				<div className='titulo-container'>
					<div className='titulo'>
						<span>Viaje a Mar del Plata</span>
					</div>
					<div className='codigo'>
						<span>Código: </span>
						<span>s92n392sje</span>
					</div>
				</div>
				<div className='barra-principal'>
					<div className='ingresos' onClick={() => {this.openAgregarIngreso();}}>
						<div className='organizador'>
							<FontAwesomeIcon icon='plus-circle' size='2x' className='icon'/>
							<div className='text'>Agregar ingreso</div>
						</div>
					</div>
					<div className='selector-moneda'>
						<div className='organizador'>
							<div className='moneda'>
								AR$ 
							</div>
							<div className='total-actual'>
								<span className='full'>24.500</span>
								<span className='cents'><sup>50</sup></span>
							</div>
						</div>
					</div>
					<div className='gastos' onClick={() => {this.openAgregarGasto();}}>
						<div className='organizador'>
							<FontAwesomeIcon className='icon' size='2x' icon='minus-circle'/>
							<div className='text'>Agregar gasto</div>
						</div>
					</div>
				</div>
				<div className='buscador-container'>
					<div className='buscador-organizer'>
						<input placeholder='Buscar' className='buscador'/>
						<FontAwesomeIcon className='buscador-icon' icon='search'/>
					</div>
				</div>
				<div className='lista-container'>
					<ul className='lista'>
						{this.state.transacciones.map(
							(value, index) => {
								return (
									<li key={index} className='transaccion-li' onClick={() => { this.openDetalleTransaccion(value); }}>
										<TransaccionItem transaccion={value}/>
									</li>
								);
							}
						)}
					</ul>
					<Popup open={this.state.detailOpen} className='transaccion-popup' onClose={() => {this.setState({ detailOpen: false })}}>
						<TransaccionDetalle
							transaccion={this.state.transaccionSeleccionada}
							closeFunc={() => {this.closeDetalleTransaccion()}}/>
					</Popup>
					<Popup open={this.state.gastosOpen} className='cargar-gastos-popup' onClose={() => {this.setState({ gastosOpen: false })}}>
						<CargaGastos
							moneda='AR$'
							closeFunc={() => {this.closeAgregarGasto()}}/>
					</Popup>
					<Popup open={this.state.ingresosOpen} className='cargar-ingresos-popup' onClose={() => {this.setState({ ingresosOpen: false })}}>
						<CargaGastos
							moneda='AR$'
							closeFunc={() => {this.closeAgregarIngreso()}}/>
					</Popup>
				</div>
			</div>
		);
	}
}

export default TransaccionesCard;