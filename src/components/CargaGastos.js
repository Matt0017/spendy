import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import '../styles/CargaGastos.css'

export default class CargaGastos extends React.Component {

	render() {
		return (
			<div className='floating-container carga-gastos'>
				<div className='titulo'>
					<h3>Cargar Transaccion</h3>
					<span>Ingresa el monto y la categoria de tu transacción</span>
				</div>
				<div className='amount'>
					<div className='moneda'>{this.props.moneda}</div>
					<input className='cantidad-input' placeholder='0' type='number'/>
					<FontAwesomeIcon className='delete-button' size='2x' icon='backspace'/>
				</div>
			</div>
		);
	}
}