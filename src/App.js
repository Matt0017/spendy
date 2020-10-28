import React from 'react';
import	{BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import './styles/App.css';

import TransaccionesPage from './pages/TransaccionesPage';
import InicioSesion from './pages/InicioSesion';
import Landing from './components/LandingPage';
import SeleccionarFondo from './pages/SeleccionarFondo';

export default class App extends React.Component {
	render(){
		return (
			<Router>
				<div className="fill App">
					
					<Switch>
						<Route path='/' exact component={Landing} />
						<Route path='/InicioSesion' component={InicioSesion} />
						<Route path='/Transacciones' component={TransaccionesPage} />
						<Route path='/SeleccionarFondo' component={SeleccionarFondo} />
					</Switch>
				</div>
			</Router>
		);
	}
}


