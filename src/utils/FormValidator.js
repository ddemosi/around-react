class FormValidator {
    constructor(settings, formElement){
        this._inputSelector = settings.inputSelector;
        this._submitButtonSelector = settings.submitButtonSelector;
        this._inactiveButtonClass = settings.inactiveButtonClass;
        this._inputErrorClass = settings.inputErrorClass;
        this._errorClass = settings.errorClass;

        this._formElement = formElement;
    }
    //ERROR MESSAGES

    _showErrorMessage(input) {
        const error = this._formElement.querySelector(`#${input.id}-error`);
        error.textContent = input.validationMessage;
    
        error.classList.add(this._errorClass);
        input.classList.add(this._inputErrorClass);
    }

    _hideErrorMessage(input) {
        const error = this._formElement.querySelector(`#${input.id}-error`);
        error.textContent = '';
    
        error.classList.remove(this._errorClass);
        input.classList.remove(this._inputErrorClass);
    }

    //disable and enable button if inputs are valid

    _toggleButtonState(inputs, button) {
        const isValid = inputs.every((input) => input.validity.valid);
    
        if (isValid) {
            button.classList.remove(this._inactiveButtonClass);
            button.disabled = false;
        } else {
            button.classList.add(this._inactiveButtonClass);
            button.disabled = true;
        }
    }

    _setEventListeners(){
        const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
        const buttonElement = this._formElement.querySelector(this._submitButtonSelector);

        inputList.forEach((item) => {
            item.addEventListener('input', ()=> {
                this._checkInputValidity(item);
                this._toggleButtonState(inputList, buttonElement, this._inactiveButtonClass);
            })
        })
    }

    //Show/hide errors if input is valid
    _checkInputValidity(input) {
        if (input.validity.valid) {
            this._hideErrorMessage(input);
        } else {
            this._showErrorMessage(input);
        }
    }
    //Disable/enable inputs if valid
    enableValidation() {
        
        //prevent all event defaults on the form
            // this._formElement.addEventListener('submit', (e)=> {
            //     e.preventDefault();
            // });

            this._setEventListeners()
        //select active inputs
        const inputs = [...this._formElement.querySelectorAll(this._inputSelector)];
        const button = this._formElement.querySelector(this._submitButtonSelector);
    
        inputs.forEach((input) => {
            input.addEventListener('input', () => {
                this._checkInputValidity(input);
                this._toggleButtonState(inputs, button);
            })
            
        })
    }
}

// const editProfileValidation = new FormValidator(defaultConfig, editProfile);
// const addCardValidation = new FormValidator(defaultConfig, addCard);
// const avatarUpdateValidation = new FormValidator(defaultConfig, avatarUpdateForm);

// export {editProfileValidation, addCardValidation, avatarUpdateValidation};