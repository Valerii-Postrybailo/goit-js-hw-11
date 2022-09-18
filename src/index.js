import  NewsApiService  from './fetch_picture';
import LoadMoreBtn from './load_more_btn';

import { Notify } from 'notiflix/build/notiflix-notify-aio';

// Описаний в документації
import SimpleLightbox from "simplelightbox";
// Додатковий імпорт стилів
import "simplelightbox/dist/simple-lightbox.min.css";

const axios = require('axios').default;

///////////////////////////////////////////////////////////////////

const loadMoreBtn = new LoadMoreBtn({
  selector: ('.btn-primary'),
  hidden:true,
})

const newsApiService = new NewsApiService()

const formEl = document.querySelector("#search-form");

const galleryEl = document.querySelector(".gallery")

////////////////////////////////////////////////////////////////////////

formEl.addEventListener("submit", submitFormEvtHandler);

loadMoreBtn.refs.button.addEventListener("click", onLoadMore);

function submitFormEvtHandler(evt) {
  evt.preventDefault();

  newsApiService.value  = evt.currentTarget.elements.searchQuery.value;
  console.log( `newsApiService.value = ${newsApiService.value}`)
  console.log(typeof(newsApiService.value))

  if(newsApiService.value.trim() === ''){
    Notify.failure("Empty, request!");
  }else{

    newsApiService.fetchArticles().then(images => {
      deleteMarkup();
      renderMarkup(images);

      if(images.length !== 0){
        loadMoreBtn.show();
        loadMoreBtn.enable();
      }else{
        loadMoreBtn.hide();
      }
    })
  }
}

function onLoadMore() {
  loadMoreBtn.disable();
  // newsApiService.incrementPage()
  newsApiService.fetchArticles().then(images => {
    renderMarkup(images);
    loadMoreBtn.enable();
  }).catch(error => console.error(error))
}


function  deleteMarkup() {
  galleryEl.innerHTML =''
  // ref.innerHTML = ''
}

function renderMarkup(data) {
  console.log(data)
  if (data.length === 0) {
    Notify.failure("Sorry, there are no images matching your search query. Please try again.");
    loadMoreBtn.hide();
  } else {
    galleryEl.insertAdjacentHTML("beforeend", renderImgGallery(data));
  }
}

function renderImgGallery(images) {
  const markup = images
  
  return markup
    .map(
      ({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => 
        ` 
          <a class="gallery__link-item" >
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
