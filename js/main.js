"use strict";

let shows = [];
let favoritesShows = [];

const btn = document.querySelector(".js-button");
btn.addEventListener("click", getDataApi);

// que escuche el botón

//DATOS DE LA API CON EL VALOR DEL INPUT
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
    });
}

// PINTAR LA LISTA DE LAS SERIE
const showsElement = document.querySelector(".js-container-allshows");
const paintShows = () => {
  let htmlCode = "";
  for (const show of shows) {
    // if (isFavorite === true) {
    //   htmlCode += `<div class="container__shows-show container__shows-show--favorite" id="${show.id}">`;
    // } else {
    //   htmlCode += `<div class="container__shows-show" id="${show.id}">`;
    // }
    htmlCode += `<div class="js-container-show container__shows-show " id="${show.id}">`;
    htmlCode += `<img src="${show.image}" alt="Serie: ${show.name}" class="image-style">`;
    htmlCode += `<h3 class="container__shows-show--title">${show.name}</h3>`;
    htmlCode += `</div>`;
  }
  showsElement.innerHTML = htmlCode;
  listenClickFavShow();
};

// AÑADIR A FAVORITOS
function favouriteList(ev) {
  // guardar el valor del id en una constante
  const clickedId = ev.currentTarget.id;
  // const isFavorite = favoritesShows(clickedId);
  console.log(clickedId, shows);
}

// ESCUCHAR EL CLICK DEL DIV DEL SHOW
const listenClickFavShow = () => {
  const showsItems = document.querySelectorAll(".js-container-show");
  for (const showsItem of showsItems) {
    showsItem.addEventListener("click", favouriteList);
  }
};

//PINTAR LA LISTA DE FAVORITOS
const favouriteElement = document.querySelector(".container__favorites-list");
const paintFavoriteShows = () => {
  let favoriteHtmlCode = "";
  for (const show of shows) {
    htmlCode += `<ul>`;
    htmlCode += `<li id="${show.id}">`;
    htmlCode += `<img src="${show.image}" alt="Serie: ${show.name}" class="image-style">`;
    htmlCode += `<h3>${show.name}</h3>`;
    htmlCode += `</li>`;
    htmlCode += `</ul>`;
  }
  favouriteElement.innerHTML = favoriteHtmlCode;
};

// function setInLocalStorage() {}
// function getFromLocalStorage() {}
