import React from 'react';
import { GlobalContext } from '../controllers/Context';
import ReactEcharts from 'echarts-for-react';

import '../styles/GastosPorCategoria.css';
import Categoria from '../classes/Categoria';

export default class GastosPorCategoria extends React.Component {
	static contextType = GlobalContext;

	constructor() {
		super();
		this.state = {
			option: 'day',
			catInicio: null,
			catFin: null,
			data: [] //this.createData()
		}
	}
	
	async componentDidMount() {
		const fondo = this.context.FondosController.getSelected();
		const gastos = await this.context.EstadisticasController.getGastosPorCategoria(fondo.id, new Date(0), new Date(), 'pesos');
	}

	getDay() {
		this.setState({
			option: 'day'
			// catInicio: (new Date())
		});
	}

	getWeek() {
		this.setState({
			option: 'week'
			// catInicio: (new Date())
		});
	}

	getMonth() {
		this.setState({
			option: 'month'
			// catInicio: (new Date())
		});
	}

	getYear() {
		this.setState({
			option: 'year'
			// catInicio: (new Date())
		});
	}

	getCustom() {
		this.setState({
			option: 'custom'
			// catInicio: (new Date())
		});
	}

	render() {
		return (
			<div className='gxc'>
				<div className='header noselect'>
					<div
						className={'option ' + (this.state.option === 'day' ? 'selected' : '')}
						onClick={() => { this.getDay(); }}>dia</div>
					<div
						className={'option ' + (this.state.option === 'week' ? 'selected' : '')}
						onClick={() => { this.getWeek(); }}>semana</div>
					<div
						className={'option ' + (this.state.option === 'month' ? 'selected' : '')}
						onClick={() => { this.getMonth(); }}>mes</div>
					<div
						className={'option ' + (this.state.option === 'year' ? 'selected' : '')}
						onClick={() => { this.getYear(); }}>año</div>
					<div
						className={'option ' + (this.state.option === 'custom' ? 'selected' : '')}
						onClick={() => { this.getCustom(); }}>personalizado</div>
				</div>
				<div className='body'>
					{
						this.state.option !== 'custom' ? (
							<div>
								<ReactEcharts
									option={{
										legend: {
											type: 'scroll',
											orient: 'vertical',
											left: 10,
											top: 20,
											bottom: 20,
											data: this.state.data.map(
												(v) => {
													return v.cat.name;
												}
											),
										},
										color: this.state.data.map(
											(v) => {
												return v.cat.color;
											}
										),
										series: [{ 
											name: 'gastos',
											type: 'pie',
											center: ['50%', '50%'],
											data: this.state.data.map(
												(v) => {
													return {
														name: v.cat.name,
														value: v.value
													};
												}
											)
										}]
									}}/>
							</div>
						)
						:
						(
							<div>
								Custom
							</div>
						)
					}
				</div>
			</div>
		);
	}

	createData() {
		const supermercado = new Categoria("Supermercado", "shopping-cart", "#F8C29E");
		const mascotas = new Categoria("Mascotas", "paw", "#D6976D");
		const otros = new Categoria("Otros", "question", "#B4BCC2");
		const sueldo = new Categoria("Sueldo", "hand-holding-usd", "#98ECDE");

		return [
			{
				cat: supermercado,
				value: Math.random()*5000
			},
			{
				cat: mascotas,
				value: Math.random()*5000
			},
			{
				cat: otros,
				value: Math.random()*5000
			},
			{
				cat: sueldo,
				value: Math.random()*5000
			}
		]
	}
}