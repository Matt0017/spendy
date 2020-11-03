import Transaccion from "../classes/Transaccion";
import { getTransaccionesFiltrado, crearTransaccion } from "../services/apiRoutes";

export default class TransaccionesController {
	
	contructor(){
		this._transacciones = [];
	}

	async getTransacciones(idFondo, filtros, context)
	{
		if (!this._transacciones || !this._transacciones.length)
		{
			const transacciones = await getTransaccionesFiltrado(idFondo, filtros);
			console.log(transacciones)
			const categorias = await context.CategoriasController.getCategorias(idFondo);
			
			this._transacciones = transacciones.map(
				(t) => {
					return new Transaccion({
						id: t.idTransaccion,
						fecha: t.fecha,
						monto: t.dinero,
						categoria: categorias.find((c) => { return c.nombre === t.nombre })
					});
				}
			);
		}
		return this._transacciones;
	}

	async agregarTransaccion(idUser, idFondo, idCategoria, dinero, descripcion, moneda){
		const json = {
			idUser, idFondo, idCategoria, dinero, descripcion, moneda
		}
		crearTransaccion(json);
	}
}