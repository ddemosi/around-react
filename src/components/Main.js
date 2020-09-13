import React, {useState, useEffect} from 'react';
import editPencil from '../images/edit-pencil.svg';
import {api} from '../utils/Api.js';
import Card from './Card.js';


function Main(props) {
    const [cards, setCards] = useState([]);
 

    useEffect(() => {
        api.getUserInfo().then((res) => {
            props.setUserInfo({
                username: res.name,
                userDescription: res.about,
                userAvatar: res.avatar
            });
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
        .catch(err => console.log(err))
    }, [props])



    return(
        <main className="main">
            <section className="profile width">
                <div className="profile__avatar-container">
                    <img className="profile__avatar" src={props.userInfo.userAvatar} alt="Your profile"/>
                    <div className="profile__overlay">
                        <img className="profile__overlay-image" src={editPencil} alt="pencil" onClick={props.handleEditAvatarClick}/>
                    </div>
                    
                </div>
                <div className="profile__name-container">
                    <h2 className="profile__name">{props.userInfo.username}</h2>
                    <button className="profile__edit-button" onClick={props.handleEditProfileClick}></button>
                    <p className="profile__subtitle">{props.userInfo.userDescription}</p>
                </div>
                    
                <button className="form__save-button profile__add-button" onClick={props.handleAddCardClick}></button>
            </section>
            {/* Card Grid section */}
            <section className="elements width">
                <ul className="elements__grid-container">
                    {
                        cards.map((card) => {
                            return <Card key={card.id} cardName={card.name} cardLink={card.link} cardLikes={card.likes.length} handleCardClick={props.handleCardClick} />
                        })
                    }

                </ul>
            </section>
        </main>
    )
}

export default Main;