import React from 'react';
import	{BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import Landing from './components/LandingPage';
import InicioSesion from './pages/InicioSesion';
import Movimientos from './pages/Movimientos';
import Estadisticas from './pages/Estadisticas';
import SeleccionarFondo from './pages/SeleccionarFondo';
import Prueba from './pages/Prueba';

import './styles/App.css';
import './styles/Categorias.css';

import categoriasController from './controllers/categoriasController'
// import { render } from '@testing-library/react';

export default class App extends React.Component {
	
	render() {
		// categoriasController.getCategorias()
		return (
			<Router>
				<div className="fill App">
					<Switch>
						<Route path='/' exact component={Landing} />
						<Route path='/InicioSesion' component={InicioSesion} />
						<Route path='/Movimientos' component={Movimientos} />
						<Route path='/Estadisticas' component={Estadisticas} />
						<Route path='/Fondos' component={SeleccionarFondo} />
						<Route path='/Prueba' component={Prueba} />
					</Switch>
				</div>
			</Router>
		);
	}
}

export function copyToClipboard(str) { 
	const el = document.createElement('textarea');
	el.value = str; el.setAttribute('readonly', '');
	el.style.position = 'absolute'; el.style.left = '-9999px';
	document.body.appendChild(el);
	el.select();
	document.execCommand('copy');
	document.body.removeChild(el);
}
