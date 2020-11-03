import { getGastosPorCategoria } from "../services/apiRoutes";

export default class EstadisticasController {
	
	contructor(){

	}

	async getGastosPorCategoria(idFondo, inicio, fin, moneda, context)
	{
		const gastos = await getGastosPorCategoria(idFondo, inicio, fin, moneda);
		const categorias = await context.CategoriasController.getCategorias(idFondo);

		return gastos.map(
			(gasto) => {
				return (
					{
						monto: gasto.DineroTotal,
						categoria: categorias.find( (c) => { return gasto.categoria == c.id } )
					}
				);
			}
		);
	}
}