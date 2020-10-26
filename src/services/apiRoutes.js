export const getTransacciones = async (fondo,moneda) =>{
    try {
        const response = await fetch('http://localhost:3500/getTransaccionesFondo/'+fondo+'/'+moneda);
        const json = await response.json()

        return json.data

        
    } 
    catch (error) {
        console.log(error)
    }
}

export const getFondo = async (fondo,moneda) =>{
    try {
        const response = await fetch('http://localhost:3500/fondos/'+fondo+'/'+moneda);
        const json = await response.json();

        console.log(json.data[0])

        
    } 
    catch (error) {
        console.log(error)
    }
}
