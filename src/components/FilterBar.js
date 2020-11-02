import React, { Fragment } from 'react';
import { GlobalContext } from '../controllers/Context';

import { FormControl, InputLabel, Select, TextField } from '@material-ui/core';
import DatePicker from "react-datepicker";

import '../styles/FilterBar.css'

export default class FilterBar extends React.Component {
	static contextType = GlobalContext;
	
	constructor() {
		super();
		this.state =
		{
			categorias: null,
			integrantes: null,
			categoria: null,
			integrante: null,
			desde: new Date(0),
			hasta: new Date()
		} 
	}

	async componentDidMount() {
		const fondo = this.context.FondosController.getSelected();
		const categorias = await this.context.CategoriasController.getCategorias(fondo.id);
		this.setState({
			categorias: categorias
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
						value={this.state.categoria}
						onChange={() => { alert("cambiar"); }}
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
											<option value={c}>{c.nombre}</option>
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
				<div className='fechas'>
					<div className='title'>Desde</div>
					<TextField
						id="date"
						type="date"
						className='date-picker'
						defaultValue="2020-11-01"
						InputLabelProps={{
							shrink: true,
						}}
					/>
					<div className='title'>Hasta</div>
					<DatePicker
						className='date-picker'
						selected={this.state.hasta}
						onChange={(date) => {
							this.setState({ hasta: date })
						}}/>
				</div>
			</div>
		);
	}

}