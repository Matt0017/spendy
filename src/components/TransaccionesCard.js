import React from 'react';
import { GlobalContext } from '../controllers/Context.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Popup from 'reactjs-popup';
import TransaccionItem from './TransaccionItem.js';
import TransaccionDetalle from './TransaccionDetalle.js';
import CargaGastos from './CargaGastos.js';
import CargaIngresos from './CargaIngresos.js';
import BotonFlotante from './BotonFlotante.js';
import '../styles/TransaccionesCard.css'

class TransaccionesCard extends React.Component {
	static contextType = GlobalContext;
	
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
		const fondo = this.context.FondosController.getSelected();
		const moneda = this.context.FondosController.getMoneda();
		const transacciones = await this.context.TransaccionesController.getTransacciones(fondo.id, moneda, this.context);
		this.setState({
			transacciones: transacciones
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