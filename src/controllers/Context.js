import React from 'react';
import TransaccionesController from './TransaccionesController';
import CategoriasController from './CategoriasController';
import FondosController from './FondosController';

const globalState = {
	FondosController: new FondosController(),
	CategoriasController: new CategoriasController(),
	TransaccionesController: new TransaccionesController()
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
