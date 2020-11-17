import React, { Fragment } from 'react';
import { GlobalContext } from '../controllers/Context.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NumberFormat from 'react-number-format';

import '../styles/LimitesCard.css'

export class CrearLimite extends React.Component {
	static contextType = GlobalContext;

	constructor() {
		super();
		this.state = {
			categorias: [],
			categoria: null,
			fechaInicio: null,
			fechaFin: null,
			monto: 0
		}
	}

	async componentDidMount() {
		const fondo = this.context.FondosController.getSelected()
		const categorias = await this.context.CategoriasController.getCategoriasGastos(fondo.id);

		this.setState({
			categorias: categorias
		});
	}

	selectCategory(c) {
	}

	render() {
		return(
			<div className='floating-container crear-limite'>
				<div className='title'>
					Crear Nuevo Limite
				</div>
				<div className='amount-input-container'>
					<NumberFormat value={this.state.monto} className='amount-input' onValueChange={ (v) => { this.setState({ monto: (v.floatValue || 0) })}} thousandSeparator='.' decimalSeparator=',' decimalScale={2} fixedDecimalScale={true} prefix='$'/>
				</div>
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
				</div>
			</div>
		);
	}
}

class LimiteItem extends React.Component {

	render() {
		const limite = this.props.limite;

		return (
			<div className={'limite-item ' + (limite.acumulado/limite.limite > 1 ? "over" : limite.acumulado/limite.limite > 0.8 ? "near" : "fair")}>
				<div className='advert'></div>
				<div className='categoria'>
					<div className='organizador' style={{color: limite.categoria.color}}>
						<FontAwesomeIcon icon={limite.categoria.icono} size='2x' fixedWidth/>
						<span className='categoria-nombre'>{limite.categoria.nombre}</span>
					</div>
				</div>
				<div className='acumulado'>
					<NumberFormat value={limite.acumulado} displayType='text' thousandSeparator='.' decimalSeparator=',' decimalScale={2} fixedDecimalScale={true} prefix='$'/>
				</div>
				<div className='limite'>
					<NumberFormat value={limite.limite} displayType='text' thousandSeparator='.' decimalSeparator=',' decimalScale={2} fixedDecimalScale={true} prefix='$'/>
				</div>
			</div>
		);
	}
}

export default class LimitesCard extends React.Component {
	static contextType = GlobalContext;
	
	constructor() {
		super();

		this.state = {
			limites: null
		}
	}

	async componentDidMount() {
		
		const fondo = this.context.FondosController.getSelected()
		const categorias = await this.context.CategoriasController.getCategoriasGastos(fondo.id);

		const limites = [
			{
				categoria: categorias[0],
				limite: 40000,
				acumulado: 36000
			},
			{
				categoria: categorias[1],
				limite: 300,
				acumulado: 10
			},
			{
				categoria: categorias[2],
				limite: 2500,
				acumulado: 2600
			}
		];

		this.setState({
			limites: limites
		});
	}
	
	render() {
		return (
			<div className={ this.props.className + ' limites-container'}>
				<div className='title-container'>
					<div className='title'>Limites</div>
				</div>
				<div className='limites-list fill'>
					{
						this.state.limites != null ?
						<Fragment>
							<div className='header'>
								<div className='categoria'>Categoria</div>
								<div className='acumulado'>Monto Acumulado</div>
								<div className='limite'>Límite</div>
							</div>
							{this.state.limites.map(
								(l) => {
									return <LimiteItem limite={l}/>
								}
							)}
						</Fragment>
						:
						<div className='loading fill'><div className='loading-text'>Cargando Límites...</div></div>
					}
				</div>
			</div>
		);
	}
}
