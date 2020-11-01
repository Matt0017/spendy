import React from "react";
import imagen from '../images/Login.png';
import logo from '../images/logo.png';
import '../styles/InicioSesion.css';
import {Link} from 'react-router-dom'

import {getUsuario} from '../services/apiRoutes'

export default class InicioSesion extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            dni: '',
            contraseña: '',
            alert: false
        }
    }

    handleChange = (event) => {
        const {name, value} = event.target;
        this.setState({
          [name]: value
        })
      }

      handleClick = async () => {
        const login = {
          dni: this.state.dni,
          contraseña: this.state.contraseña,
        }
        const response = await getUsuario(login)
        
        if(response.status === 404){
            this.setState({
                alert: true
            })
            console.log(this.state.alert)
        }
        else if(response.status === 200){
            const json = await response.json()
            sessionStorage.setItem('usuario',JSON.stringify(json))
            this.props.history.push("/")
        }
      }
    render(){
        return (
            <div className="container-fluid inicio">
                <div className="row">
                    <img src={logo} className="logo" alt='logo'/>
                </div>
                <div className="row align-items-center inicio">
                    <div className="col-12 col-lg-8 text-center ">
                        <img src={imagen} className="image" alt='imagenInicio'/>
                    </div>
                    <div className="col">
                        <div className='row'>
                            <div className='col text-center'>
                                <h1 className='titulo'>INICIO SESION</h1>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col'>
                                <input type='email' className='campos' placeholder="Mail..." value={this.state.mail} name='mail' onChange={this.handleChange}/>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col'>
                                <input type='password' className='campos' placeholder="Contraseña..." value={this.state.password} name='password' onChange={this.handleChange}/>
                            </div>
                        </div>
                        <div className='row botones'>
                            <div className='col'>
                            <Link to='/Registro'><button className='button-s'>Registrar</button></Link><Link to='/Fondos'><button className='button-p'>Iniciar Sesion</button></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}