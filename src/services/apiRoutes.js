const url = 'https://semrest.herokuapp.com/'

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

export const agregarFondoPorCodigo = async (data) =>{
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    try {
        const response = await fetch(url+'agregarUsuarioAFondo/',options);
        console.log(response)
    } 
    catch (error) {
        console.log(error)
    }
}

export const crearFondo = async (data) =>{
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    try {
        const response = await fetch(url+'crearFondo/',options);
        console.log(response)
    } 
    catch (error) {
        console.log(error)
    }
}

export const registrar = async (data) =>{
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    try {
        const response = await fetch(url+'crearUsuario/',options);
        console.log(response)
    } 
    catch (error) {
        console.log(error)
    }
}

export const getUsuario = async (usuario) =>{
	try {
		const response = await fetch(url+'usuarios/'+usuario);
		const json = await response.json();
		return json
		
	} 
	catch (error) {
		console.log(error)
	}
}



export const getFondos = async (idUsuario) =>{
	try {
		const response = await fetch(url+'fondosUsuario/'+idUsuario);
		const json = await response.json();
		return json;
	} 
	catch (error) {
		console.error(error)
	}
}

export const getCategorias = async (fondo) =>{
	try {
		const response = await fetch(url+'categorias/'+fondo);
		const json = await response.json();
		return json[0];
		
	} 
	catch (error) {
		console.error(error)
	}
}

export const getTransacciones = async (fondo, moneda) =>{
	try {
		const response = await fetch(url+'getTransaccionesFondo/'+fondo+'/'+moneda);
		const json = await response.json()

		return json[0];
	} 
	catch (error) {
		console.error(error)
	}
}

export const getTransaccionesFiltrado = async (fondo, filtros) =>{
	const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
		body: JSON.stringify(filtros)
	}
    try {
        const response = await fetch(url+'getTransaccionesFiltrado/'+fondo,options);
        return(response.json())
    } 
    catch (error) {
        console.log(error)
    }
}

/**
 * 
 * @param {Number} idFondo 
 * @param {Date} desde 
 * @param {Date} hasta 
 * @param {String} moneda 
 */
export const getGastosPorCategoria = async (idFondo, desde, hasta, moneda) => {
	try {
		const response = await fetch(url + 'verGastosFondo/',
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				fondoID: idFondo,
				inicio: formatDate(desde) + ' 00:00:00',
				fin: formatDate(hasta) + ' 23:59:59',
				moneda: moneda
			})
		});
		const json = await response.json();

		return json;
	} 
	catch (error) {
		console.error(error)
	}
}

export const crearTransaccion = async (data) =>{
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    try {
        const response = await fetch(url+'crearTransaccion/',options);
        console.log(response)
    } 
    catch (error) {
        console.log(error)
    }
}

