import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import '../styles/TransaccionDetalle.css'

class TransaccionDetalle extends React.Component {

	render() {
		/** @type {Transaccion} */
		const trans = this.props.transaccion;
		const closeFunc = this.props.closeFunc;

		if (trans == null) {
			return <div></div>
		}

		return (
			<div className='floating-container transaccion-detalle'>
				<div className='titulo' style={{color: trans.categoria.color}}>
					<div className='organizador'>
						<FontAwesomeIcon icon={trans.categoria.icono} size='2x'/>
						<span className='texto'>{trans.categoria.nombre}</span>
					</div>
				</div>
				<div className='info'>
					<div>
						<b>Ingresado por:</b> Juan Manuel
					</div>
					<div>
						<b>Fecha:</b> {trans.fechaString}
					</div>
					<div className='descripcion'>
						<b>Descripción:</b> <br/>Muchasas asdjasldnas as ads a  adasda sd asda  dasdasdasd ads 
						asdads asda  asdasdasd asd ads as dasdasds asdasdasd asd  asdadsasd.
					</div>
				</div>
				<div className='buttons'>
					<button className='atras button-p' onClick={() => {closeFunc();}}>Volver</button>
					<button className='eliminar button-s'>Eliminar</button>
				</div>
			</div>
		);
	}
}

export default TransaccionDetalle;