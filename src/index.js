const axios = require('axios').default;

import { Notify } from 'notiflix/build/notiflix-notify-aio';

import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import { fetchImg } from './fetch_picture';

///////////////////////////////////////////////////////////////////

const formEl = document.querySelector("#search-form");
console.log(formEl)

const inputEl = document.querySelector('input[name="searchQuery"]')
console.log(inputEl)

const galleryEl = document.querySelector(".gallery")
console.log(galleryEl)



// console.log(fetchImg("cat"))

// fetchImg("cat")


// inputEl.addEventListener("input", evt => {
//   console.log(evt.target.value)
//   evt.preventDefault();
//   fetchImg(evt.target.value)
//     .then((images) => renderImgGallery(images))
//     .catch((error) => Notify.failure("Sorry, there are no images matching your search query. Please try again."));
// })

formEl.addEventListener('submit', submitForm);

function submitForm(evt) {
  evt.preventDefault();
  fetchImg()
    .then((images) => renderImgGallery(images))
    .catch((error) => Notify.failure("Sorry, there are no images matching your search query. Please try again."));
  console.log(evt.target.value)
}

// function handleSubmit(evt) {
//   evt.preventDefault();
//   console.log(evt.target.value)
//   fetchImg()
//     .then((images) => renderImgGallery(images))
//     .catch((error) => Notify.failure("Sorry, there are no images matching your search query. Please try again."));
// }

// galleryEl.insertAdjacentHTML("afterbegin",imgMarkup)
const markup = renderImgGallery()
  galleryEl.insertAdjacentHTML("afterbegin",markup)


function renderImgGallery(images) {
  console.log("Im here?")
  const markup = images
    .map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
      return `
      <a>
        <div class="photo-card">
          <img src="${webformatURL}" alt="${tags}" loading="lazy" />
          <div class="info">
            <p class="info-item">
              <b>${likes}</b>
            </p>
            <p class="info-item">
              <b>${views}</b>
            </p>
            <p class="info-item">
              <b>${comments}</b>
            </p>
            <p class="info-item">
              <b>${downloads}</b>
            </p>
          </div>
        </div>
      </a>
      `
    })
    .join("");
  // galleryEl.innerHTML = markup;
}

new SimpleLightbox('.gallery a', { /* options */ });