import React from 'react';

import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

import {getFondos} from '../services/apiRoutes'
import FondoClase from '../classes/FondoClase';
import Fondo from '../components/Fondo';


export default class SeleccionarFondo extends React.Component {
    
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
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        {this.state.fondos.length && (<OwlCarousel className="owl-theme">
                            {this.state.fondos.map(
                                (index) => {
                                    return (
                                        <div className='item'>
                                            <Fondo fondo={index}></Fondo>
                                        </div>
                                    );
                                }
                            )}
                        </OwlCarousel>)}
                    </div>
                </div>
            </div>
        );
    }
}
