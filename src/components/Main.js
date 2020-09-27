import React, {useState, useEffect, useContext} from 'react';
import editPencil from '../images/edit-pencil.svg';
import {api} from '../utils/Api.js';
import Card from './Card.js';
import {CurrentUserContext} from '../contexts/CurrentUserContext.js';


function Main(props) {
    const [cards, setCards] = useState([]);
    
    const currentUser = useContext(CurrentUserContext)

    useEffect(() => {

        api.getCardList().then((res) => {
            setCards(res.map((card) => {
                
                return {
                    name: card.name,
                    link: card.link,
                    likes: card.likes,
                    id: card._id,
                    ownerId: card.owner._id
                }
            }))
        })
        .catch(err => console.log(err))
    }, [])

    function handleCardLike(cardLikes, cardId) {
        // Check one more time if this card was already liked
        const isLiked = cardLikes.some(i => i.id === currentUser.id);
        // Send a request to the API and getting the updated card data
        api.changeLikeCardStatus(cardId, !isLiked).then((newCard) => {
            // Create a new array based on the existing one and putting a new card into it
          const newCards = cards.map((c) => c.id === cardId ? newCard : c);
          // Update the state
          setCards(newCards);
        });
    }

    function handleCardDelete(cardId) {
        //delete card from server
        api.deleteCard(cardId);
        //filter cards on page and remove the card with matching id from the array
        const filteredCards = cards.filter(card => card._id !== cardId)
        //set new card array state
        setCards(filteredCards);

    }

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
                        cards.map((card) => {
                            return <Card key={card.id} cardName={card.name} cardId={card.id} cardOwnerId={card.ownerId} cardLink={card.link} cardLikes={card.likes}
                            onCardLike={handleCardLike} handleCardDelete={handleCardDelete} handleCardClick={props.handleCardClick} />
                        })
                    }

                </ul>
            </section>
        </main>
    )
}

export default Main;