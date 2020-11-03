import React, { Fragment } from 'react';
import { GlobalContext } from '../controllers/Context';

import { FormControl, InputLabel, Select, TextField } from '@material-ui/core';

import '../styles/FilterBar.css'

export default class FilterBar extends React.Component {
	static contextType = GlobalContext;
	
	constructor(props) {
		super(props);
		this.state =
		{
			categorias: null,
			integrantes: null,
			categoria: '',
			integrante: '',
			desde: '',
			hasta: '',
		} 
	}

	

	handleChange = async (event) => {
		const {name, value} = event.target;
		console.log({[name]: value})
        await this.setState({
			
            [name]: value,
		})
		await this.filtrar()
	}

	filtrar = () => {
		let filtros = {
			moneda: this.context.FondosController.getMoneda(),
			idCategoria: this.state.categoria,
			idUser: this.state.integrante,
			fechaInicio: this.state.desde,
			fechaFin: this.state.hasta
		}
		this.props.filtrarFn(filtros)
	}

	async componentDidMount() {
		const fondo = this.context.FondosController.getSelected();
		const categorias = await this.context.CategoriasController.getCategorias(fondo.id);
		this.setState({
			categorias: categorias,
		})
	}
	render() {
		return (
			<div className='filter-bar fill'>
				<FormControl variant="filled" className='categoria-control'>
					<InputLabel htmlFor="filled-age-native-simple">Categoria</InputLabel>
					<Select
						native
						name='categoria'
						value={this.state.categoria}
						onChange={this.handleChange}
						label="Categoria"
						inputProps={{
							name: 'categoria',
							id: 'filled-age-native-simple',
						}}
						>
							<option aria-label="None" value="" />
							{
								this.state.categorias && this.state.categorias ?
								this.state.categorias.map(
									(c) => {
										
										return (
											<option value={c.id}>{c.nombre}</option>
											
										);
									}
								)
								:
								<Fragment></Fragment>
							}
					</Select>
				</FormControl>
				<FormControl variant="filled" className='integrantes-control'>
					<InputLabel htmlFor="filled-age-native-simple">Integrantes</InputLabel>
					<Select
						native
						value={this.state.categoria}
						onChange={() => { alert("cambiar"); }}
						label="Integrantes"
						inputProps={{
							name: 'integrante',
							id: 'filled-age-native-simple',
						}}
						>
							<option aria-label="None" value="" />
							{
								this.state.categorias && this.state.categorias ?
								this.state.categorias.map(
									(c) => {
										return (
											<option value={c}>{c.nombre}</option>
										);
									}
								)
								:
								<Fragment></Fragment>
							}
					</Select>
				</FormControl>
				<TextField
					id="date"
					type="date"
					label='desde'
					className='date-picker'
					name="desde"
					value={this.state.desde}
					onChange={this.handleChange}
					defaultValue={Date.now}
					InputLabelProps={{
						shrink: true,
					}}
				/>
				<TextField
					id="date"
					type="date"
					label='hasta'
					name="hasta"
					className='date-picker'
					value={this.state.hasta}
					onChange={this.handleChange}
					defaultValue={Date.now}
					InputLabelProps={{
						shrink: true,
					}}
				/>
			</div>
		);
	}

}