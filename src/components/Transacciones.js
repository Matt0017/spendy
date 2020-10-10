import React from 'react';
import FontAwesome from 'react-fontawesome'

import '../styles/Transacciones.css'

class Transacciones extends React.Component {

	render() {

		return (
			<div className={this.props.className + ' transacciones-container'}>
				<div className='titulo-container'>
					<div className='titulo'>
						<span>Viaje a Mar del Plata</span>
					</div>
					<div className='codigo'>
						<span>Codigo: </span>
						<span>s92n392sje</span>
					</div>
				</div>
				<div className='barra-principal'>
					<div className='ingresos'>
						<div className='organizador'>
							<FontAwesome className='icon' size='2x' name='plus-circle'/>
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
					<div className='gastos'>
						<div className='organizador'>
							<FontAwesome className='icon' size='2x' name='minus-circle'/>
							<div className='text'>Agregar gasto</div>
						</div>
					</div>
				</div>
				<div className='buscador'>
					
				</div>
				<div className='lista'>
					
				</div>
			</div>
		);
	}
}

export default Transacciones;