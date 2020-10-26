import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Transaccion from '../classes/Transaccion';

import '../styles/TransaccionItem.css'

class TransaccionItem extends React.Component {

	render() {

		/** @type {Transaccion} */
		let trans = this.props.transaccion;
		console.log(trans)

		let monto = (trans.isGasto() ? "-" : "+") + '$' + Math.abs(trans.monto);

		return (
			<div className='transaccion'>
				<div className='fecha'>
					{trans.get_fechaString()}
				</div>
				<div className='categoria'>
					<div className='organizador' style={{color: trans.categoria.color}}>
						<FontAwesomeIcon icon={trans.categoria.iconName} size='2x' fixedWidth/>
						<span className='categoria-nombre'>{trans.categoria}</span>
					</div>
				</div>
				<div className={'monto ' + (trans.isGasto() ? "gasto" : "ingreso")}>
					{monto}
				</div>
			</div>
		);
	}
}

export default TransaccionItem;