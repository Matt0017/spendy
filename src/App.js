import React from 'react';
import	{BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import Landing from './components/LandingPage';
import InicioSesion from './pages/InicioSesion';
import Movimientos from './pages/Movimientos';
import Estadisticas from './pages/Estadisticas';

import './styles/App.css';
import './styles/Categorias.css';

function App() {
	return (
		
		<Router>
			<div className="fill App">
				<Switch>
					<Route path='/' exact component={Landing} />
					<Route path='/InicioSesion' component={InicioSesion} />
					<Route path='/Movimientos' component={Movimientos} />
					<Route path='/Estadisticas' component={Estadisticas} />
				</Switch>
			</div>
		</Router>
	);
}

export default App;
