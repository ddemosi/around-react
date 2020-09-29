import React, {useState, useEffect} from 'react';
import '../index.css';

import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import ImagePopup from './ImagePopup.js';
import {CurrentUserContext} from '../contexts/CurrentUserContext.js';
import {api} from '../utils/Api.js'
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ConfirmDeletePopup from './ConfirmDeletePopup';

function App() {
    const [currentUser, setCurrentInfo] = useState("")
    const [editAvatarIsOpen, toggleEditAvatar] = useState(false);
    const [editProfileIsOpen, toggleEditProfile] = useState(false);
    const [addCardIsOpen, toggleAddCard] = useState(false);
    const [confirmDeleteIsOpen, toggleConfirmDelete] = useState(false);
    const [confirmDeleteId, setConfirmDeleteId] = useState("")
    const [selectedCard, setSelectedCard] = useState({
        link: "",
        name: "",
        isOpen: false
    });
    const [isSaving, toggleSaveText] = useState(false);
    const [cards, setCards] = useState([]);


    //functions for Edit Profile
    function handleNameChange(value) {
        setCurrentInfo({...currentUser, name: value});
    }
    function handleDescriptionChange(value) {
        setCurrentInfo({...currentUser, about: value});
    }
    function handleEditProfileClick(e) {
        toggleEditProfile(true);
    }
    function onUpdateUser(name, description) {
        toggleSaveText(true);
        api.changeProfileInfo({name: name, about: description}).then(() => {
            getCurrentUserInfo();
        });
        toggleSaveText(false);
        toggleEditProfile(false);
    }


    //functions for Edit Avatar
    function handleEditAvatarClick(e) {
        toggleEditAvatar(true);
    }
    function onUpdateAvatar(link) {
        toggleSaveText(true)
            api.updateAvatar(link).then(() => {
                getCurrentUserInfo();
            });
            toggleSaveText(false)
            toggleEditAvatar(false);
        }


    //functions for Add place
    function handleAddCardClick(e) {
        toggleAddCard(true);
    }
    function onAddPlace(name, link) {
        toggleSaveText(true);
        api.addCard({name: name, link: link}).then((newCard) => {

            setCards([...cards, newCard]);
        }).then(() => {
            toggleSaveText(false);
            toggleAddCard(false);
        })
    }


    //functions for Cards
    function onCardDelete(cardId) {
        toggleSaveText(true);
        //delete card from server
        api.deleteCard(cardId).then(() => {
        //filter cards on page and remove the card with matching id from the array
        const filteredCards = cards.filter(card => card.id !== cardId)
        //set new card array state
        setCards(filteredCards);
        });
        toggleSaveText(false);
        toggleConfirmDelete(false);
        }
    function handleDeleteClick(cardId) {
        setConfirmDeleteId(cardId);
        toggleConfirmDelete(true);

        }
   function handleCardClick(link, name) {
        setSelectedCard({link: link, name: name, isOpen: true});
        }
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


    //function to assign context data

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


    //global functions

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
        if (selectedCard.isOpen || editAvatarIsOpen || editProfileIsOpen || addCardIsOpen || confirmDeleteIsOpen) {
            return true;
        } else {
            return false
        }
    }

    //API request for User Info
    useEffect(() => {
        getCurrentUserInfo();

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
        setCards={setCards}
        cards={cards}
        handleDeleteClick={handleDeleteClick}
        handleCardLike={handleCardLike}
        />
        
            {/* Popup forms */}
            <section className={`modal ${isOpen() ? "modal_display_visible" : ""}`} onClick={closeAllPopups}>
                
                {/* Update Avatar form */}

                <EditAvatarPopup onUpdateAvatar={onUpdateAvatar} isOpen={editAvatarIsOpen} onClose={closeAllPopups} isSaving={isSaving}/>

                {/* Edit profile form */}
                <EditProfilePopup onUpdateUser={onUpdateUser} handleNameChange={handleNameChange} handleDescriptionChange={handleDescriptionChange} 
                isOpen={editProfileIsOpen} onClose={closeAllPopups} isSaving={isSaving} />

                {/* Add Card form */}
                <AddPlacePopup onUpdateUser={onUpdateUser} handleNameChange={handleNameChange} handleDescriptionChange={handleDescriptionChange} 
                isOpen={addCardIsOpen} onClose={closeAllPopups} onAddPlace={onAddPlace} isSaving={isSaving}/>
                
                {/* Confirm delete popup */}
                <ConfirmDeletePopup isOpen={confirmDeleteIsOpen} onClose={closeAllPopups} onCardDelete={onCardDelete} confirmDeleteId={confirmDeleteId} isSaving={isSaving}/>
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
