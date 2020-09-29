import React, {useContext} from 'react';
import {CurrentUserContext} from '../contexts/CurrentUserContext.js';

function Card(props) {

    // define context
    const currentUser = useContext(CurrentUserContext);
    // check if card belongs to user
    const isOwn = props.cardOwnerId === currentUser._id;

    // Create a variable which you then set in `className` for the like button
    const cardLikeButtonClassName = `element__like-button_active`;
    // Check if the card was liked by the current user
    const isLiked = props.cardLikes.some(i => i._id === currentUser._id);

    function handleCardClick() { 
        props.handleCardClick(props.cardLink, props.cardName);
       
    }

    function handleLikeClick() {
        props.onCardLike(props.cardLikes, props.cardId);
        
    }

    function handleDeleteClick() {
        props.handleDeleteClick(props.cardId);
    }

    return(
        
        <li className="element">
            <button className={`element__delete ${isOwn ? "element__delete_visible": ""}`} onClick={handleDeleteClick}></button>
            <div className="element__image" onClick={handleCardClick} style={{ backgroundImage: `url(${props.cardLink})`}}>   
            </div>
            <div className="element__title-container">
                <h2 className="element__title">{props.cardName}</h2>
                <div className="element__like-container">
                    <button className={`element__like-button ${isLiked ? cardLikeButtonClassName : ""}`} onClick={handleLikeClick}></button>
                    <p className="element__like-counter">{props.cardLikes.length}</p>
                </div>
            </div>
        </li>
    )
}

export default Card;