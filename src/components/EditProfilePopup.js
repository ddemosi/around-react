import React, {useContext, useEffect, useState} from 'react';
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';

function EditProfilePopup(props) {

    //context declaration
    const currentUser = useContext(CurrentUserContext);
    //state declarations
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    //ref declarations
    const nameRef = React.createRef();
    const aboutRef = React.createRef();

    useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about)
    }, [currentUser])

    function onNameChange(e) {
        props.handleNameChange(e.target.value);
    }

    function onDescriptionChange(e) {
        props.handleDescriptionChange(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        const name = nameRef.current.value;
        const description = aboutRef.current.value;
        //submit to server
        props.onUpdateUser(name, description)
        setName(currentUser.name);
        setDescription(currentUser.about)
    }

    return(
        <PopupWithForm onSubmit={handleSubmit} name={"edit-profile"} title={"Edit Profile"} isOpen={props.isOpen} onClose={props.onClose} >
        <div className="form__text-field-wrapper form-width">
                <input ref={nameRef} onChange={onNameChange} id="profile-name" className="form__text-field form__input form__input_name" placeholder="Name" type="text" defaultValue={name} minLength="2" maxLength="40" required />
                <span id="profile-name-error" className="form__error"></span>
            </div>
            <div className="form__text-field-wrapper form-width">
                <input ref={aboutRef} onChange={onDescriptionChange} id="profile-about" className="form__text-field form__input form__input_about" placeholder="About me" type="text" defaultValue={description} minLength="2" maxLength="200" required />
                <span id="profile-about-error" className="form__error"></span>
            </div>
            <button type="submit" className="form__save-button form__save-button_profile form-width form__save-button_disabled">Save</button>
        </PopupWithForm>
        )
}

export default EditProfilePopup;