import React, {useState} from 'react';
import '../index.css';

import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';

function App() {
    const [editAvatarIsOpen, toggleEditAvatar] = useState(false);
    const [editProfileIsOpen, toggleEditProfile] = useState(false);
    const [addCardIsOpen, toggleAddCard] = useState(false);
    const [confirmDeleteIsOpen, toggleConfirmDelete] = useState(false);
    const [selectedCard, setSelectedCard] = useState({
        link: "",
        name: "",
        isOpen: false
    });
    const [userInfo, setUserInfo] = useState({
        username: "",
        userDescription: "",
        userAvatar: ""
    })
    
    function handleEditAvatarClick(e) {
        toggleEditAvatar(true);
    }

    function handleEditProfileClick(e) {
        toggleEditProfile(true);
    }

    function handleAddCardClick(e) {
        toggleAddCard(true);
    }

    function handleCardClick(link, name) {
        setSelectedCard({link: link, name: name, isOpen: true});
    }

    function closeAllPopups(e) {
        if(e.target === e.currentTarget) {
            toggleEditAvatar(false);
            toggleEditProfile(false);
            toggleAddCard(false);
            toggleConfirmDelete(false);
            setSelectedCard({link: "", name: "", isOpen: false})
        }
    }

    function isOpen() {
        if (selectedCard.isOpen || editAvatarIsOpen || editProfileIsOpen || addCardIsOpen) {
            return true;
        } else {
            return false
        }
    }
  return (
    <div className="App">
    <div className="page">
        <Header/>
        <Main
        selectedCard={selectedCard}
        userInfo={userInfo}
        setUserInfo={setUserInfo}
        handleEditAvatarClick={handleEditAvatarClick}
        handleEditProfileClick={handleEditProfileClick}
        handleAddCardClick={handleAddCardClick}
        handleCardClick={handleCardClick}
        />
        
            {/* Popup forms */}
            <section className={`modal ${isOpen() ? "modal_display_visible" : ""}`} onClick={closeAllPopups}>
                
                {/* Update Avatar form */}

                <PopupWithForm name={"update-avatar"} title={"Edit Avatar"} isOpen={editAvatarIsOpen} onClose={closeAllPopups} >
                <div className="form__text-field-wrapper form-width">
                        <input id="avatar-link" className="form__text-field form__input form__input_avatar-link" placeholder="Image URL" type="url"
                        defaultValue="" minLength="1" />
                        <span id="avatar-link-error" className="form__error"></span>
                    </div>
                    <button type="submit" className="form__save-button form__save-button_avatar-link form-width form__save-button_disabled" disabled>Save</button>
                </PopupWithForm>

                {/* Edit profile form */}
                <PopupWithForm name={"edit-profile"} title={"Edit Profile"} isOpen={editProfileIsOpen} onClose={closeAllPopups} >
                <div className="form__text-field-wrapper form-width">
                        <input id="profile-name" className="form__text-field form__input form__input_name" placeholder="Name" type="text" defaultValue={userInfo.username} minLength="2" maxLength="40" required />
                        <span id="profile-name-error" className="form__error"></span>
                    </div>
                    <div className="form__text-field-wrapper form-width">
                        <input id="profile-about" className="form__text-field form__input form__input_about" placeholder="About me" type="text" defaultValue={userInfo.userDescription} minLength="2" maxLength="200" required />
                        <span id="profile-about-error" className="form__error"></span>
                    </div>
                    <button type="submit" className="form__save-button form__save-button_profile form-width form__save-button_disabled" disabled>Save</button>
                </PopupWithForm>

                {/* Add Card form */}
                <PopupWithForm name={"card"} title={"New Place"} isOpen={addCardIsOpen} onClose={closeAllPopups}>
                <div className="form__text-field-wrapper form-width">
                        <input id="image-title" className="form__text-field form__input form__input_image-title" placeholder="Title" type="text" defaultValue="" minLength="1" maxLength="30" />
                        <span id="image-title-error" className="form__error"></span>
                    </div>
                    <div className="form__text-field-wrapper form-width">
                        <input id="image-link" className="form__text-field form__input form__input_image-link" placeholder="Image URL" type="url"
                        defaultValue="" minLength="1" />
                        <span id="image-link-error" className="form__error"></span>
                    </div>
                    <button type="submit" className="form__save-button form__save-button_card form-width form__save-button_disabled" disabled>Create</button>
                </PopupWithForm>
                
                {/* Confirm delete popup */}
                <PopupWithForm name={"confirm"} title={"Are you sure?"} isOpen={confirmDeleteIsOpen} onClose={closeAllPopups}>
                    <input type="hidden" className="form__input form__card-id" />
                    <button type="button" className="form__save-button form__save-button_confirm form-width">Yes</button>
                </PopupWithForm>
                {/* Update Popup form */}
                <ImagePopup isOpen={selectedCard.isOpen} onClose={closeAllPopups} name={selectedCard.name} link={selectedCard.link} />
            </section>

        <Footer/>
        
    </div>
    </div>
  );
}

export default App;
