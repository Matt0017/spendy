import {getFondo} from './apiRoutes'

export class Controller{
    contructor(){
        this.state = {
            fondo: {},
            categorias: []
        };
    }

    fondo(usuario,fondo){
        var get = getFondo(usuario,fondo)[0]
        return get
    }

    setFondo(usuario,fondo){
        this.setState({
            fondo: fondo(usuario,fondo)
        })
        console.log(fondo)
    }

    setCategoria(categorias){
        this.setState({
            categorias: categorias
        })
    }

    // render(){
    //     return(

    //     )
    // }
}