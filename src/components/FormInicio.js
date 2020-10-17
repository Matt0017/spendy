import React from 'react';
import '../styles/InicioSesion.css';
import '../styles/App.css';

class FormInicio extends React.Component {
    render() {

		return (
            <div align="center" className="box">
                <span className='titulo' >INICIAR SESIÓN</span>
                <div className="row-1">
                <input className='campos' placeholder="EMAIL"/>
                </div>
                <div className="row-1">
                <input className='campos' placeholder="CONTRASEÑA"/>
                </div>
                <div className="row-1">
                    <a>Registrar</a>
                    <button className="button-p">Iniciar Sesión</button>
                </div>
            </div>
        );
    }
}

export default FormInicio;