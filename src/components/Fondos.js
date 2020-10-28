import React from 'react'

import {getFondos} from '../services/apiRoutes'
import FondoClase from '../classes/FondoClase';
import Fondo from './Fondo';

export default class Fondos extends React.Component{
    constructor(props){
        super();
        this.state ={
            fondos: []
        }
    }



    async componentDidMount(){
		const fondos = await getFondos(15);
		var fondosClase = fondos.map(
			(index) => {
				return (
					new FondoClase(index.idFondo, index.nombre_fondo, index.codigo_fondo)
					
				);
			}
		);
		this.setState({
			fondos: fondosClase
		})
    }

    


    render(){
        return(
            <React.Fragment>
                {this.state.fondos.map(
                    (index) => {
                        return (
                            <div className='owl-item'>
                                <Fondo fondo={index}></Fondo>
                            </div>
                            
                            
                        );
                    }
                )}
            </React.Fragment>
            
        )
    }
}