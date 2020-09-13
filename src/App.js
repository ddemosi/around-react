import React, {useState} from 'react';
import './pages/index.css';

import Header from './components/Header.js';
import Main from './components/Main.js';
import Footer from './components/Footer.js';

function App() {
    const [editAvatarIsOpen, toggleEditAvatar] = useState(false);
    const [editProfileIsOpen, toggleEditProfile] = useState(false);
    const [addCardIsOpen, toggleAddCard] = useState(false);
    const [selectedCardIsOpen, toggleSelectedCard] = useState(false);
    const [selectedCardLink, addSelectedCardLink] = useState("");
    const [selectedCardName, addSelectedCardName] = useState("");
    
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
        toggleSelectedCard(true);
        addSelectedCardLink(link);
        addSelectedCardName(name);
    }

    function closeAllPopups(e) {
        if(e.target === e.currentTarget) {
            toggleEditAvatar(false);
            toggleEditProfile(false);
            toggleAddCard(false);
            toggleSelectedCard(false);
            addSelectedCardLink("");
            addSelectedCardName("");
        }
    }


  return (
    <div className="App">
    <div className="page">
        <Header/>
        <Main
        editAvatarIsOpen={editAvatarIsOpen}
        editProfileIsOpen={editProfileIsOpen}
        addCardIsOpen={addCardIsOpen}
        selectedCardIsOpen={selectedCardIsOpen}
        selectedCardName={selectedCardName}
        selectedCardLink={selectedCardLink}
        handleEditAvatarClick={handleEditAvatarClick}
        handleEditProfileClick={handleEditProfileClick}
        handleAddCardClick={handleAddCardClick}
        onClose={closeAllPopups}
        handleCardClick={handleCardClick}
        isOpen={selectedCardIsOpen || editAvatarIsOpen || editProfileIsOpen || addCardIsOpen}
        />
        <Footer/>
        
    </div>
    </div>
  );
}

export default App;
