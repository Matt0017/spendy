import React from 'react'
import { Link } from 'react-router-dom'


import {getCategorias} from '../services/apiRoutes'
import '../styles/Fondo.css'

export default function FondoItem(props){

    async function handleClick(){
        const json = {
            idFondo: props.fondo.idFondo,
            nombre_fondo: props.fondo.nombre_fondo,
            codigo_fondo: props.fondo.codigo_fondo
        }
        var string = JSON.stringify(json)
        sessionStorage.setItem('fondo',string)

        const fondo = JSON.parse(sessionStorage.getItem('fondo'));
        const categorias =  await getCategorias(fondo.idFondo);
        console.log(categorias[0]);
        categorias[0].map(
            (index)=>{
                var string = JSON.stringify(index)
                return sessionStorage.setItem(index.nombre,string)
            }
        )
    }

    
    return(
        <Link to='/Movimientos'>
            <div class="post-slide" onClick={handleClick}>
                <div class="post-content">
                    <h3 class="post-title">{props.fondo.nombre_fondo}</h3>
                </div>
            </div>
        </Link>
        
        
    )   
    
}    
            
            