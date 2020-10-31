import {getCategorias} from '../services/apiRoutes'

export default class CategoriasController{
    contructor(){
        this.categorias = [];
    }

    async getCategorias(){
        const fondo = JSON.parse(sessionStorage.getItem('fondo'));
        const categorias =  await getCategorias(fondo.idFondo);
        console.log(categorias);
        this.categorias = categorias;
    }
    

    


}