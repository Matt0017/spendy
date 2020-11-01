import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Popup from 'reactjs-popup';

import TransaccionItem from './TransaccionItem.js';
import TransaccionDetalle from './TransaccionDetalle.js';

// TODO volaria de aca
import Transaccion from '../classes/Transaccion.js';

import '../styles/TransaccionesCard.css'
import CargaGastos from './CargaGastos.js';
import CargaIngresos from './CargaIngresos.js';
import { getTransacciones } from '../services/apiRoutes.js';
import BotonFlotante from './BotonFlotante.js';


class TransaccionesCard extends React.Component {
	constructor() {
		super();

		this.state = {
			detailOpen: false,
			transaccionSeleccionada: null,
			gastosOpen: false,
			transacciones: [],
			ingresosOpen: false,
			fondoActual: JSON.parse(sessionStorage.getItem('fondo'))
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
		const fondo = JSON.parse(sessionStorage.getItem('fondo'));
		const trans = await getTransacciones(fondo.idFondo,'pesos');
		var transObjetos = trans.map(
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
		debugger
		return (
			<div className={this.props.className + ' transacciones-container'}>
				<div className='titulo-container'>
				</div>
				<div className='barra-principal'>
					
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
						<CargaIngresos
							moneda='AR$'
							closeFunc={() => {this.closeAgregarIngreso()}}/>
					</Popup>
				</div>
				<BotonFlotante openIngresoFn={ () => { this.openAgregarIngreso(); } } openGastoFn={ () => { this.openAgregarGasto(); } }></BotonFlotante>
			</div>
		);
	}
}

export default TransaccionesCard;

{/* <div className='gastos' onClick={() => {this.openAgregarGasto();}}></div>
	<div className='ingresos' onClick={() => {this.openAgregarIngreso();}}></div> */}