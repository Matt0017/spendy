import React from "react";
import imagen from '../images/Login.png';
import logo from '../images/logo.png';
import '../styles/InicioSesion.css';
import {Link} from 'react-router-dom'

export default function Prueba(){
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
                            <input type='email' className='campos' placeholder="Email..."/>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col'>
                            <input type='password' className='campos' placeholder="Contraseña..."/>
                        </div>
                    </div>
                    <div className='row botones'>
                        <div className='col'>
                            <button className='button-s'>Registrar</button><Link to='/Transacciones'><button className='button-p'>Iniciar Sesion</button></Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}