"use strict";

let shows = [];
let favoritesShows = [];

// Función que escucha el botón Search
const listenSearchBtn = () => {
  const btn = document.querySelector(".js-button");
  btn.addEventListener("click", getDataApi);
};

//DATOS DE LA API CON EL VALOR DEL INPUT
function getDataApi() {
  const inputValue = document.querySelector(".js-input").value;
  fetch(`http://api.tvmaze.com/search/shows?q=${inputValue}`)
    .then(response => response.json())
    .then(serverData => {
      shows = [];
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
    htmlCode += `<div class="js-container-show container__shows__show" id="${show.id}">`;
    htmlCode += `<img src="${show.image}" alt="Serie: ${show.name}" class="container__shows__show--image-style">`;
    htmlCode += `<h3 class="container__shows__show--title">${show.name}</h3>`;
    htmlCode += `</div>`;
  }
  showsElement.innerHTML = htmlCode;
  listenClickFavShow();
};

// AÑADIR A FAVORITOS
function favouriteList(ev) {
  // guardar el valor del id en una constante
  const clickedId = parseInt(ev.currentTarget.id);
  console.log(ev.currentTarget);

  // buscar en la lista de favoritos comparando ids
  let foundFavShow = undefined;
  for (const favoritesShow of favoritesShows) {
    if (favoritesShow.id === clickedId) {
      foundFavShow = favoritesShow;
    }
  }
  // si la serie es undefined porque no esta en la lista me lo añades
  if (foundFavShow === undefined) {
    // encontrar el elemento clickado y si es el mismo lo mete en la variable, para ello comparamos el atributo id que es hijo directo de la array shows
    let foundShow = shows.find(show => show.id === clickedId);
    // añadirlo a la array de favoritos
    // como queremos añadir todos los datos no necesitamos crear un nuevo objeto definido
    ev.currentTarget.classList.add("fav");
    favoritesShows.push(foundShow);
  } else {
    // como quiero eliminar una serie necesito saber que posición ocupa en la lista teniendo en cuenta el id.
    let indexShowToDelete = 0;
    for (let i = 0; i < favoritesShows.length; i++) {
      if (favoritesShows[i].id === clickedId) {
        indexShowToDelete = i;
      }
    }
    favoritesShows.splice(indexShowToDelete, 1);
    ev.currentTarget.classList.remove("fav");
  }
  setInLocalStorage();
  paintFavoriteShows();
}

// ESCUCHAR EL CLICK DEL DIV DEL SHOW
const listenClickFavShow = () => {
  const showsItems = document.querySelectorAll(".js-container-show");
  for (const showsItem of showsItems) {
    showsItem.addEventListener("click", favouriteList);
  }
};

//PINTAR LA LISTA DE FAVORITOS
const favouriteElement = document.querySelector(".container__favorites");
const paintFavoriteShows = () => {
  let favoriteHtmlCode = "";
  favoriteHtmlCode += `<h2 class="container__favorites--title">Mis series favoritas </h2>`;
  for (const show of favoritesShows) {
    favoriteHtmlCode += `<ul class="container__favorites--shows">`;
    favoriteHtmlCode += `<li class="list-style" id="${show.id}">`;
    favoriteHtmlCode += `<img src="${show.image}" alt="Serie: ${show.name}" class="list-style__image">`;
    favoriteHtmlCode += `<h3 class="list-style__title">${show.name}</h3>`;
    favoriteHtmlCode += `<button class="js-remove-btn list-style__btn" id="${show.id}" > X </button>`;
    favoriteHtmlCode += `</li>`;
    favoriteHtmlCode += `</ul>`;
  }
  favouriteElement.innerHTML = favoriteHtmlCode;
  listenRemoveFavBtn();
};

// BOTÓN X

const removeShows = ev => {
  const clickedId = parseInt(ev.currentTarget.id);
  // buscar en la lista de favoritos la serie clickada
  let foundFavShow = undefined;
  for (const favoritesShow of favoritesShows) {
    if (favoritesShow.id === clickedId) {
      foundFavShow = favoritesShow;
    }
  }
  // Elimino el producto
  if (foundFavShow.id === clickedId) {
    let indexShowToDelete = 0;
    for (let i = 0; i < favoritesShows.length; i++) {
      if (favoritesShows[i].id === clickedId) {
        indexShowToDelete = i;
      }
    }
    favoritesShows.splice(indexShowToDelete, 1);
    ev.currentTarget.classList.remove("fav");
  }
  paintFavoriteShows();
  setInLocalStorage();
};

// listener sobre todos los botones X de favs
const listenRemoveFavBtn = () => {
  const removeFavBtns = document.querySelectorAll(".js-remove-btn");
  for (const removeFavBtn of removeFavBtns) {
    removeFavBtn.addEventListener("click", removeShows);
  }
};

// localstorage
const setInLocalStorage = () => {
  const showFavInString = JSON.stringify(favoritesShows);
  localStorage.setItem("favorite show", showFavInString);
};

const getFromLocalStorage = () => {
  const showFavInString = localStorage.getItem("favorite show");
  if (showFavInString !== null) {
    favoritesShows = JSON.parse(showFavInString);
    paintFavoriteShows();
  }
};

// arrancar página

getFromLocalStorage();
listenSearchBtn();
