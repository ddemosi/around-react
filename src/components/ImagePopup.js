import React from 'react';

function ImagePopup(props) {
    return(
        
        <section className={`image-modal ${props.isOpen ? "image-modal_visible" : ""}`}>
                <div className="image-modal__container ">
                    <button className="modal__exit image-modal__exit" onClick={props.onClose}></button>
                    <img className="image-modal__image" src={props.link} alt={props.name}/>
                     <p className="image-modal__subtitle">{props.name}</p>  
                </div>
            </section>
    )
}

export default ImagePopup;