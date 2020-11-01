import React from 'react'
import CategoriasController from '../controllers/CategoriasController'

export default function Prueba(){
    const categorias = new CategoriasController();
    console.log(categorias)
    return(
        <div></div>
    )
}