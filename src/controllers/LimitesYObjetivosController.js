import Categoria from "../classes/Categoria";
import { getCategorias, crearObjetivo, getObjetivos} from "../services/apiRoutes";

export default class CategoriasController {
	
	contructor(){
		this._categorias = null;
	}

	async crearLimite(idfondo, moneda)
	{
		
	}

	async getLimites(idFondo, moneda)
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
		
		return this._categorias;
	}

	async crearObjetivo(json){
		console.log(json)
		const response = await crearObjetivo(json);
		
		var validacion = false;
		if (response.status === 200){
			validacion =true
		}
		return validacion
	}

	async getObjetivos(idFondo, moneda){
		const response = await getObjetivos(idFondo, moneda)
		const json = await response.json()
		return json
	}

	
}