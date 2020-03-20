"use strict";

let shows = [];
let favoritesShows = [];

const btn = document.querySelector(".js-button");
btn.addEventListener("click", getDataApi);

// que escuche el botón

// función que tome los datos del servidor con el valor del input
function getDataApi() {
  const inputValue = document.querySelector(".js-input").value;
  fetch(`http://api.tvmaze.com/search/shows?q=${inputValue}`)
    .then(response => response.json())
    .then(serverData => {
      /* necesito recorrer el array de 10 objetos que devuelve el servidor para acceder 
      a los datos que necesito. Como devuelve 10 objetos tengo que crear 1 con las propiedades que quiero que muestre */
      for (const show of serverData) {
        const filmsDataObject = {
          id: show.show.id,
          name: show.show.name,
          image: show.show.image
        };
        if (show.show.image === null) {
          filmsDataObject.image = "https://via.placeholder.com/210x295/ffffff/666666/?text=TV";
        } else {
          filmsDataObject.image = show.show.image.medium;
        }
        shows.push(filmsDataObject);
      }
      paintShows();
      console.log(shows);
    });
}

const showsElement = document.querySelector(".js-container-shows");
const paintShows = () => {
  let htmlCode = "";
  for (const show of shows) {
    htmlCode += `<div class="container_shows-show" id="${show.id}">`;
    htmlCode += `<img src="${show.image}" alt="Serie: ${show.name}" class="image-style">`;
    htmlCode += `<h3>${show.name}</h3>`;
    htmlCode += `</div>`;
  }
  showsElement.innerHTML = htmlCode;
};
// función que pinta los datos de la API

function paintFavoriteData() {}
// función que pinte los datos de la lista de favorito
function favouriteList() {}
// un función que añada o quite de la lista de favoritos

function setInLocalStorage() {}
function getFromLocalStorage() {}
