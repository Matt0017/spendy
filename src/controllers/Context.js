import React from 'react';
import TransaccionesController from './TransaccionesController';
import CategoriasController from './CategoriasController';
import FondosController from './FondosController';
import EstadisticasController from './EstadisticasController';

const globalState = {
	FondosController: new FondosController(),
	CategoriasController: new CategoriasController(),
	TransaccionesController: new TransaccionesController(),
	EstadisticasController: new EstadisticasController()
};

export const GlobalContext = React.createContext(globalState);
const GlobalContextProvider = (props) => {
	return (
		<GlobalContext.Provider value={globalState}>
			{props.children}
		</GlobalContext.Provider>
	);
};
export default GlobalContextProvider;
