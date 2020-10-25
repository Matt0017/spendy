import React from 'react';
import	{BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import TransaccionesPage from './pages/TransaccionesPage'
import InicioSesion from './pages/InicioSesion';
import Landing from './components/LandingPage'

import './styles/App.css';
import './styles/Categorias.css'

function App() {
	return (
		
		<Router>
			<div className="fill App">
				
				<Switch>
					<Route path='/' exact component={Landing} />
					<Route path='/InicioSesion' component={InicioSesion} />
					<Route path='/Transacciones' component={TransaccionesPage} />
					
				</Switch>
			</div>
		</Router>
	);
}

export default App;
