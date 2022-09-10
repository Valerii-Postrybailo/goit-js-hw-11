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

////////////////////////////////////////////////////////////////////////

const deleteMarkup = ref => {
  ref.innerHTML = ''
}

const inputEvtHandler = evt => {
  evt.preventDefault();
  console.log(evt.currentTarget)
  const textInputValue = evt.currentTarget.value;
  // console.log(textInputValue)
  // console.log(evt.currentTarget)
  
  // const {
  //   inputValue: { searchQuery }
  // } = evt.currentTarget;
  
  // console.log(searchQuery.value)

  if (!textInputValue) {
    deleteMarkup(galleryEl);
    return;
  }

  fetchImg(textInputValue)
    .then((images) => renderMarkup(images))
    .catch((error) => Notify.failure("Sorry, there are no images matching your search query. Please try again."));
}

const renderMarkup = data => {
  renderImgGallery(data)
  galleryEl.innerHTML = renderImgGallery(data)

    console.log(data)
    // console.log(markupInfo)
    // console.log(renderImgGallery(data))
  const markupInfo = renderImgGallery(data);
  console.log(markupInfo)
    // galleryEl.innerHTML = renderImgGallery(data);
  // galleryEl.insertAdjacentHTML("afterbegin", markupInfo)
}

inputEl.addEventListener('input', inputEvtHandler);

// console.log(fetchImg("cat"))

// fetchImg("cat")


// inputEl.addEventListener("input", evt => {
//   console.log(evt.target.value)
//   evt.preventDefault();
//   fetchImg(evt.target.value)
//     .then((images) => renderImgGallery(images))
//     .catch((error) => Notify.failure("Sorry, there are no images matching your search query. Please try again."));
// })

// formEl.addEventListener('submit', submitForm);
  // ///////////////////////////////////////////////////////////////////
// inputEl.addEventListener("input", submitForm)
// function submitForm(evt) {
//   evt.preventDefault();
//   console.log(evt.target.value)

//   fetchImg(evt.target.value)
//     .then((images) => renderImgGallery(images))
//     .catch((error) => Notify.failure("Sorry, there are no images matching your search query. Please try again."));
// }

//////////////////////////////////////////////////////////////////////
// function handleSubmit(evt) {
//   evt.preventDefault();
//   console.log(evt.target.value)
//   fetchImg()
//     .then((images) => renderImgGallery(images))
//     .catch((error) => Notify.failure("Sorry, there are no images matching your search query. Please try again."));
// }

// galleryEl.insertAdjacentHTML("afterbegin",imgMarkup)
// const markup = renderImgGallery(images)
//   galleryEl.insertAdjacentHTML("afterbegin",markup)


function renderImgGallery(images) {
  console.log("Im here?")
  const markup = images.hits
  console.log(markup)

  return markup
    .map(
      ({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => 
      `
      <a class="link" href="${largeImageURL}">
        <div class="photo-card">
          <img src="${webformatURL}" alt="${tags}" loading="lazy" />
          <div class="info">
            <p class="info-item">
              <b>Likes</b>
                ${likes}
            </p>
            <p class="info-item">
              <b>Views</b>
                ${views}
            </p>
            <p class="info-item">
              <b>Comments</b>
                ${comments}
            </p>
            <p class="info-item">
              <b>Downloads</b>
                ${downloads}
            </p>
          </div>
        </div>
      </a>
      `
    )
  .join("");
}

new SimpleLightbox('.gallery a', { captionDelay	:250 });