import React from 'react';
import DatePicker from "react-datepicker";
import { RadioGroup, RadioButton } from 'react-radio-buttons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Categoria from '../classes/Categoria';

import '../styles/CargaGastos.css'
import "react-datepicker/dist/react-datepicker.css";

export default class CargaGastos extends React.Component {

	constructor() {
		super();
		this.state = {
			showNewCategory: false,
			new_icon: '',
			new_color: '',
			cat: null,
			date: new Date()
		}
	}

	selectCategory(categoria) {
		this.setState({
			cat: categoria
		});
	}

	newCategory() {
		this.setState({
			showNewCategory: true
		});
	}

	selectIcon(icon) {
		this.setState({
			new_icon: icon
		});
	}
	selectColor(color) {
		this.setState({
			new_color: color
		});
	}

	render() {
		const supermercado = new Categoria("Supermercado", "shopping-cart", "#F8C29E");
		const mascotas = new Categoria("Mascotas", "paw", "#D6976D");
		const otros = new Categoria("Otros", "question", "#B4BCC2");
		const sueldo = new Categoria("Sueldo", "hand-holding-usd", "#98ECDE");

		const categorias = [supermercado, mascotas, otros, sueldo, supermercado, mascotas, otros, sueldo, supermercado ]

		return (
			<div className='floating-container carga-gastos'>
				<div className='titulo'>
					<h3>Cargar Gasto</h3>
					<span>Ingresa el monto y la categoria de tu gasto</span>
				</div>
				<div className='amount'>
					<div className='moneda'>{this.props.moneda}</div>
					<input className='cantidad-input' placeholder='0' type='number' min={0}/>
					<FontAwesomeIcon className='delete-button' size='2x' icon='backspace'/>
				</div>
				{
					(this.state.showNewCategory) ? 
					<div className='new-category'>
						<div><input placeholder='Nombre'></input></div>
						<div>Seleccione un icono</div>
						<div className='icons-list'>
							<div style={{width: 'max-content'}}>
								{
									["plus", "paw"].map(
										(icon) => {
											const sel = this.state.new_icon === icon;
											return (
												<div 
												onClick={
													() => {
														this.selectIcon(icon);
													}
												}
												style={{backgroundColor: sel ? 'black' : 'transparent'}}
												className='icon'>
													<div style={{ width: '100%', height: '100%', display: 'flex'}}>
														<FontAwesomeIcon style={{margin: 'auto'}} color={sel ? 'white' : 'black'} icon={icon}/>
													</div>
												</div>
											)
										}
									)
								}
							</div>
						</div>
						<div>Seleccione un color</div>
						<div className='colors-list'>
							<div style={{width: 'max-content'}}>
								{
									["#e1d390", "#39afb1"].map(
										(color) => {
											const sel = this.state.new_color === color;
											return (
												<div 
												onClick={
													() => {
														this.selectColor(color);
													}
												}
												style={{backgroundColor: sel ? color : 'transparent'}}
												className='color'>
													<div style={{ width: '100%', height: '100%', backgroundColor: color}}></div>
												</div>
											)
										}
									)
								}
							</div>
						</div>
						<div className='button-container'>
							<button className='button-s atras'>Atras</button>
							<button className='button-p crear'>Crear</button>
						</div>
					</div>
					:
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
					<div 
					className='categoria-add'
					onClick={() => {this.newCategory()}}>
						<FontAwesomeIcon className='plus' icon='plus'/>
						<FontAwesomeIcon className='circle' icon={['far','circle']}/>
					</div>
				</div>
				
				}
				<div className='gastos-type'>
					<RadioGroup value='efectivo' horizontal>
						<RadioButton iconSize={20} value='efectivo'>
							Efectivo
						</RadioButton>
						<RadioButton iconSize={20} value='debito'>
							Débito
						</RadioButton>
						<RadioButton iconSize={20} value='credito'>
							Crédito
						</RadioButton>
					</RadioGroup>
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