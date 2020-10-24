import Categoria from "./Categoria";

export default class Transaccion {

	// TODO definir, moneda (?)
	constructor(id, fecha, categoria, monto, moneda) {
		this.id = id;
		
		/** @type {Date} */
		this.fecha = fecha;
		
		/** @type {Categoria} */
		this.categoria = categoria;
		
		this.monto = monto;
	}

	get fechaString() { 
		return this.fecha.getDate() + "/" + this.fecha.getMonth() + "/" + this.fecha.getFullYear();
	}

	isGasto() {
		return this.monto < 0;
	}

	isIngreso() {
		return this.monto > 0;
	}
}