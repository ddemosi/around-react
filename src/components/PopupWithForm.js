import React from 'react';

function PopupWithForm(props) {



    return(
            <form name={props.name} onSubmit={props.onSubmit} className={`form form_${props.name} ${props.isOpen ? "form_visible" : ""}`}>
                    <button className={`modal__exit form__exit form__exit_${props.name}`} onClick={props.onClose} type="reset"></button>
                    <p className="form__title form-width">{props.title}</p>
                    {props.children}
                </form>
        )
}

export default PopupWithForm;