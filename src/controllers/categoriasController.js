import Categoria from "../classes/Categoria";
import { getCategorias } from "../services/apiRoutes";

export default class CategoriasController {
	
	contructor(){
		this._categorias = null;
	}

	isIngreso(c){
		return (c.ineg === 0)
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
						ineg: c.ineg
					});
				}
			);
		}
		return this._categorias;
	}

	async getCategoriasGastos(idFondo){
		const categorias = await this.getCategorias(idFondo);
		
		return(categorias.filter( (c) => { return !this.isIngreso(c) }))
	}

	async getCategoriasIngreso(idFondo){
		const categorias = await this.getCategorias(idFondo);
		return (categorias.filter( (c) => { return this.isIngreso(c)}))
	}

	
	
	// categorias.filter( (c) => { return c.isIngreso }) para ingresos
	// categorias.filter( (c) => { return !c.isIngreso }) para gastos
}