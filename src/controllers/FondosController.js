import Fondo from "../classes/Fondo";
import { getFondos } from "../services/apiRoutes";

export default class FondosController{
	
	contructor(){
		this._fondos = [];
		this._selected = null;
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

	async getFondos(idUsuario)
	{
		if (!this._fondos || !this._fondos.length)
		{
			let fondos = JSON.parse(sessionStorage.getItem('fondos'));

			if (!fondos || !fondos.length)
			{
				fondos = await getFondos(idUsuario);
				sessionStorage.setItem('fondos', JSON.stringify(fondos));
			}
			
			this._fondos = fondos.map(
				(f) => {
					return new Fondo({
						id: f.idFondo,
						nombre: f.nombre_fondo,
						codigo:f.codigo_fondo
					});
				}
			);
		}
		return this._fondos;
	}
}