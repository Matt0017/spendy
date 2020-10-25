import React from 'react';
import DatePicker from "react-datepicker";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Categoria from '../classes/Categoria';

import '../styles/CargaIngresos.css'
import "react-datepicker/dist/react-datepicker.css";

export default class CargaIngresos extends React.Component {

	constructor() {
		super();
		this.state = {
			cat: null,
			date: new Date()
		}
	}

	selectCategory(categoria) {
		this.setState({
			cat: categoria
		});
	}

	render() {
		const supermercado = new Categoria("Supermercado", "shopping-cart", "#F8C29E");
		const mascotas = new Categoria("Mascotas", "paw", "#D6976D");
		const otros = new Categoria("Otros", "question", "#B4BCC2");
		const sueldo = new Categoria("Sueldo", "hand-holding-usd", "#98ECDE");

		const categorias = [supermercado, mascotas, otros, sueldo, supermercado, mascotas, otros, sueldo, supermercado ]

		return (
			<div className='floating-container carga-ingresos'>
				<div className='titulo'>
					<h3>Cargar Transaccion</h3>
					<span>Ingresa el monto y la categoria de tu transacción</span>
				</div>
				<div className='amount'>
					<div className='moneda'>{this.props.moneda}</div>
					<input className='cantidad-input' placeholder='0' type='number' min={0}/>
					<FontAwesomeIcon className='delete-button' size='2x' icon='backspace'/>
				</div>
				<div className='category-selection'>
					{
						categorias.map(
							(categoria) => {
								const selected = this.state.cat != null && this.state.cat.name === categoria.name;
								return (
									<div 
									style={{backgroundColor: selected? categoria.color : 'white'}}
									className={'categoria-item ' + (selected? 'selected' : '')}
									onClick={() => {this.selectCategory(categoria)}}>
										<div className='organizer'>
											<div className='icon-container'>
												<FontAwesomeIcon color={selected? 'white' : categoria.color} className='icon' icon={categoria.iconName} size='2x'/>
											</div>
											<div style={{color: selected? 'white' : categoria.color}} className='texto'><span>{categoria.name}</span></div>
										</div>
									</div>
								);
							}
						)
					}
				</div>
				<div className='description-title'>Fecha</div>
				<div className='fecha'>
					<DatePicker
						className='date-picker'
						selected={this.state.date}
						onChange={(date) => {
							this.setState({ date: date })
						}}/>
				</div>
				<div className='description-title'>Notas</div>
				<textarea className='description' maxLength={140}/>
				<div className='buttons'>
					<button className='button-p confirmar'>Confirmar</button>
					<button className='button-s cancelar'>Cancelar</button>
				</div>
			</div>
		);
	}
}