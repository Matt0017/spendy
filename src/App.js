import React from 'react';
import	{BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import './styles/App.css';

import Dashboard from './pages/Principal'
import InicioSesion from './pages/InicioSesion';
import Landing from './components/LandingPage'

function App() {
	return (
		//fondo
		//categorias
		<Router>
			<div className="fill App">
				
				<Switch>
					<Route path='/' exact component={Landing} />
					<Route path='/InicioSesion' component={InicioSesion} />
					<Route path='/Dashboard' component={Dashboard} />
					
				</Switch>
			</div>
		</Router>
	);
}

export default App;
