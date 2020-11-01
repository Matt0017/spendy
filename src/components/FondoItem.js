import React, { useContext } from 'react'
import { GlobalContext } from '../controllers/Context'
import { Link } from 'react-router-dom'

import '../styles/Fondo.css'

export default class FondoItem extends React.Component {
	static contextType = GlobalContext;

	constructor() {
		super()
	}

	async handleClick() {
		this.context.FondosController.selectFondo(this.props.fondo);
	}

	render() {
		return (
			<Link to='/Movimientos'>
				<div class="post-slide" onClick={ () => { this.handleClick() } }>
					<div class="post-content">
						<h3 class="post-title">{this.props.fondo.nombre}</h3>
					</div>
				</div>
			</Link>
		)   
	}
}
