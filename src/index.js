import { fetchImg } from './fetch_picture';

const axios = require('axios').default;

import { Notify } from 'notiflix/build/notiflix-notify-aio';

// Описаний в документації
import SimpleLightbox from "simplelightbox";
// Додатковий імпорт стилів
import "simplelightbox/dist/simple-lightbox.min.css";

///////////////////////////////////////////////////////////////////

const formEl = document.querySelector("#search-form");
console.log(formEl)

const inputEl = document.querySelector('input[name="searchQuery"]')
console.log(inputEl)

const galleryEl = document.querySelector(".gallery")
console.log(galleryEl)

const buttonEl = document.querySelector(`.load-more`)
buttonEl.style.display = "none"
console.log(buttonEl)

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

function renderImgGallery(images) {
  console.log(images.hits)
    console.log("Im here?")
    const markup = images.hits
    console.log(markup)
  if (markup == []){
    Notify.failure("Sorry, there are no images matching your search query. Please try again.")
    console.log("wtf")
  }else{
    return markup
      .map(
        ({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => 
        `
        <a class="gallery__item" href="${largeImageURL}">

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
}

new SimpleLightbox('.gallery a', { captionDelay: 250 });
