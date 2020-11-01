import { getGastosPorCategoria } from "../services/apiRoutes";

export default class EstadisticasController {
	
	contructor(){
		
	}

	async getGastosPorCategoria(idFondo, inicio, fin, moneda, context)
	{

		debugger;
		const gastos = await getGastosPorCategoria(idFondo, inicio, fin, moneda);
		
		
	}
}