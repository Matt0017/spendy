import React from 'react';
import '../styles/InicioSesion.css';
import imagen from '../images/Login.png';
import logo from '../images/logo.png';
import Form from '../components/FormInicio.js'

class InicioSesion extends React.Component {
    render() {
        return (
        <div className="container">
            <div className="inicio">
            <img src={logo} className='logo'></img>
            <div className="row">
            <div className="col-6">
                <img src={imagen} className='image'></img>
                
            </div>
            <div className="col-6">
                <Form justify="center"/>
            </div>
            </div>
            </div>
        </div>);
    }
}

export default InicioSesion;