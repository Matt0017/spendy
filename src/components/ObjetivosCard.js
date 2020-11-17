import React from 'react';
import { GlobalContext } from '../controllers/Context.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NumberFormat from 'react-number-format';

import '../styles/ObjetivosCard.css'
import { BorderColor } from '@material-ui/icons';

export class CrearObjetivo extends React.Component {

	render() {
		return(
			<div className='floating-container crear-objetivo'>
				PopupObjetivo
			</div>
		);
	}
}

class ObjetivoItem extends React.Component {

	constructor() {
		super();
		this.state = {
			barWidth: 999,
			amountWidth: 0
		}
	}

	componentDidMount() {
		const container = document.getElementById('objetivo_' +  this.props.objetivo.id);

		const fill = container.getElementsByClassName('bar-fill');
		const amount = container.getElementsByClassName('amount');

		this.setState({
			barWidth: fill[0].getBoundingClientRect().width,
			amountWidth: amount[0].getBoundingClientRect().width
		})
	}

	render() {
		const objetivo = this.props.objetivo;

		const amount = Math.max(Math.min(objetivo.acumulado / objetivo.objetivo, 1), 0);

		return (
			<div className='objetivo-item' id={'objetivo_' +  objetivo.id}>
				<div className='title-bar'>
					<div className='title'>
						{objetivo.name}
					</div>
					<div className='objetivo'>
						<NumberFormat value={objetivo.objetivo} displayType='text' thousandSeparator='.' decimalSeparator=',' decimalScale={2} fixedDecimalScale={true} prefix='$'/>
					</div>
				</div>
				<div className='bar'>
					<div className='bar-fill' 
						style={{
							width: amount * 100 + '%',
							backgroundColor: objetivo.categoria.color,
							borderColor: objetivo.categoria.color
						}}></div>
					<div className={'current ' + (this.state.barWidth > (this.state.amountWidth + 20) ? 'in' : 'out')}
						style={{ left: 'calc(' + (amount * 100) + '% + 10px)'}}>
						<NumberFormat className='amount' value={objetivo.acumulado} displayType='text' thousandSeparator='.' decimalSeparator=',' decimalScale={2} fixedDecimalScale={true} prefix='$'/>
					</div>
				</div>
			</div>
		);
	}
}

export default class ObjetivosCard extends React.Component {
	static contextType = GlobalContext;
	
	constructor() {
		super();

		this.state = {
			objetivos: null
		}
	}

	async componentDidMount() {

		const fondo = this.context.FondosController.getSelected()
		const categorias = await this.context.CategoriasController.getCategoriasGastos(fondo.id);

		
		const objetivos = [
			{
				id: 0,
				categoria: categorias[0],
				objetivo: 40000,
				acumulado: 36000,
				name: 'PS5'
			},
			{
				id: 1,
				categoria: categorias[3],
				objetivo: 300,
				acumulado: 10,
				name: 'Un viaje a algun lugar de 40 caracteres!'
			},
			{
				id: 2,
				categoria: categorias[4],
				objetivo: 2500,
				acumulado: 2600,
				name: 'No se pero ya lo hice'
			}
		];

		this.setState({
			objetivos: objetivos
		});
	}
	
	render() {
		return (
			<div className={ this.props.className + ' objetivos-container'}>
			<div className='title-container'>
				<div className='title'>Objetivos</div>
			</div>
			<div className='objetivos-list fill'>
				{
					this.state.objetivos != null ?
					this.state.objetivos.map(
						(o) => {
							return <ObjetivoItem objetivo={o}/>
						}
					)
					:
					<div className='loading fill'><div className='loading-text'>Cargando Objetivos...</div></div>
				}
			</div>
		</div>
		);
	}
}
