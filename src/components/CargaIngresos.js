import React from 'react';
import ReactLoading from 'react-loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../styles/CargaIngresos.css'
import "react-datepicker/dist/react-datepicker.css";
import { GlobalContext } from '../controllers/Context';
import NumberFormat from 'react-number-format';
import { TextField } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

export default class CargaIngresos extends React.Component {
	static contextType = GlobalContext;
	constructor(props) {
		super(props);
		this.state = {
			creando: false,
			alert: '',
			showNewCategory: false,
			new_icon: '',
			new_color: '',
			categorias: [],
			iconos: [],
			colores: [],
			categoriaCustom: '',
			monto: '',
			categoria: null,
			fecha: this.fechaToStringValue(new Date()),
			notas: ''
		}
	}

	fechaToStringValue(date)
	{
		return date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate();
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

	selectCategory(categoria) {
		this.setState({
			categoria: categoria
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

	async crearCatCustom(){
		const json = {
			nombre: this.state.categoriaCustom,
			idfrontCategorias: this.state.new_icon,
			idColor: this.state.new_color,
			idFondo: this.context.FondosController.getSelected().id,
			ineg: 0
		}

		//falta agregar el usuario dinamicamente
		const validacion = await this.context.CategoriasController.crearCatCustom(json);
		if(validacion){
			const fondo = await this.context.FondosController.getSelected();
			const categorias = await this.context.CategoriasController.getCategoriasIngreso(fondo.id)
		
			this.setState({
				categorias: categorias,
			})
			this.closeNewCategory();
			
		}
	}
	
	async crearTransaccion(){
		if (this.state.creando) return;
		
		let alert = '' 
		if (this.state.monto <= 0) {
			alert = 'Ingrese un monto valido de gasto.';
		} else if (this.state.categoria == null) {
			alert = 'Seleccione la categoría sobre la cual se realizó el gasto.';
		}

		if (alert) {
			this.setState({
				alert: alert
			})
		} else {
			const json = {
				monto: this.state.monto,
				categoria: this.state.categoria.id,
				fecha: this.state.fecha,
				notas: this.state.notas,
			}

			this.setState({
				creando: true
			});

			const fondo = this.context.FondosController.getSelected().id;
			const moneda = this.context.FondosController.getMoneda();
			const usuario = (await this.context.UsuariosController.getUsuarioLogged()).idUser

			const validacion = await this.context.TransaccionesController.agregarTransaccion(usuario,fondo,json.categoria,json.monto,json.notas,moneda, json.fecha)
			if(validacion){
				window.location.reload()
			} else {
				this.setState({
					creando: false
				});
			}
		}
	}

	async componentDidMount(){
		const fondo = this.context.FondosController.getSelected();
		const categorias = await this.context.CategoriasController.getCategoriasIngreso(fondo.id)
		const iconos = await this.context.CategoriasController.getIconos()
		const colores = await this.context.CategoriasController.getColores()
		this.setState({
			categorias: categorias,
			iconos: iconos,
			colores: colores
		})
	}

	render() {
		
		return (
			<div className='floating-container carga-ingresos'>
				<div className='titulo'>
					<h3>Cargar Ingreso</h3>
					<span>Ingresa el monto y la categoria de tu ingreso</span>
				</div>
				{
					this.state.alert.length > 0 ?
						<Alert variant="filled" severity="error">
							{this.state.alert}
						</Alert>
					:
						null
				}
				<div className='amount'>
					<div className='moneda'>{this.props.moneda}</div>
					<NumberFormat value={this.state.monto} className='cantidad-input' onValueChange={ (v) => { this.setState({ monto: (v.floatValue || 0) })}} thousandSeparator='.' decimalSeparator=',' decimalScale={2} fixedDecimalScale={true} prefix='$'/>
					<FontAwesomeIcon className='delete-button' size='2x' icon='backspace' onClick={()=> {this.setState({cantidad: ''})}}/>
				</div>
				{
					(this.state.showNewCategory) ? 
					<div className='new-category'>
						<div><input type='text' placeholder='Nombre' value={this.state.categoriaCustom} name='categoriaCustom' onChange={this.handleChange}></input></div>
						<div className='seleccion'>Seleccione un icono</div>
						<div className='icons-list'>
							<div style={{width: 'max-content'}}>
								{		
									this.state.iconos.map(
										(icon) => {
											
											const sel = this.state.new_icon === icon.idfrontCategorias;
											return (
												<div 
												onClick={
													() => {
														this.selectIcon(icon.idfrontCategorias);
													}
												}
												style={{backgroundColor: sel ? 'black' : 'transparent'}}
												className='icon'>
													<div style={{ width: '100%', height: '100%', display: 'flex'}}>
														<FontAwesomeIcon style={{margin: 'auto'}} color={sel ? 'white' : 'black'} icon={icon.icono}/>
													</div>
												</div>
											)
										}
									)
								}
							</div>
						</div>
						<div className='seleccion'>Seleccione un color</div>
						<div className='colors-list'>
							<div style={{width: 'max-content'}}>
								{
									this.state.colores.map(
										(color) => {
											const sel = this.state.new_color === color.idColor;
											return (
												<div 
												onClick={
													() => {
														this.selectColor(color.idColor);
													}
												}
												style={{backgroundColor: sel ? color : 'transparent'}}
												className='color'>
													<div style={sel ?  { width: '100%', height: '100%', border: '1px solid '+color.color, borderRadius: '100px'} : { width: '100%', height: '100%', backgroundColor: color.color, borderRadius: '100px'}}></div>
												</div>
											)
										}
									)
								}
							</div>
						</div>
						<div className='button-container'>
							<button className='button-s atras' onClick={this.closeNewCategory.bind(this)}>Atras</button>
							<button className='button-p crear' onClick={this.crearCatCustom.bind(this)}>Crear</button>
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
				{/* <div className='description-title'>Fecha</div> */}
				<div className='fecha'>
					<TextField
						id="date"
						type="date"
						label='fecha'
						className='date-picker'
						name="fecha"
						value={this.state.fecha}
						onChange={(p) => {
							const date = p.target.value;
							this.setState({ fecha: date})
						}}
						InputLabelProps={{
							shrink: true,
						}}
					/>
				</div>
				<div className='description-title'></div>
				<textarea 
				className='description' 
				maxLength={140} 
				placeholder='Notas...'
				name='notas'
				value={this.state.notas}
				onChange={this.handleChange}
				/>
				<div className='buttons'>
					<button className={'button-p confirmar ' + (this.state.creando ? 'disabled' : '')} onClick={() => { this.crearTransaccion(); }}>
						{
							this.state.creando ?
								<ReactLoading type='bubbles' height={30} width={30}/>
							:
								'Confirmar'
						}	
					</button>
					<button className='button-s cancelar' onClick={() => { this.props.closeFunc(); }}>Cancelar</button>
				</div>
			</div>
		);
	}
}