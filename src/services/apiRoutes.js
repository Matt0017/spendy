export const getTransacciones = async (fondo,moneda) =>{
    try {
        const response = await fetch('http://localhost:3500/getTransaccionesFondo/'+fondo+'/'+moneda);
        const json = await response.json()

<<<<<<< HEAD
        
        return json[0]

        
=======
        return json[0]
>>>>>>> cc4d62426cb21f2c6c34064e05cce45586a200a5
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