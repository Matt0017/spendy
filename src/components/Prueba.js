import React from "react";
import imagen from '../images/Login.png';
import logo from '../images/logo.png';
import '../styles/InicioSesion.css';
import Form from '../components/FormInicio.js'

export default function Prueba(){
    return (
        <div className="container-fluid">
            <div className="row">
                <img src={logo} className="logo"/>
            </div>
            <div className="row">
                <div className="col-12 col-lg-8">
                    <img src={imagen} className="image"/>
                </div>
                <div className="col">
                    <Form/>
                </div>
            </div>
        </div>
    )
}