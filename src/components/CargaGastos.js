import React from 'react';
import DatePicker from "react-datepicker";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


import '../styles/CargaGastos.css'
import "react-datepicker/dist/react-datepicker.css";
import { GlobalContext } from '../controllers/Context';

export default class CargaGastos extends React.Component {
	static contextType = GlobalContext;
	constructor(props) {
		super(props);
		this.state = {
			showNewCategory: false,
			new_icon: '',
			new_color: '',
			categorias: [],

			monto: '',
			categoria: null,
			fecha: '',
			notas: ''
		}
	}

	selectCategory(categoria) {
		this.setState({
			categoria: categoria
		});
	}

	newCategory() {
		this.setState({
			showNewCategory: true
		});
	}

	closeNewCategory() {
		this.setState({
			showNewCategory: false
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

	handleChange = (event) => {
        const {name, value} = event.target;
        this.setState({
            [name]: value
        })
	}
	
	async crearTransaccion(){
		const json = {
			monto: -(this.state.monto),
			categoria: this.state.categoria.id,
			fecha: this.state.fecha,
			notas: this.state.notas,
		}
		const fondo = this.context.FondosController.getSelected().id;
		const moneda = this.context.FondosController.getMoneda();

		//falta agregar el usuario dinamicamente
		await this.context.TransaccionesController.agregarTransaccion(2,fondo,json.categoria,json.monto,json.notas,moneda)
	}

	async componentDidMount(){
		const fondo = this.context.FondosController.getSelected();
		const categorias =  await this.context.CategoriasController.getCategoriasGastos(fondo.id)
		this.setState({
			categorias: categorias
		})
	}

	render() {
		// const supermercado = new Categoria("Supermercado", "shopping-cart", "#F8C29E");
		// const mascotas = new Categoria("Mascotas", "paw", "#D6976D");
		// const otros = new Categoria("Otros", "question", "#B4BCC2");
		// const sueldo = new Categoria("Sueldo", "hand-holding-usd", "#98ECDE");

		// const categorias = [supermercado, mascotas, otros, sueldo, supermercado, mascotas, otros, sueldo, supermercado ]

		return (
			<div className='carga-gastos floating-container'>
				<div className='titulo'>
					<h3>Cargar Gasto</h3>
					<span>Ingresa el monto y la categoria de tu gasto</span>
				</div>
				<div className='amount'>
					<div className='moneda'>{this.props.moneda}</div>
					<input 
					className='cantidad-input' 
					placeholder='0' 
					type='number' 
					min={0} 
					name='monto'
					value={this.state.monto}
					onChange={this.handleChange}
					/>
					<FontAwesomeIcon className='delete-button' size='2x' icon='backspace' onClick={()=> {this.setState({cantidad: ''})}}/>
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
							<button className='button-s atras' onClick={this.closeNewCategory.bind(this)}>Atras</button>
							<button className='button-p crear'>Crear</button>
						</div>
					</div>
					:
					<div className='category-selection'>
					{
						this.state.categorias.map(
							(categoria,index) => {
								const selected = this.state.categoria != null && this.state.categoria.nombre === categoria.nombre;
								return (
									<div 
									key={index}
									style={{backgroundColor: selected? categoria.color : 'white'}}
									className={'categoria-item ' + (selected? 'selected' : '')}
									onClick={() => {this.selectCategory(categoria)}}>
										<div className='organizer'>
											<div className='icon-container'>
												<FontAwesomeIcon color={selected? 'white' : categoria.color} className='icon' icon={['fas', categoria.icono]} size='2x'/>
											</div>
											<div style={{color: selected? 'white' : categoria.color}} className='texto'><span>{categoria.nombre}</span></div>
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
				<div className='description-title'>Fecha</div>
				<div className='fecha'>
					<DatePicker
						className='date-picker'
						selected={this.state.date}
						name='fecha'
						value={this.state.fecha}
						onChange={(date) => {

							this.setState({ fecha: date.getMonth() + '-' + date.getDate() + '-' + date.getFullYear() })
						}}/>
				</div>
				<div className='description-title'>Notas</div>
				<textarea 
				className='description' 
				maxLength={140} 
				placeholder='Notas...'
				name='notas'
				value={this.state.notas}
				onChange={this.handleChange}
				/>
				<div className='buttons'>
					<button className='button-p confirmar' onClick={() => { this.crearTransaccion(); }}>Confirmar</button>
					<button className='button-s cancelar' onClick={() => { this.props.closeFunc(); }}>Cancelar</button>
				</div>
			</div>
		);
	}
}