import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import '../styles/TransaccionItem.css'
import NumberFormat from 'react-number-format';

export default class TransaccionItem extends React.Component {

	render() {

		/** @type {Transaccion} */
		let trans = this.props.transaccion;

		let monto = (trans.isGasto() ? "-" : "+") + '$' + Math.abs(trans.monto);

		return (
			<div className='transaccion'>
				<div className='fecha'>
					{trans.get_fechaString()}
				</div>
				<div className='categoria'>
					<div className='organizador' style={{color: trans.categoria.color}}>
						<FontAwesomeIcon icon={trans.categoria.icono} size='2x' fixedWidth/>
						<span className='categoria-nombre'>{trans.categoria.nombre}</span>
					</div>
				</div>
				<div className={'monto ' + (trans.isGasto() ? "gasto" : "ingreso")}>
					<NumberFormat value={monto} displayType='text' thousandSeparator='.' decimalSeparator=',' decimalScale={2} fixedDecimalScale={true} prefix={this.props.moneda}/>
				</div>
			</div>
		);
	}
}