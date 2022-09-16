import  NewsApiService  from './fetch_picture';
import LoadMoreBtn from './load_more_btn';

const axios = require('axios').default;

import { Notify } from 'notiflix/build/notiflix-notify-aio';

// Описаний в документації
import SimpleLightbox from "simplelightbox";
// Додатковий імпорт стилів
import "simplelightbox/dist/simple-lightbox.min.css";

///////////////////////////////////////////////////////////////////

const loadMoreBtn = new LoadMoreBtn({
  selector: ('.btn-primary'),
  hidden:true,
})
const newsApiService = new NewsApiService()

const formEl = document.querySelector("#search-form");

const galleryEl = document.querySelector(".gallery")

const buttonEl = document.querySelector(`.load-more`)
// buttonEl.style.display = "none"

////////////////////////////////////////////////////////////////////////

formEl.addEventListener("submit", submitFormEvtHandler);
// buttonEl.addEventListener("click", onLoadMore);


console.log(loadMoreBtn.refs)
console.log(loadMoreBtn.refs.label.textContent)

loadMoreBtn.refs.button.addEventListener("click", onLoadMore);


// let inputValue = '';

function submitFormEvtHandler(evt) {
  evt.preventDefault();

  newsApiService.value  = evt.currentTarget.elements.searchQuery.value;
  

  loadMoreBtn.show();
  loadMoreBtn.disable();

  newsApiService.resetPage();
  newsApiService.fetchArticles().then(images => {
    deleteMarkup();
    renderMarkup(images);
    loadMoreBtn.enable();
  })
  // if (!inputValue) {
  //   deleteMarkup(galleryEl);
  //   return;
  // }
}

function onLoadMore() {
  loadMoreBtn.disable();
  newsApiService.fetchArticles().then(images => {
    renderMarkup(images);
    loadMoreBtn.enable();
  })
}

// function fetchImages(){
//   loadMoreBtn.disable();
//   renderMarkup(images);
//     loadMoreBtn.enable();
    
// }

function  deleteMarkup() {
  galleryEl.innerHTML =''
  // ref.innerHTML = ''
}

function renderMarkup(data) {
  console.log(data)
  if (data.length === 0) {
    Notify.failure("Sorry, there are no images matching your search query. Please try again.");
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

            <div class="photo-card">
              <div class=img_div>
                <a class="gallery__item" href="${largeImageURL}">
                  <img src="${webformatURL}" alt="${tags}" loading="lazy" />
                </a>
              </div>

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
        `
      )
    .join("");
  }

  // gallery.on()
  // var gallery = ('.gallery a').simpleLightbox();

// gallery.next(); // Next Image

/////////////////////////////////////////////////////////////////////

galleryEl.addEventListener('click', onClick);

function onClick(event) {
  event.preventDefault();

  if (event.target.nodeName !== 'IMG') {
    return
  }
  event.preventDefault();
  // console.log(event.target.nodeName)
  // console.log(event.target.dataset.source)

  // const instance = simpleLightbox.create(`<img src="${event.target.dataset.source}" width="800" height="600">`)
  // new SimpleLightbox('.gallery a', {captionDelay	:250 });
  new SimpleLightbox('.img_div a', {captionDelay	:250 });
  // gallery.on()

    // let gallery = new SimpleLightbox('.gallery a');
  // gallery.on('show.simplelightbox');
  // instance.show
  // console.log(instance.show())
}
  





