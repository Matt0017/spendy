const formatDate = (d) => {
	let month = '' + (d.getMonth() + 1),
		day = '' + d.getDate(),
		year = d.getFullYear();

	if (month.length < 2) 
		month = '0' + month;
	if (day.length < 2) 
		day = '0' + day;

	return [year, month, day].join('-');
}

export const getFondos = async (idUsuario) =>{
	try {
		const response = await fetch('https://haunted-labyrinth-49727.herokuapp.com/fondosUsuario/'+idUsuario);
		const json = await response.json();
		return json;
	} 
	catch (error) {
		console.error(error)
	}
}

export const getCategorias = async (fondo) =>{
	try {
		const response = await fetch('https://haunted-labyrinth-49727.herokuapp.com/categorias/'+fondo);
		const json = await response.json();
		return json[0];
		
	} 
	catch (error) {
		console.error(error)
	}
}

export const getTransacciones = async (fondo,moneda) =>{
	try {
		const response = await fetch('https://haunted-labyrinth-49727.herokuapp.com/getTransaccionesFondo/'+fondo+'/'+moneda);
		const json = await response.json()

		return json[0];
	} 
	catch (error) {
		console.error(error)
	}
}

/**
 * 
 * @param {Number} idFondo 
 * @param {Date} desde 
 * @param {Date} hasta 
 * @param {String} moneda 
 */
export const getGastosPorCategoria = async (idFondo, desde, hasta, moneda) =>{
	try {
		const response = await fetch('https://haunted-labyrinth-49727.herokuapp.com/getTransaccionesFondo/'+idFondo+'/'+moneda,
		{
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				fondoID: idFondo,
				inicio: formatDate(desde) + ' 00:00:00',
				fin: formatDate(hasta) + ' 00:00:00'
			})
		});
		const json = await response.json()

		return json[0]
	} 
	catch (error) {
		console.error(error)
	}
}