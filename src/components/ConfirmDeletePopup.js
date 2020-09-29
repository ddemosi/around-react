import React from 'react';
import PopupWithForm from './PopupWithForm';

function ConfirmDeletePopup(props) {

    function onSubmit(e) {
        e.preventDefault();
        
        //submit to server
        props.onCardDelete(props.confirmDeleteId);
    }



    return(
        <PopupWithForm name={"confirm"} title={"Are you sure?"} onSubmit={onSubmit} isOpen={props.isOpen} onClose={props.onClose} >
            <button type="submit" className="form__save-button form__save-button_avatar-link form-width">{props.isSaving ? 'Saving...' : 'Yes'}</button>
        </PopupWithForm>
    )
}

export default ConfirmDeletePopup;