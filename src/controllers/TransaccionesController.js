import Transaccion from "../classes/Transaccion";
import { getTransacciones, crearTransaccion } from "../services/apiRoutes";

export default class TransaccionesController {
	
	contructor(){
		this._transacciones = [];
	}

	async getTransacciones(idFondo, moneda, context)
	{
		if (!this._transacciones || !this._transacciones.length)
		{
			const transacciones = await getTransacciones(idFondo, moneda);
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