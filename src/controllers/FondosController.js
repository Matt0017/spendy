import Fondo from "../classes/Fondo";
import { getFondos } from "../services/apiRoutes";

export default class FondosController{
	
	contructor(){
		this._fondos = [];
		this._selected = null;
		this._moneda = null
		
	}

	getSelected() {
		if (this._selected == null)
		{
			const f = JSON.parse(sessionStorage.getItem('fondo'));
			this._selected = new Fondo(f);
		}
		return this._selected;
	}

	selectFondo(fondo) {
		const json = {
			id: fondo.id,
			nombre: fondo.nombre,
			codigo: fondo.codigo
		}
		sessionStorage.setItem('fondo', JSON.stringify(json));
		this._selected = fondo
	}

	setMoneda(moneda){
		this._moneda = moneda;
		sessionStorage.setItem('moneda',moneda)
	}

	getMoneda(){
		if (!this._moneda || !this._moneda.length)
		{
			let moneda = sessionStorage.getItem('moneda');
			this._moneda = moneda
		}
		return this._moneda;
	}

	async getFondos(idUsuario)
	{
		
		const fondos = await getFondos(idUsuario);
			
		this._fondos = fondos.map(
				(f) => {
					return new Fondo({
						id: f.idFondo,
						nombre: f.nombre_fondo,
						codigo:f.codigo_fondo
					});
				}
			);
		
		return this._fondos;
	}
}