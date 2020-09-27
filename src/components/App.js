import React, {useState, useEffect} from 'react';
import '../index.css';

import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';
import {CurrentUserContext} from '../contexts/CurrentUserContext.js';
import {api} from '../utils/Api.js'
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';

function App() {
    const [currentUser, setCurrentInfo] = useState("")
    const [editAvatarIsOpen, toggleEditAvatar] = useState(false);
    const [editProfileIsOpen, toggleEditProfile] = useState(false);
    const [addCardIsOpen, toggleAddCard] = useState(false);
    const [confirmDeleteIsOpen, toggleConfirmDelete] = useState(false);
    const [selectedCard, setSelectedCard] = useState({
        link: "",
        name: "",
        isOpen: false
    });

    function handleNameChange(value) {
        setCurrentInfo({...currentUser, name: value});
    }
    function handleDescriptionChange(value) {
        setCurrentInfo({...currentUser, about: value});
    }
    
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

    function onUpdateUser(name, description) {
        api.changeProfileInfo({name: name, about: description}).then(() => {
            getCurrentUserInfo();
        });
        
        toggleEditProfile(false);
    }

    function onUpdateAvatar(link) {
        api.updateAvatar(link).then(() => {
            getCurrentUserInfo();
        });
        
        toggleEditAvatar(false);
    }

    function getCurrentUserInfo() {
        api.getUserInfo().then((res) => {
            setCurrentInfo({
                name: res.name,
                about: res.about,
                avatar: res.avatar,
                _id: res._id
            });
        })
        .catch(err => console.log(err));
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

    useEffect(() => {
        getCurrentUserInfo();
    }, [])

  return (
    <CurrentUserContext.Provider value={currentUser}>
    <div className="App">
    <div className="page">
        <Header/>
        <Main
        selectedCard={selectedCard}
        handleEditAvatarClick={handleEditAvatarClick}
        handleEditProfileClick={handleEditProfileClick}
        handleAddCardClick={handleAddCardClick}
        handleCardClick={handleCardClick}
        />
        
            {/* Popup forms */}
            <section className={`modal ${isOpen() ? "modal_display_visible" : ""}`} onClick={closeAllPopups}>
                
                {/* Update Avatar form */}

                <EditAvatarPopup onUpdateAvatar={onUpdateAvatar} isOpen={editAvatarIsOpen} onClose={closeAllPopups} />

                {/* Edit profile form */}
                <EditProfilePopup onUpdateUser={onUpdateUser} handleNameChange={handleNameChange} handleDescriptionChange={handleDescriptionChange} 
                isOpen={editProfileIsOpen} onClose={closeAllPopups} />

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
    </CurrentUserContext.Provider>
  );
}

export default App;
