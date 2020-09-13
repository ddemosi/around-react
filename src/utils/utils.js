// //Global Selectors
// const modal = document.querySelector(".modal");

// // Selectors for image pop up
// const imageModal = document.querySelector('.image-modal');

// //Selectors for Add modal
// const nameInput = document.querySelector('.form__input_image-title');
// const linkInput = document.querySelector('.form__input_image-link');
// const addCard = modal.querySelector('.form_card');
// const addButton = document.querySelector('.profile__add-button');

// //Selectors for edit modal
// const editProfile = modal.querySelector('.form_edit-profile');
// const editButton = document.querySelector('.profile__edit-button');
// const editNameInput = document.querySelector('.form__input_name');
// const editAboutInput = document.querySelector('.form__input_about');

// //Selectors for Avatar modal
// const avatarUpdateForm = modal.querySelector('.form_update-avatar');
// const editAvatar = document.querySelector('.profile__avatar-container');
// const avatarElement = document.querySelector('.profile__avatar');

// //Selectors for delete modal
// const removeCardID = document.querySelector('.form__card-id');
// //api data
const apiEndpoints = {
    url: "https://around.nomoreparties.co/v1/group-3",
    headers: { 
      authorization: "98dd8ac9-99ea-4ab0-85f9-6d61f9934e14",
     "Content-Type": "application/json"
     }
}

const myId = "747ab9509999074a8ccb0d68"

//default validation config

// const defaultConfig = {
//     inputSelector: ".form__input",
//     submitButtonSelector: ".form__save-button",
//     inactiveButtonClass: "form__save-button_disabled",
//     inputErrorClass: "form__input-error",
//     errorClass: "form__error_visible"
// };

// function toggleModal() {
//     modal.classList.toggle('modal_display_visible');
// }

// function loadingIcon(isLoading, modal) {
//     if (isLoading) {
//      modal.querySelector('.form__save-button').textContent = "Saving...";
//     } else {
//      modal.querySelector('.form__save-button').textContent = "Saved!";
//     }
//    }

export { apiEndpoints, myId};