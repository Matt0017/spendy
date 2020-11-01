export const getTransacciones = async (fondo,moneda) =>{
	try {
		const response = await fetch('http://localhost:3500/getTransaccionesFondo/'+fondo+'/'+moneda);
		const json = await response.json()

		return json[0]
	} 
	catch (error) {
		console.log(error)
	}
}

export const getFondos = async (idUsuario) =>{
	try {
		const response = await fetch('http://localhost:3500/fondosUsuario/'+idUsuario);
		const json = await response.json();
		return json
		
	} 
	catch (error) {
		console.log(error)
	}
}

export const getCategorias = async (fondo) =>{
	try {
		const response = await fetch('http://localhost:3500/categorias/'+fondo);
		const json = await response.json();
		return json
		
	} 
	catch (error) {
		console.log(error)
	}
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
        const response = await fetch('http://localhost:3500/agregarUsuarioAFondo/',options);
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
        const response = await fetch('http://localhost:3500/crearFondo/',options);
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
        const response = await fetch('http://localhost:3500/crearUsuario/',options);
        console.log(response)
    } 
    catch (error) {
        console.log(error)
    }
}

export const getUsuario = async (usuario) =>{
	try {
		const response = await fetch('http://localhost:3500/usuarios/'+usuario);
		const json = await response.json();
		return json
		
	} 
	catch (error) {
		console.log(error)
	}
}


