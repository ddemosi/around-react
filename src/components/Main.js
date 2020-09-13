import React, {useState, useEffect} from 'react';
import PopupWithForm from './PopupWithForm';
import editPencil from '../images/edit-pencil.svg';
import {api} from '../utils/Api.js';
import Card from './Card.js';
import ImagePopup from './ImagePopup.js';

function Main(props) {

    const [username, setUsername] = useState("");
    const [userDescription, setUserDescription] = useState("");
    const [userAvatar, setUserAvatar] = useState("");
    const [cards, setCards] = useState([]);
 

    useEffect(() => {
        api.getUserInfo().then((res) => {
            setUsername(res.name);
            setUserDescription(res.about);
            setUserAvatar(res.avatar);
        })
        .catch(err => console.log(err));

        api.getCardList().then((res) => {
            setCards(res.map((card) => {
                return {
                    name: card.name,
                    link: card.link,
                    likes: card.likes,
                    id: card._id
                }
            }))
        })
    }, [])



    return(
        <main className="main">
            <section className="profile width">
                <div className="profile__avatar-container">
                    <img className="profile__avatar" src={userAvatar} alt="Your profile"/>
                    <div className="profile__overlay">
                        <img className="profile__overlay-image" src={editPencil} alt="pencil" onClick={props.handleEditAvatarClick}/>
                    </div>
                    
                </div>
                <div className="profile__name-container">
                    <h2 className="profile__name">{username}</h2>
                    <button className="profile__edit-button" onClick={props.handleEditProfileClick}></button>
                    <p className="profile__subtitle">{userDescription}</p>
                </div>
                    
                <button className="form__save-button profile__add-button" onClick={props.handleAddCardClick}></button>
            </section>
            {/* Card Grid section */}
            <section className="elements width">
                <ul className="elements__grid-container">
                    {
                        cards.map((card) => {
                            return <Card key={card.id} cardName={card.name} cardLink={card.link} cardLikes={card.likes.length} handleCardClick={() => props.handleCardClick(card.link, card.name)}/>
                        })
                    }

                </ul>
            </section>

            {/* Popup forms */}
            <section className={`modal ${props.isOpen ? "modal_display_visible" : ""}`} onClick={props.onClose}>

                {/* Update Avatar form */}

                <PopupWithForm name={"update-avatar"} title={"Edit Avatar"} isOpen={props.editAvatarIsOpen} onClose={props.onClose} >
                <div className="form__text-field-wrapper form-width">
                        <input id="avatar-link" className="form__text-field form__input form__input_avatar-link" placeholder="Image URL" type="url"
                        defaultValue="" minLength="1" />
                        <span id="avatar-link-error" className="form__error"></span>
                    </div>
                    <button type="submit" className="form__save-button form__save-button_avatar-link form-width form__save-button_disabled" disabled>Save</button>
                </PopupWithForm>

                {/* Edit profile form */}
                <PopupWithForm name={"edit-profile"} title={"Edit Profile"} isOpen={props.editProfileIsOpen} onClose={props.onClose} >
                <div className="form__text-field-wrapper form-width">
                        <input id="profile-name" className="form__text-field form__input form__input_name" placeholder="Name" type="text" defaultValue={username} minLength="2" maxLength="40" required />
                        <span id="profile-name-error" className="form__error"></span>
                    </div>
                    <div className="form__text-field-wrapper form-width">
                        <input id="profile-about" className="form__text-field form__input form__input_about" placeholder="About me" type="text" defaultValue={userDescription} minLength="2" maxLength="200" required />
                        <span id="profile-about-error" className="form__error"></span>
                    </div>
                    <button type="submit" className="form__save-button form__save-button_profile form-width form__save-button_disabled" disabled>Save</button>
                </PopupWithForm>

                {/* Add Card form */}
                <PopupWithForm name={"card"} title={"New Place"} isOpen={props.addCardIsOpen} onClose={props.onClose}>
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
                <PopupWithForm name={"confirm"} title={"Are you sure?"} isOpen={props.confirmDeleteIsOpen} onClose={props.onClose}>
                    <input type="hidden" className="form__input form__card-id" />
                    <button type="button" className="form__save-button form__save-button_confirm form-width">Yes</button>
                </PopupWithForm>

                {/* Update Popup form */}
                <ImagePopup isOpen={props.selectedCardIsOpen} onClose={props.onClose} name={props.selectedCardName} link={props.selectedCardLink} />
            </section>
        </main>
    )
}

export default Main;