import React from "react";
import imagen from '../images/Login.png';
import logo from '../images/logo.png';
import '../styles/InicioSesion.css';
import {Link} from 'react-router-dom'

import {registrar, getUsuario} from '../services/apiRoutes'

export default class Registro extends React.Component{
    constructor(props){
        super();
        this.state={
          nombre: '',
          apellido: '',
          mail: '',
          password: ''
        }
    }
  
    handleChange = (event) => {
        const {name, value} = event.target;
        this.setState({
            [name]: value
        })
    }
  
    handleClick = async () => {
        const usuario = {
          nombre: this.state.nombre,
          apellido: this.state.apellido,
          mail: this.state.mail,
          password: this.state.password,
        }
        await registrar(usuario)
        // console.log(await getUsuario())
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
                                <h1 className='titulo'>REGISTRO</h1>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col'>
                                <input type='email' className='campos' placeholder="Mail..." value={this.state.mail} name='mail' onChange={this.handleChange}/>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col'>
                                <input type='text' className='campos' placeholder="Nombre..." value={this.state.nombre} name='nombre' onChange={this.handleChange}/>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col'>
                                <input type='text' className='campos' placeholder="Apellido..." value={this.state.apellido} name='apellido' onChange={this.handleChange}/>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col'>
                                <input type='password' className='campos' placeholder="password..." value={this.state.password} name='password' onChange={this.handleChange}/>
                            </div>
                        </div>
                        <div className='row botones'>
                            <div className='col'>
                            <Link to='/InicioSesion'><button className='button-s'>Iniciar Sesión</button></Link><Link to="/Fondos"><button className='button-p' onClick={this.handleClick}>Registrar</button></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}