import React from 'react';

function Card(props) {
    return(
        <li className="element">
            <button className="element__delete"></button>
            <input type="hidden" className="element__id" value=""/>
            <div className="element__image" onClick={props.handleCardClick} style={{ backgroundImage: `url(${props.cardLink})`
         }}>   
            </div>
            <div className="element__title-container">
                <h2 className="element__title">{props.cardName}</h2>
                <div className="element__like-container">
                    <button className="element__like-button"></button>
                    <p className="element__like-counter">{props.cardLikes}</p>
                </div>
            </div>
        </li>
    )
}

export default Card;