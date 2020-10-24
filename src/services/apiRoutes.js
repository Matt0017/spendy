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

async componentDidMount(){
    const trans = await getTransacciones(25,'pesos');
    var transObjetos = trans[0].map(
        (index) => {
            return (
                new Transaccion(index.idTransaccion, index.fecha, index.nombre_categoria, index.dinero)
                
            );
        }
    );
    this.setState({
        transacciones: [transObjetos]
    });
}