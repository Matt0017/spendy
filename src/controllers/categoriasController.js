import Categoria from "../classes/Categoria";
import { getCategorias } from "../services/apiRoutes";

export default class CategoriasController {
	
	contructor(){
		this._categorias = null;
	}

	async isIngreso(c){
		return c.transaccion === 'ingreso'
	}

	async findCategoria(nombre, idFondo) {
		const C = await this.getCategorias(idFondo);
		return (C.find(
			(c) => {
				return c.nombre === nombre;
			}
		) || null);
	}

	async getCategorias(idFondo)
	{
		if (!this._categorias || !this._categorias.length)
		{
			const categorias = await getCategorias(idFondo);
			
			this._categorias = categorias.map(
				(c) => {
					return new Categoria({
						id: c.idCategoria,
						nombre: c.nombre,
						icono: c.icono,
						color: c.color,
						isActive: true,
					});
				}
			);
		}
		return this._categorias;
	}

	async getCategoriasGastos(idFondo){
		const categorias = await this.getCategorias(idFondo);
		categorias.filter( (c) => { return c.isIngreso })
		return categorias
	}

	async getCategoriasIngreso(idFondo){
		const categorias = await this.getCategorias(idFondo);
		categorias.filter( (c) => { return c.isIngreso })
		return categorias
	}
	
	// categorias.filter( (c) => { return c.isIngreso }) para ingresos
	// categorias.filter( (c) => { return !c.isIngreso }) para gastos
}