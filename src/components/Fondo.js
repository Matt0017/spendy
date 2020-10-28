import React from 'react'


export default class Fondo extends React.Component {
    constructor(props){
        super();
        this.state = {
            id: props.fondo.idFondo,
            nombre: props.fondo.nombre
        }
    }


    render(){
        return(
            <div className='item'>
                <div className="post-slide">
                    <div className="post-content">
                        <h3 className="post-title">{this.state.nombre}</h3>
                    </div>
                </div>
            </div>
            
        )   
    }
}    
            
            