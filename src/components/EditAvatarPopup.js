import React, { useContext } from 'react';
import PopupWithForm from './PopupWithForm';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

function EditAvatarPopup(props) {

    //context declaration
    const currentUser = useContext(CurrentUserContext);
    //ref declarations
    const linkRef = React.createRef();

    function onSubmit(e) {
        e.preventDefault();
        const link = linkRef.current.value;
        //submit to server
        props.onUpdateAvatar(link)
    }



    return(
        <PopupWithForm name={"update-avatar"} title={"Edit Avatar"} onSubmit={onSubmit} isOpen={props.isOpen} onClose={props.onClose} >
        <div className="form__text-field-wrapper form-width">
                <input ref={linkRef} id="avatar-link" className="form__text-field form__input form__input_avatar-link" placeholder="Image URL" type="url"
                defaultValue={currentUser.avatar} minLength="1" />
                <span id="avatar-link-error" className="form__error"></span>
            </div>
            <button type="submit" className="form__save-button form__save-button_avatar-link form-width">{props.isSaving ? 'Saving...' : 'Save'}</button>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;