import React, { Fragment } from 'react';
import { GlobalContext } from '../controllers/Context';

import { FormControl, InputLabel, Select, TextField } from '@material-ui/core';
import DatePicker from "react-datepicker";

import '../styles/FilterBar.css'
import { getTransaccionesFiltrado } from '../services/apiRoutes';

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

	filtrar = () => {
		console.log(this.state.categoria)
		let filtros = {
			moneda: this.context.FondosController.getMoneda(),
			idCategoria: this.state.categoria,
			idUser: this.state.integrante,
			fechaInicio: this.state.desde,
			fechaFin: this.state.hasta
		}
		this.props.filtrarFn(filtros)
	}

	handleChange = (event) => {
		const {name, value} = event.target;

		//NOSE QUE MIERDA LE PASA QUE NO HACE EL SETSTATE
        this.setState({
            [name]: value,
		})
		
		this.filtrar()
	}

	async componentDidMount() {
		const fondo = this.context.FondosController.getSelected();
		const categorias = await this.context.CategoriasController.getCategorias(fondo.id);
		this.setState({
			categorias: categorias,
		})
	}

	update() {

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
					value={this.state.desde}
					onChange={this.handleChange}
					defaultValue="2020-11-01"
					InputLabelProps={{
						shrink: true,
					}}
				/>
				<TextField
					id="date"
					type="date"
					label='hasta'
					className='date-picker'
					value={this.state.hasta}
					onChange={this.handleChange}
					defaultValue="2020-11-01"
					InputLabelProps={{
						shrink: true,
					}}
				/>
			</div>
		);
	}

}