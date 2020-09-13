import {apiEndpoints} from "./utils.js";

class Api {
  constructor(endpoint) {
    this._apiEndpoint = endpoint.url;
    this._auth = endpoint.headers;
  }

  _checkResponse(res) {
    return (res.ok ? res.json() : Promise.reject(`Error: ${res.status}`));
  }
  getUserInfo() {
      return fetch(`${this._apiEndpoint}/users/me`, {
      headers: this._auth
      })
      .then ((res) => {
        return this._checkResponse(res)})
      .catch(err => console.log(err))
  }

  getCardList() {
    return fetch(`${this._apiEndpoint}/cards`, {
      headers: this._auth
    })
    .then ( res => this._checkResponse(res))
    .catch( err => console.log(err))
  }

  changeProfileInfo(data) {
    return fetch(`${this._apiEndpoint}/users/me`, {
      method: "PATCH",
      headers: this._auth,
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    })
    .then ( res => this._checkResponse(res))
    .catch( err => console.log(err))
  }

  addCard(data) {
    return fetch(`${this._apiEndpoint}/cards`, {
      method: "POST",
      headers: this._auth,
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
    .then ( res => this._checkResponse(res))
    .catch( err => console.log(err))
  }

  deleteCard(cardID) {
    return fetch(`${this._apiEndpoint}/cards/${cardID}`, {
      method: "DELETE",
      headers: this._auth
    })
    .then ( res => this._checkResponse(res))
    .catch( err => console.log(err))
  }

  cardLike(cardID) {
    return fetch(`${this._apiEndpoint}/cards/likes/${cardID}`, {
      method: "PUT",
      headers: this._auth
    })
    .then ( res => this._checkResponse(res))
    .catch( err => console.log(err))
  }

  cardUnlike(cardID) {
    return fetch(`${this._apiEndpoint}/cards/likes/${cardID}`, {
      method: "DELETE",
      headers: this._auth
    })
    .then ( res => this._checkResponse(res))
    .catch( err => console.log(err))
  }

  updateAvatar(url) {
    return fetch(`${this._apiEndpoint}/users/me/avatar`, {
      method: "PATCH",
      headers: this._auth,
      body: JSON.stringify({
        avatar: url
      })
    })
    .then ( res => this._checkResponse(res))
    .catch( err => console.log(err))
  }
}

const api = new Api(apiEndpoints);

export {api};