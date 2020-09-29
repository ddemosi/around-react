import React, {useContext} from 'react';
import editPencil from '../images/edit-pencil.svg';
import Card from './Card.js';
import {CurrentUserContext} from '../contexts/CurrentUserContext.js';


function Main(props) {

    const currentUser = useContext(CurrentUserContext)

    return(
        <main className="main">
            <section className="profile width">
                <div className="profile__avatar-container">
                    <img className="profile__avatar" src={currentUser.avatar} alt="Your profile"/>
                    <div className="profile__overlay">
                        <img className="profile__overlay-image" src={editPencil} alt="pencil" onClick={props.handleEditAvatarClick}/>
                    </div>
                    
                </div>
                <div className="profile__name-container">
                    <h2 className="profile__name">{currentUser.name}</h2>
                    <button className="profile__edit-button" onClick={props.handleEditProfileClick}></button>
                    <p className="profile__subtitle">{currentUser.about}</p>
                </div>
                    
                <button className="form__save-button profile__add-button" onClick={props.handleAddCardClick}></button>
            </section>
            {/* Card Grid section */}
            <section className="elements width">
                <ul className="elements__grid-container">
                    {
                        props.cards.map((card) => {
                            return <Card key={card.id} cardName={card.name} cardId={card.id} cardOwnerId={card.ownerId} cardLink={card.link} cardLikes={card.likes}
                            onCardLike={props.handleCardLike} handleDeleteClick={props.handleDeleteClick} handleCardClick={props.handleCardClick} />
                        })
                    }

                </ul>
            </section>
        </main>
    )
}

export default Main;