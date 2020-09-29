import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {

    const titleRef = React.createRef();
    const linkRef = React.createRef();

    function onSubmit(e) {
        e.preventDefault();
        const name = titleRef.current.value;
        const link = linkRef.current.value;
        props.onAddPlace(name, link);
    }

    return(
            <PopupWithForm name={"card"} title={"New Place"} isOpen={props.isOpen} onClose={props.onClose} onSubmit={onSubmit}>
                <div className="form__text-field-wrapper form-width">
                        <input ref={titleRef}id="image-title" className="form__text-field form__input form__input_image-title" placeholder="Title" type="text" defaultValue="" minLength="1" maxLength="30" />
                        <span id="image-title-error" className="form__error"></span>
                    </div>
                    <div className="form__text-field-wrapper form-width">
                        <input ref={linkRef} id="image-link" className="form__text-field form__input form__input_image-link" placeholder="Image URL" type="url"
                        defaultValue="" minLength="1" />
                        <span id="image-link-error" className="form__error"></span>
                    </div>
    <button type="submit"  className="form__save-button form__save-button_card form-width fomr__save-button_disabled">{props.isSaving ? 'Saving...' : 'Create'}</button>
            </PopupWithForm>        
    )
}

export default AddPlacePopup;