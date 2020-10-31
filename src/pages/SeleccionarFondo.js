import React from 'react';

import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import Popup from 'reactjs-popup';

import logo from '../images/logo.png'
import {getFondos} from '../services/apiRoutes'
import FondoClase from '../classes/Fondo';
import FondoItem from '../components/FondoItem';

import '../styles/Fondo.css'


export default class SeleccionarFondo extends React.Component {
    
    constructor(props){
        super();
        this.state ={
            fondos: [],
            agregarFondoOpen: false,
            fondoNuevo: '',
            codigo: ''
        }
    }

    openAgregarFondo() {
		this.setState({
            agregarFondoOpen: true 
        })
    }
    
    closeAgregarFondo() {
		this.setState({
            agregarFondoOpen: false
        })
    }
    
    handleChange = (event) => {
        const {name, value} = event.target;
        this.setState({
          [name]: value
        })
      }

    async componentDidMount(){
		const fondos = await getFondos(2);
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
        const options={
            responsive:{
              0:{
                  items:1
              },
              600:{
                  items:2
              },
              1000:{
                  items:3
              }
            }
          }
        return (
            <div className="container fondos">
                <div className='row'>
                    <div className='col text-left'>
                        <img src={logo} alt='logo' className='logo'></img>
                    </div>
                </div>
                <div className='row align-items-center titulo'>
                    <div className='col text-center'>
                        <h1>¿A QUE FONDO QUIERES INGRESAR?</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        {this.state.fondos.length && (
                        <OwlCarousel 
                        className="owl-theme"
                        items= '3'
                        autoplay
                        {...options}>
                            {this.state.fondos.map(
                                (index) => {
                                    return (
                                        <FondoItem fondo={index}></FondoItem>
                                    );
                                }
                            )}
                        </OwlCarousel>)}
                    </div>
                </div>
                <div className='row'>
                    <div className='col text-center'>
                        <button className='button-p' onClick={this.openAgregarFondo.bind(this)}>Agregar Fondo</button>
                    </div>
                </div>
                <div className='row'>
                    <div className='col text-center'>
                        <Popup
                        open={this.state.agregarFondoOpen} 
                        className='transaccion-popup' 
                        onClose={() => {this.setState({ agregarFondoOpen: false })}}
                        >
                            <div className='container agregarFondo'>
                                <div className='row'>
                                    <div className='col text-center'>
                                        <span>Crea un nuevo fondo</span>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col text-center'>
                                        <input className ='inputVioleta' 
                                            type='text' 
                                            name="fondoNuevo"
                                            value={this.state.fondoNuevo} 
                                            onChange={this.handleChange}
                                            placeholder='Elige un nombre para tu Fondo'></input>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col text-center'>
                                        <span>O agregra uno ya existente con su codigo</span>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col text-center'>
                                        <input className ='inputGris' 
                                            type='text' 
                                            name="codigo"
                                            onChange={this.handleChange} 
                                            value={this.state.codigo} 
                                            placeholder='Ingresa el codigo de un Fondo'></input>
                                    </div>
                                </div>
                                <div className='row m-2'>
                                    <div className='col text-center'>
                                        <button className='button-s' onClick={this.closeAgregarFondo.bind(this)}>Cancelar</button>
                                    </div>
                                    <div className='col text-center'>
                                        <button className='button-p'>Confirmar</button>
                                    </div>
                                    
                                </div>
                            </div>
                        </Popup>
                    </div>
                </div>
                
            </div>
        );
    }
}
