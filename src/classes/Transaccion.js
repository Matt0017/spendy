

export default class Transaccion {

	// TODO definir, moneda (?)
	constructor(id, fecha, categoria, monto, moneda) {
		this.id = id;
		
		this.fecha = new Date(fecha);
		
		/** @type {Categoria} */
		this.categoria = categoria;
		
		this.monto = monto;
	}

	get_fechaString() { 
		return this.fecha.getDate() + "/" + this.fecha.getMonth() + "/" + this.fecha.getFullYear();
	}

	isGasto() {
		return this.monto < 0;
	}

	isIngreso() {
		return this.monto > 0;
	}
}